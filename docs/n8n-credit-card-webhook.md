# Webhook n8n para Despesas de Cartão de Crédito

## Visão Geral
Este documento descreve como usar o webhook n8n para inserir automaticamente despesas de cartão de crédito no sistema Planix.

## Configuração do Endpoint

### URL do Webhook
```
https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/n8n-webhook
```

### Método HTTP
```
POST
```

### Autenticação
O webhook requer autenticação via API Key no header:

```http
x-api-key: SUA_CHAVE_API_N8N
```

**Importante:** A chave de API (`N8N_API_KEY`) deve estar configurada nos secrets do Supabase.

## Estrutura do Payload

### Para Criar uma Transação de Cartão de Crédito

```json
{
  "user_id": "uuid-do-usuario",
  "amount": 150.50,
  "type": "expense",
  "description": "Compra no Supermercado",
  "date": "2025-01-15",
  "category_name": "Alimentação",
  "credit_card_name": "Nubank",
  "notes": "Compra mensal"
}
```

### Campos Obrigatórios

| Campo | Tipo | Descrição | Validação |
|-------|------|-----------|-----------|
| `user_id` | string (UUID) | ID do usuário no sistema | Formato UUID válido |
| `amount` | number | Valor da transação | Entre -1.000.000 e 1.000.000 |
| `type` | string | Tipo da transação | "income" ou "expense" |
| `description` | string | Descrição da transação | 1-200 caracteres |
| `credit_card_name` | string | Nome do cartão de crédito | Máx. 100 caracteres |

### Campos Opcionais

| Campo | Tipo | Descrição | Padrão |
|-------|------|-----------|--------|
| `date` | string | Data da transação (YYYY-MM-DD) | Data atual |
| `category_name` | string | Nome da categoria | - |
| `notes` | string | Observações adicionais | - |
| `account_name` | string | Nome da conta (alternativa ao cartão) | - |

**Importante:** Uma transação deve ter **ou** `credit_card_name` **ou** `account_name`, nunca ambos.

## Exemplos de Uso

### Exemplo 1: Despesa Simples de Cartão

```bash
curl -X POST https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/n8n-webhook \
  -H "Content-Type: application/json" \
  -H "x-api-key: SUA_CHAVE_API" \
  -d '{
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "amount": 89.90,
    "type": "expense",
    "description": "Netflix - Assinatura Mensal",
    "date": "2025-01-15",
    "category_name": "Entretenimento",
    "credit_card_name": "Nubank"
  }'
```

### Exemplo 2: Despesa com Categoria Nova

Se a categoria não existir, ela será criada automaticamente:

```json
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 250.00,
  "type": "expense",
  "description": "Consulta Médica",
  "category_name": "Saúde",
  "credit_card_name": "Mastercard Black",
  "notes": "Dr. Silva - Consulta de rotina"
}
```

### Exemplo 3: Despesa em Conta Bancária (não cartão)

```json
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 1200.00,
  "type": "expense",
  "description": "Aluguel Janeiro 2025",
  "account_name": "Conta Corrente",
  "category_name": "Moradia",
  "date": "2025-01-05"
}
```

## Respostas da API

### Sucesso (200 OK)

```json
{
  "success": true,
  "transaction_id": "uuid-da-transacao",
  "message": "Transaction registered successfully"
}
```

### Erro de Validação (400 Bad Request)

```json
{
  "error": "Invalid transaction data",
  "details": [
    {
      "path": ["amount"],
      "message": "Number must be greater than or equal to -1000000"
    }
  ]
}
```

### Erro de Autenticação (401 Unauthorized)

```json
{
  "error": "Unauthorized: Invalid or missing API key"
}
```

### Erro do Servidor (500 Internal Server Error)

```json
{
  "error": "Internal server error",
  "details": "Detailed error message"
}
```

## Configuração no n8n

### Passo 1: Criar o Workflow
1. Adicione um nó de **Webhook** ou **HTTP Request**
2. Configure o método como **POST**
3. Adicione a URL do endpoint

### Passo 2: Configurar Headers
No nó HTTP Request, adicione os headers:
```
Content-Type: application/json
x-api-key: SUA_CHAVE_API_N8N
```

### Passo 3: Configurar o Body
Mapeie os dados do seu fluxo para a estrutura esperada:

```javascript
{
  "user_id": "{{ $json.user_id }}",
  "amount": {{ $json.amount }},
  "type": "expense",
  "description": "{{ $json.description }}",
  "category_name": "{{ $json.category }}",
  "credit_card_name": "{{ $json.card_name }}",
  "date": "{{ $json.date }}"
}
```

### Passo 4: Teste
Execute o workflow e verifique:
- ✅ Status 200 na resposta
- ✅ transaction_id retornado
- ✅ Transação aparece no Planix

## Validações e Regras

### Data
- Formato: YYYY-MM-DD
- Deve estar entre 2 anos atrás e 1 ano no futuro
- Se omitida, usa a data atual

### Valor (amount)
- Sempre será convertido para valor absoluto
- Limite: -1.000.000 a 1.000.000

### Categorias
- Se não existir, será criada automaticamente
- Nome deve ter 1-50 caracteres
- Ícone padrão: "folder"
- Cor padrão: "#6B7280"

### Cartões de Crédito / Contas
- Devem existir previamente no sistema
- Erro 400 se não encontrado
- Verificar nome exato (case-sensitive)

## Troubleshooting

### Erro: "Credit card 'Nome' not found"
**Solução:** Verifique se o cartão de crédito existe no sistema e se o nome está correto (incluindo maiúsculas/minúsculas).

### Erro: "Invalid JSON in request body"
**Solução:** Verifique se o JSON está bem formatado e se o Content-Type está definido como "application/json".

### Erro: "Unauthorized"
**Solução:** Verifique se a API Key está configurada corretamente no header `x-api-key` e se o secret `N8N_API_KEY` existe no Supabase.

### Erro: "Either account_name or credit_card_name must be specified"
**Solução:** Inclua `credit_card_name` OU `account_name` no payload (mas não ambos).

## Criar Categorias via Webhook

Você também pode criar categorias separadamente:

```json
{
  "action": "create_category",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Nova Categoria",
  "type": "expense",
  "icon": "folder",
  "color": "#FF5733"
}
```

Resposta:
```json
{
  "success": true,
  "category_id": "uuid-da-categoria",
  "message": "Category created successfully"
}
```

## Segurança

⚠️ **IMPORTANTE:**
- Nunca compartilhe sua API Key publicamente
- Use HTTPS sempre
- Armazene a API Key de forma segura no n8n
- Monitore os logs de acesso regularmente
- Rotacione a API Key periodicamente

## Suporte

Para dúvidas ou problemas:
1. Verifique os logs do Edge Function no Supabase
2. Teste o payload usando ferramentas como Postman ou curl
3. Valide o formato JSON em jsonlint.com
4. Revise a documentação da API do Planix

## Changelog

### v1.0.0 (2025-01-15)
- ✅ Validação de entrada com Zod
- ✅ Autenticação via API Key
- ✅ Suporte a cartões de crédito e contas bancárias
- ✅ Criação automática de categorias
- ✅ Tratamento de erros robusto
