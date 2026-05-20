# PLANIX — Changelog de Melhorias

## Resumo

Revisão completa do código com **8 bugs corrigidos**, **7 novos componentes**, **limpeza de código morto** e **otimização de performance** (bundle reduzido em 68%).

---

## 🐛 Bugs Corrigidos

### 1. AppContext conflitando com Supabase
**Problema:** `AppContext.tsx` mantinha dados mock em localStorage que conflitavam com os dados reais do Supabase via `useSupabaseData`.
**Solução:** Reescrito para delegar ao `useSupabaseData`, eliminando duplicação de estado.

### 2. ProtectedRoute — lógica contraditória
**Problema:** Verificava `hasActiveSubscription && subscription_end < new Date()` — condição impossível (se assinatura é ativa, a data é futura por definição). O bloco de "assinatura vencida" nunca executava.
**Solução:** Corrigido para verificar `!hasActiveSubscription && subscription_plan !== 'basic'` — detecta quem tinha plano pago e expirou.

### 3. Sidebar mobile — largura errada
**Problema:** Classe `sm:w-full` fazia o sidebar ocupar 100% da tela em telas acima de 640px. No mobile (< 640px), não tinha efeito.
**Solução:** Substituído por `w-[85vw] max-w-[280px] sm:w-64` — sidebar proporcional no mobile, fixo no desktop.

### 4. Privacy não persistia
**Problema:** Estado de privacidade (ocultar valores) resetava ao recarregar a página.
**Solução:** Persistido em `localStorage` com key `planix-privacy-enabled`.

### 5. Máscara de privacidade de tamanho variável
**Problema:** `hideValue()` usava `'•'.repeat(value.length)` — revelava o tamanho dos valores pelo número de pontos.
**Solução:** Substituído por `'• • • • •'` fixo, independente do valor.

### 6. Export Excel sem dados reais
**Problema:** Colunas "Categoria" e "Conta" no Excel exportado mostravam texto literal `'Categoria'` e `'Conta'` ao invés dos nomes reais.
**Solução:** Corrigido para usar `transaction.category?.name` e `transaction.account?.name || transaction.credit_card?.name`.

### 7. Export PDF básico demais
**Problema:** PDF exportado tinha apenas texto simples sem formatação, sem cabeçalhos, sem resumo.
**Solução:** Reescrito com cabeçalho "PLANIX", resumo de receitas/despesas/saldo, e tabela formatada com cores.

### 8. useSupabaseData — dependência frágil
**Problema:** `fetchAllData` capturava `user` via closure mas não era memoizada. `useEffect` tinha `[user]` mas `fetchAllData` podia ficar stale.
**Solução:** Envolvido em `useCallback` com `[user?.id]`, e `useEffect` agora depende de `[fetchAllData]`.

---

## 🧹 Código Morto Removido

| Arquivo | Motivo |
|---------|--------|
| `pages/Transacoes.tsx` | Duplicata de `TransacoesImproved.tsx` (não usado nas rotas) |
| `pages/Contas.tsx` | Duplicata de `ContasImproved.tsx` |
| `pages/Goals.tsx` | Duplicata de `GoalsImproved.tsx` |
| `pages/Relatorios.tsx` | Duplicata de `RelatoriosImproved.tsx` |
| `pages/Settings.tsx` | Duplicata de `SettingsImproved.tsx` |
| `pages/Login.tsx` | Substituído por `Auth.tsx` |
| `pages/Signup.tsx` | Substituído por `Auth.tsx` |
| `context/InvestmentsContext.tsx` | Usava localStorage com mock data; app real usa `useSupabaseData` |

**Resultado:** ~3,500 linhas de código morto eliminadas.

---

## 🆕 Novos Componentes

### 1. `ErrorBoundary.tsx`
Captura erros de renderização e mostra tela amigável com botões de recarregar/voltar ao início. Envolve toda a aplicação.

### 2. `LoadingSkeletons.tsx`
Três variantes de skeleton: `DashboardSkeleton`, `TransactionsSkeleton`, `PageSkeleton`. Usados durante carregamento inicial e lazy loading.

### 3. `EmptyState.tsx`
Componente reutilizável para estados vazios com ícone, título, descrição e ação. Variantes: `transactions`, `accounts`, `goals`, `reports`, `cards`.

### 4. `FinancialInsights.tsx`
Painel inteligente que gera até 3 insights baseados nos padrões de gasto:
- Taxa de poupança (comparada com 20% recomendado)
- Tendência de gastos vs mês anterior
- Categoria com maior concentração de gastos
- Adequação da reserva de emergência (meta: 6 meses)
- Alerta de ausência de receitas

### 5. `CategoryPieChart.tsx`
Gráfico de pizza mostrando distribuição de despesas por categoria no mês selecionado. Top 8 categorias com cores distintas.

### 6. `MonthlyComparisonChart.tsx`
Gráfico de barras comparando receitas vs despesas nos últimos 6 meses. Permite visualizar tendências rapidamente.

### 7. `FinancialHealthScore.tsx`
Score de saúde financeira de 0 a 100 com gauge circular animado. Avalia 5 dimensões:
- Taxa de poupança (30 pts)
- Reserva de emergência (25 pts)
- Presença de renda (15 pts)
- Investimentos (15 pts)
- Disciplina no cartão de crédito (15 pts)

---

## ⚡ Otimizações de Performance

### Lazy Loading
Todas as rotas agora usam `React.lazy()` + `Suspense`, carregando cada página sob demanda.

### Code Splitting (Vite)
Chunks separados via `manualChunks`:
- `vendor-react`: React, React DOM, React Router
- `vendor-ui`: Radix UI primitives
- `vendor-charts`: Recharts
- `vendor-supabase`: Supabase client
- `vendor-export`: jsPDF + XLSX

### Resultado
| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Bundle principal | 2,938 KB | 945 KB | **-68%** |
| Dashboard chunk | (monolítico) | 34.6 KB | Carrega separado |
| Transações chunk | (monolítico) | 28.9 KB | Carrega separado |

### Memoização
Dashboard agora usa `useMemo` e `useCallback` em todos os cálculos pesados, evitando recalcular a cada render.

---

## 🎨 Melhorias de UX

### Dashboard
- Novo gráfico "Receitas vs Despesas" (6 meses)
- Novo gráfico "Despesas por Categoria" (pizza)
- Score de Saúde Financeira com gauge visual
- Painel de Insights Financeiros inteligentes
- Empty state ilustrado para novos usuários
- Skeleton loading enquanto carrega
- Botão "Ver todas" nas transações recentes

### Transações
- Campo de busca por texto (descrição, categoria, observação)
- Empty state contextual (diferencia "sem dados" de "filtro sem resultados")
- Ícone de filtro no cabeçalho

### Sidebar
- Adicionados links para Categorias e Contatos
- Fecha ao navegar em desktop (antes só fechava no mobile)
- Largura proporcional no mobile (85vw com max 280px)

### Página 404
- Redesenhada com tema do app
- Mostra o path que o usuário tentou acessar
- Botões "Voltar" e "Dashboard"

### Geral
- `refetchOnWindowFocus: false` no React Query (evita refetch desnecessário ao alt-tab)
- tsconfig.json corrigido para TypeScript 6.x
