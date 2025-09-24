# WhatsApp Bot - Guia de Configuração

## Fluxo do Bot Atualizado

### 1. Processamento de Transações

O bot agora funciona em duas etapas:

1. **Captura dos dados da transação**: O usuário envia a transação em linguagem natural
2. **Seleção da conta**: O bot mostra as contas/cartões disponíveis para o usuário escolher

### 2. Exemplo de Fluxo

**Usuário:** "Gasto de R$ 50 no supermercado"

**Bot:** 
```
💰 Transação identificada:
💵 Valor: R$ 50,00
📂 Tipo: Despesa
📂 Categoria: Alimentação
📝 Descrição: Gasto no supermercado

🏦 Escolha onde registrar:

💳 Contas Bancárias:
1. Conta Corrente (checking)
2. Poupança (savings)

💎 Cartões de Crédito:
3. Visa Gold (credit)
4. Mastercard (credit)

Digite o número da opção desejada (1-4)
```

**Usuário:** "1"

**Bot:**
```
💸 Despesa registrada com sucesso!

💵 Valor: R$ 50,00
🏦 Registrado em: conta bancária
📂 Categoria: Alimentação
📝 Descrição: Gasto no supermercado

💳 Saldo atual: R$ 1.450,00
```

### 3. Configuração no N8N

Para configurar o fluxo no N8N:

#### Webhook de Recebimento:
- **URL**: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/whatsapp-webhook`
- **Método**: POST
- **Headers**: 
  - `Authorization: Bearer [SUPABASE_ANON_KEY]`
  - `Content-Type: application/json`

#### Webhook de Envio para WhatsApp:
- **URL**: `https://graph.facebook.com/v17.0/[PHONE_NUMBER_ID]/messages`
- **Método**: POST
- **Headers**:
  - `Authorization: Bearer [WHATSAPP_ACCESS_TOKEN]`
  - `Content-Type: application/json`

#### Estrutura do Payload para Envio:
```json
{
  "messaging_product": "whatsapp",
  "to": "{{phone_number}}",
  "type": "text",
  "text": {
    "body": "{{message_text}}"
  }
}
```

### 4. Integração de Categorias

O bot também suporta criação automática de categorias via N8N:

#### Webhook para Categorias:
- **URL**: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/n8n-category-webhook`
- **Método**: POST
- **Headers**:
  - `Authorization: Bearer [SUPABASE_ANON_KEY]`
  - `Content-Type: application/json`

#### Payload para Criar Categoria:
```json
{
  "user_id": "{{user_id}}",
  "name": "{{category_name}}",
  "icon": "{{icon_name}}",
  "color": "{{hex_color}}",
  "type": "expense" // ou "income"
}
```

### 5. Comandos Disponíveis

- **Consultas**: `saldo`, `resumo diário`, `resumo semanal`, `resumo mensal`
- **Transações**: Linguagem natural como "Gasto de R$ 50 no supermercado"
- **Categorias**: `gastos em [categoria]`

### 6. Validações Implementadas

- ✅ Obrigatório ter conta bancária ou cartão de crédito cadastrado
- ✅ Usuário deve escolher onde registrar a transação
- ✅ Transações pendentes expiram em 5 minutos
- ✅ Validação de opções selecionadas pelo usuário

### 7. Estados da Transação

1. **Pendente**: Aguardando seleção de conta (5 min timeout)
2. **Processada**: Transação criada com sucesso
3. **Expirada**: Timeout - usuário deve enviar nova transação

### 8. Variáveis de Ambiente Necessárias

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `WHATSAPP_ACCESS_TOKEN`

### 9. Segurança

- Autenticação via número de telefone vinculado
- Tokens seguros armazenados no Supabase
- Validação de usuário em cada transação
- Timeout de sessões pendentes

### 10. Configuração das Edge Functions

#### WhatsApp Webhook (Principal)
**Função**: `whatsapp-webhook`
**URL**: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/whatsapp-webhook`

#### N8N Integration Webhook
**Função**: `n8n-webhook`  
**URL**: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/n8n-webhook`

#### N8N Category Webhook
**Função**: `n8n-category-webhook`
**URL**: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/n8n-category-webhook`

---

## API Documentação Adicional

### 📨 N8N Webhook - Transações

Permite integração com n8n para automação de transações financeiras.

#### Payload para Transação:
```json
{
  "user_id": "user-uuid-here",
  "amount": 100.50,
  "type": "expense",
  "description": "Compra no supermercado",
  "category_name": "Alimentação",
  "account_name": "Conta Corrente",
  "date": "2024-01-15",
  "notes": "Compras da semana"
}
```

#### Campos Obrigatórios:
- `user_id`: UUID do usuário
- `amount`: Valor da transação (número positivo)
- `type`: Tipo da transação ("income" ou "expense")
- `description`: Descrição da transação
- `account_name` OU `credit_card_name`: Pelo menos um deve ser especificado

### 📨 N8N Webhook - Categorias

#### Payload para Categoria:
```json
{
  "user_id": "user-uuid-here",
  "name": "Nova Categoria",
  "type": "expense",
  "icon": "shopping-cart",
  "color": "#FF6B6B"
}
```

### 📨 Resumo Financeiro

**URL**: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/financial-summary`

#### Payload:
```json
{
  "user_id": "01bbae9d-54fb-41fe-86b7-75c1bb0600ca"
}
```

ou

```json
{
  "phone_number": "+5511999999999"
}
```