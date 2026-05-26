# Orçamento — Redesign Estilo Planilha

**Data:** 2026-05-25  
**Status:** Aprovado pelo usuário  

---

## Problema

A página de Orçamento atual impõe uma restrição `UNIQUE(user_id, category_id, month, year)` na tabela `budgets`, o que significa:

- Só é possível ter **uma linha por categoria por mês**
- Categorias "somem" do seletor após serem usadas
- Não é possível ter "Alimentação" com dois lançamentos diferentes (ex: Mercado e Restaurante)
- A experiência é travada e não condiz com uma planilha livre

---

## Solução

Criar uma nova tabela `budget_items` paralela (sem tocar na `budgets` existente) com:

- **Descrição livre** por linha (texto livre: "Aluguel", "Mercado semanal", etc.)
- **Categoria opcional** apenas para matching automático com transações reais
- **Sem restrição de unicidade** — múltiplas linhas por categoria permitidas
- Interação estilo planilha Excel com navegação por teclado
- Painel lateral com detalhes e transações vinculadas

---

## Banco de Dados

### Nova tabela: `budget_items`

```sql
CREATE TABLE public.budget_items (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month          INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year           INTEGER NOT NULL CHECK (year >= 2000 AND year <= 2100),
  type           TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  description    TEXT NOT NULL DEFAULT '',
  category_id    UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  planned_amount NUMERIC NOT NULL DEFAULT 0,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- RLS habilitado: usuário só vê/edita seus próprios itens
- Trigger `updated_at` igual aos demais
- **Sem UNIQUE constraint** — design intencional

### Migração dos dados existentes

Na mesma migration, copiar registros da tabela `budgets` para `budget_items`:

```sql
INSERT INTO public.budget_items (user_id, month, year, type, description, category_id, planned_amount, sort_order, created_at)
SELECT
  b.user_id,
  b.month,
  b.year,
  c.type,
  COALESCE(b.name, c.name),
  b.category_id,
  b.planned_amount,
  ROW_NUMBER() OVER (PARTITION BY b.user_id, b.month, b.year, c.type ORDER BY b.created_at),
  b.created_at
FROM public.budgets b
JOIN public.categories c ON c.id = b.category_id;
```

---

## Hook: `useBudgetItems`

Substitui `useBudget` para a nova tabela. Responsabilidades:

- `fetchItems(month, year)` — lista todos os `budget_items` do usuário ordenados por `type`, `sort_order`
- `createItem(payload)` — INSERT simples (sem upsert por conflito)
- `updateItem(id, payload)` — UPDATE por `id`
- `deleteItem(id)` — DELETE por `id`
- `reorderItems(orderedIds)` — atualiza `sort_order` em batch
- `copyFromPreviousMonth()` — copia itens do mês anterior

---

## Hook: `useBudgetItemAnalytics`

Responsabilidades:

- Para cada `budget_item` com `category_id` definido: somar transações do mês do usuário nessa categoria
  ```
  WHERE user_id = auth.uid()
    AND category_id = item.category_id
    AND date >= primeiro dia do mês
    AND date <= último dia do mês
  ```
- Para itens **sem** `category_id`: `actual = 0`
- Retornar por item: `{ itemId, actual, transactions[] }`
- `transactions[]` contém: `id, date, description, amount`
- Apenas transações do próprio usuário (exclui transações compartilhadas de outros)

---

## UI: Componentes

### `Orcamento.tsx` (página principal)

Estrutura:

```
<Layout>
  <TopBar />          ← navegação de mês, botões Copiar/Gráficos/Config
  <SummaryCards />    ← Receitas / Despesas / Saldo / Poupança
  <BudgetTable>
    <BudgetSection type="income" />
    <BudgetSection type="expense" />
  </BudgetTable>
  <BudgetItemSheet /> ← drawer lateral, controlado por estado global da página
</Layout>
```

### `BudgetSection`

Props: `type: 'income' | 'expense'`

- Renderiza cabeçalho da seção com totais (Planejado / Realizado / Saldo)
- Renderiza `BudgetRow` para cada item
- Última linha: botão `+ Adicionar receita / despesa`
- Ao clicar no `+`: cria novo item vazio via `createItem`, abre em modo edição, foco vai para campo Descrição

### `BudgetRow`

Props: `item: BudgetItem`, `analytics: ItemAnalytics`

Colunas:

| Coluna | Editável inline? | Comportamento |
|--------|-----------------|---------------|
| Descrição | ✅ Sim | Input de texto livre |
| Categoria | ✅ Sim | Select com categorias do sistema (opcional, clearable) |
| Orçado | ✅ Sim | CurrencyInput |
| Realizado | ❌ Não | Calculado automaticamente |
| Saldo | ❌ Não | `planned - actual` |
| % | ❌ Não | `(actual / planned) * 100` |
| `···` | — | Abre `BudgetItemSheet` |

**Navegação por teclado:**
- `Tab` dentro de uma linha: Descrição → Categoria → Orçado → confirma e vai para próxima linha
- `Enter` em qualquer campo: salva a linha atual, cria nova linha em branco abaixo
- `Esc`: cancela edição sem salvar alterações
- Click fora da célula: salva automaticamente (onBlur)

**Auto-save:** cada mudança de célula (onBlur) dispara `updateItem` imediatamente

### `BudgetItemSheet`

Drawer lateral (componente `Sheet` do shadcn/ui, lado direito):

Campos:
- Descrição (input texto)
- Categoria (Select, opcional, com opção "Sem categoria")
- Tipo (Receita / Despesa) — radio
- Valor orçado (CurrencyInput)
- Notas (Textarea)

Seção de transações vinculadas:
- Exibe `analytics.transactions` para esse item
- Cada linha: data + descrição + valor
- Total realizado em destaque
- Mensagem "Sem categoria vinculada" quando `category_id` é null

Botões: `[Salvar]` e `[Excluir linha]` (com confirmação)

---

## Fluxo de dados

```
Supabase: budget_items table
       ↓
useBudgetItems (query + mutations)
       ↓
useBudgetItemAnalytics (join com transactions por category_id + user_id)
       ↓
Orcamento.tsx (estado: selectedItemId para o Sheet)
       ↓
BudgetSection → BudgetRow + BudgetItemSheet
```

---

## O que NÃO muda

- Tabela `budgets` permanece intacta (dados históricos preservados)
- Hook `useBudget` permanece (não é removido, apenas não usado na página)
- `useBudgetAnalytics` permanece
- Cards de resumo (Receitas / Despesas / Saldo / Poupança) — mesma lógica
- Navegação de mês — sem mudança
- Copiar mês anterior — reimplementado no novo hook
- Gráficos e configurações — sem mudança

---

## Fora de escopo

- Edição da ordem das linhas por drag-and-drop (pode ser adicionado depois)
- Associação manual de transação específica a uma linha do orçamento
- Import/export de planilha Excel

---

## Arquivos afetados

| Arquivo | Ação |
|---------|------|
| `supabase/migrations/TIMESTAMP_budget_items.sql` | CRIAR |
| `src/hooks/useBudgetItems.ts` | CRIAR |
| `src/hooks/useBudgetItemAnalytics.ts` | CRIAR |
| `src/pages/Orcamento.tsx` | REESCREVER |
| `src/integrations/supabase/types.ts` | ATUALIZAR (novo tipo BudgetItem) |
