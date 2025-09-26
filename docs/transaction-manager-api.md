# Transaction Manager API

Sistema completo para gerenciar transações financeiras com dados assíncronos.

## Endpoints Disponíveis

### 1. POST /transaction
**Descrição:** Criar transação (pode ser incompleta)

**URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_SUPABASE_ANON_KEY"
}
```

**Body Example:**
```json
{
  "user_id": "01bbae9d-54fb-41fe-86b7-75c1bb0600ca",
  "amount": 150.50,
  "description": "Compra no supermercado",
  "forma_pagamento": "debito",
  "conta": "Conta Corrente",
  "date": "2025-01-23",
  "type": "expense",
  "category_name": "Alimentação",
  "notes": "Compras da semana"
}
```

**Campos Obrigatórios:**
- `amount`: Valor da transação
- `date`: Data da transação
- `description`: Descrição
- `forma_pagamento`: Forma de pagamento
- `conta`: Nome da conta

**Response (Completa):**
```json
{
  "success": true,
  "transaction_id": "uuid",
  "status": "completed",
  "message": "Transação criada com sucesso"
}
```

**Response (Incompleta):**
```json
{
  "success": true,
  "pending_transaction_id": "uuid",
  "status": "pending",
  "missing_fields": ["conta", "date"],
  "message": "Transação salva como pendente. Campos faltantes: conta, date"
}
```

---

### 2. POST /transaction/complement
**Descrição:** Enviar informações faltantes para completar transação

**URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction/complement`

**Body Example:**
```json
{
  "pending_transaction_id": "uuid-da-transacao-pendente",
  "complementary_data": {
    "conta": "Conta Corrente",
    "date": "2025-01-23"
  }
}
```

**Response (Completada):**
```json
{
  "success": true,
  "transaction_id": "uuid",
  "status": "completed",
  "message": "Transação completada e processada com sucesso"
}
```

**Response (Ainda Pendente):**
```json
{
  "success": true,
  "pending_transaction_id": "uuid",
  "status": "pending",
  "missing_fields": ["date"],
  "message": "Dados atualizados. Ainda faltam: date"
}
```

---

### 3. GET /transaction/pending
**Descrição:** Listar transações pendentes aguardando dados

**URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction/pending`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_SUPABASE_ANON_KEY"
}
```

**Response:**
```json
{
  "success": true,
  "pending_transactions": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "transaction_data": {
        "amount": 150.50,
        "description": "Compra no supermercado"
      },
      "missing_fields": ["conta", "date"],
      "status": "pending",
      "created_at": "2025-01-23T10:00:00Z",
      "updated_at": "2025-01-23T10:00:00Z"
    }
  ],
  "count": 1
}
```

---

### 4. GET /transaction/final
**Descrição:** Listar transações já completas

**URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction/final`

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "amount": 150.50,
      "type": "expense",
      "description": "Compra no supermercado",
      "date": "2025-01-23",
      "categories": {
        "name": "Alimentação",
        "icon": "utensils",
        "color": "#EF4444"
      },
      "accounts": {
        "name": "Conta Corrente"
      },
      "created_at": "2025-01-23T10:00:00Z"
    }
  ],
  "count": 1
}
```

---

## Fluxo de Trabalho

### Cenário 1: Transação Completa
1. Enviar POST para `/transaction` com todos os campos
2. Sistema valida e insere diretamente na tabela `transactions`
3. Retorna `status: "completed"`

### Cenário 2: Transação Incompleta
1. Enviar POST para `/transaction` com campos parciais
2. Sistema salva na tabela `pending_transactions` com `status: "pending"`
3. Retorna lista de `missing_fields`
4. Enviar POST para `/transaction/complement` com dados faltantes
5. Sistema verifica se está completa:
   - **Sim:** Move para tabela `transactions` e marca como `processed`
   - **Não:** Atualiza dados e mantém como `pending`

### Cenário 3: Consulta de Status
1. GET `/transaction/pending` - Ver transações aguardando dados
2. GET `/transaction/final` - Ver transações processadas

---

## Prevenção de Duplicidade

- Transações já processadas não podem ser reenviadas
- Status `processed` impede reprocessamento
- IDs únicos garantem rastreabilidade

---

## Estrutura do Banco de Dados

### Tabela: `pending_transactions`
```sql
- id (UUID, PK)
- user_id (UUID, FK)
- transaction_data (JSONB)
- missing_fields (TEXT[])
- status (TEXT: 'pending', 'processed')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabela: `transactions` (existente)
```sql
- id (UUID, PK)
- user_id (UUID, FK)
- amount (NUMERIC)
- type (ENUM: 'income', 'expense')
- description (TEXT)
- date (DATE)
- account_id (UUID, FK)
- category_id (UUID, FK)
- created_at (TIMESTAMP)
```

---

## Códigos de Status HTTP

- `200` - Sucesso
- `400` - Dados inválidos ou campos obrigatórios faltando
- `401` - Não autorizado
- `404` - Transação pendente não encontrada
- `500` - Erro interno do servidor