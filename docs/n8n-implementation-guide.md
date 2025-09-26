# Guia de Implementação N8N - Sistema de Transações Assíncronas

## Configuração Inicial

### 1. URLs dos Endpoints
```
Base URL: https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager

Endpoints:
- POST /transaction - Criar transação
- POST /transaction/complement - Completar transação
- GET /transaction/pending - Listar pendentes
- GET /transaction/final - Listar finalizadas
```

### 2. Headers Padrão
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYW9ldXRocHp0eG9ueXRiY3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQyMzQsImV4cCI6MjA3MDc3MDIzNH0.7ww6j9lgyrQfxOP825gM-1S3M9QboMojamNHJYWe2as"
}
```

---

## Workflow 1: Criar Transação (Completa ou Incompleta)

### Node Configuration

**1. Trigger (Manual/Webhook/Schedule)**
- Configure conforme sua necessidade

**2. HTTP Request - Criar Transação**
- **Method:** POST
- **URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction`
- **Headers:** 
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYW9ldXRocHp0eG9ueXRiY3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQyMzQsImV4cCI6MjA3MDc3MDIzNH0.7ww6j9lgyrQfxOP825gM-1S3M9QboMojamNHJYWe2as"
  }
  ```
- **Body (JSON):**
  ```json
  {
    "user_id": "{{ $json.user_id }}",
    "amount": "{{ $json.amount }}",
    "description": "{{ $json.description }}",
    "forma_pagamento": "{{ $json.forma_pagamento }}",
    "conta": "{{ $json.conta }}",
    "date": "{{ $json.date }}",
    "type": "{{ $json.type || 'expense' }}",
    "category_name": "{{ $json.category_name }}",
    "notes": "{{ $json.notes }}"
  }
  ```

**3. IF Node - Verificar Status**
- **Condition:** `{{ $json.status === 'pending' }}`

**Branch A (Pending):**
- **Set Node:** Armazenar ID da transação pendente
  ```json
  {
    "pending_transaction_id": "{{ $json.pending_transaction_id }}",
    "missing_fields": "{{ $json.missing_fields }}",
    "status": "pending"
  }
  ```

**Branch B (Completed):**
- **Set Node:** Confirmar sucesso
  ```json
  {
    "transaction_id": "{{ $json.transaction_id }}",
    "status": "completed",
    "message": "Transação criada com sucesso"
  }
  ```

---

## Workflow 2: Completar Transação Pendente

### Node Configuration

**1. Trigger (Manual/Webhook)**
- Recebe: `pending_transaction_id` e dados complementares

**2. HTTP Request - Completar Transação**
- **Method:** POST
- **URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction/complement`
- **Headers:** (mesmo do anterior)
- **Body (JSON):**
  ```json
  {
    "pending_transaction_id": "{{ $json.pending_transaction_id }}",
    "complementary_data": {
      "conta": "{{ $json.conta }}",
      "date": "{{ $json.date }}",
      "forma_pagamento": "{{ $json.forma_pagamento }}"
    }
  }
  ```

**3. IF Node - Verificar se foi completada**
- **Condition:** `{{ $json.status === 'completed' }}`

**Branch A (Completed):**
- **Set Node:** Notificar sucesso
- **Webhook/Email:** Opcional - notificar usuário

**Branch B (Still Pending):**
- **Set Node:** Aguardar mais dados
- **Wait/Schedule:** Opcional - retentar após tempo

---

## Workflow 3: Monitorar Transações Pendentes

### Node Configuration

**1. Cron Trigger**
- Schedule: `0 */2 * * *` (a cada 2 horas)

**2. HTTP Request - Buscar Pendentes**
- **Method:** GET
- **URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction/pending`
- **Headers:** (mesmo do anterior)

**3. IF Node - Verificar se há pendentes**
- **Condition:** `{{ $json.count > 0 }}`

**4. Split In Batches**
- **Batch Size:** 1
- **Input:** `{{ $json.pending_transactions }}`

**5. Para cada transação pendente:**
- **Set Node:** Extrair dados
  ```json
  {
    "pending_id": "{{ $json.id }}",
    "missing_fields": "{{ $json.missing_fields }}",
    "transaction_data": "{{ $json.transaction_data }}",
    "created_at": "{{ $json.created_at }}"
  }
  ```

**6. Webhook/Email/Slack:** Notificar sobre pendências

---

## Workflow 4: Relatório de Transações Finalizadas

### Node Configuration

**1. Manual Trigger**

**2. HTTP Request - Buscar Finalizadas**
- **Method:** GET
- **URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction/final`
- **Headers:** (mesmo do anterior)

**3. Set Node - Formatar Relatório**
- **JavaScript Code:**
  ```javascript
  const transactions = $input.all()[0].json.transactions;
  
  const report = {
    total_transactions: transactions.length,
    total_amount: transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0),
    income_total: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    expense_total: transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    transactions_by_category: transactions.reduce((acc, t) => {
      const category = t.categories?.name || 'Sem categoria';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {})
  };
  
  return [{ json: report }];
  ```

**4. Email/Slack/Webhook:** Enviar relatório

---

## Casos de Uso Práticos

### Caso 1: Integração com WhatsApp
```json
{
  "user_id": "01bbae9d-54fb-41fe-86b7-75c1bb0600ca",
  "amount": 45.50,
  "description": "Lanche no trabalho",
  "type": "expense"
  // Campos faltantes: conta, date, forma_pagamento
}
```

### Caso 2: Completar via Zapier
```json
{
  "pending_transaction_id": "uuid-recebido",
  "complementary_data": {
    "conta": "Conta Corrente",
    "date": "2025-01-23",
    "forma_pagamento": "cartao_debito"
  }
}
```

### Caso 3: Dados de Formulário Parcial
```json
{
  "user_id": "01bbae9d-54fb-41fe-86b7-75c1bb0600ca",
  "amount": 1200.00,
  "description": "Freelance desenvolvimento",
  "type": "income",
  "conta": "Conta PJ"
  // Faltante apenas: date (será preenchido automaticamente se não fornecido)
}
```

---

## Tratamento de Erros

### Error Handling Node
```javascript
// Verificar resposta da API
if ($json.success === false) {
  return [
    {
      json: {
        error: true,
        message: $json.error || 'Erro desconhecido',
        details: $json.details,
        timestamp: new Date().toISOString()
      }
    }
  ];
}

return [{ json: $json }];
```

### Retry Logic
- **Maximum Retries:** 3
- **Retry Interval:** 30 segundos
- **Conditions:** HTTP 500, 502, 503, 504

---

## Monitoramento e Logs

### Webhook de Notificação
```json
{
  "workflow": "transaction_manager",
  "action": "{{ $json.action }}",
  "status": "{{ $json.status }}",
  "transaction_id": "{{ $json.transaction_id }}",
  "user_id": "{{ $json.user_id }}",
  "timestamp": "{{ new Date().toISOString() }}"
}
```

### Dashboard Metrics
- Total de transações criadas
- Transações pendentes por tempo
- Taxa de completude
- Erros por endpoint

---

## Exemplo de Workflow Completo (JSON)

```json
{
  "nodes": [
    {
      "name": "Manual Trigger",
      "type": "n8n-nodes-base.manualTrigger",
      "position": [100, 100]
    },
    {
      "name": "Create Transaction",
      "type": "n8n-nodes-base.httpRequest",
      "position": [300, 100],
      "parameters": {
        "method": "POST",
        "url": "https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/transaction-manager/transaction",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYW9ldXRocHp0eG9ueXRiY3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTQyMzQsImV4cCI6MjA3MDc3MDIzNH0.7ww6j9lgyrQfxOP825gM-1S3M9QboMojamNHJYWe2as"
        },
        "body": {
          "user_id": "01bbae9d-54fb-41fe-86b7-75c1bb0600ca",
          "amount": 100.50,
          "description": "Teste N8N",
          "type": "expense"
        }
      }
    }
  ]
}
```

Esse guia te permite implementar completamente o sistema de transações assíncronas no n8n com workflows robustos e tratamento de erros.