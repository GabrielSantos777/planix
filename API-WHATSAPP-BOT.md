# API WhatsApp Bot

Esta é a documentação da API do Bot do WhatsApp para integração com sistemas financeiros.

## 🔗 Endpoints

### 1. N8N Integration - Transações

**URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/n8n-webhook`
**Método:** POST
**Content-Type:** application/json

### 2. N8N Integration - Categorias  

**URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/n8n-category-webhook`
**Método:** POST
**Content-Type:** application/json

### 3. Resumo Financeiro

**URL:** `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/financial-summary`
**Método:** POST
**Content-Type:** application/json

## 📨 N8N Webhook - Transações

Permite integração com n8n para automação de transações financeiras.

### Exemplo de Payload para Transação:
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

### Campos Obrigatórios:
- `user_id`: UUID do usuário
- `amount`: Valor da transação (número positivo)
- `type`: Tipo da transação ("income" ou "expense")
- `description`: Descrição da transação
- `account_name` OU `credit_card_name`: Pelo menos um deve ser especificado

### Campos Opcionais:
- `category_name`: Nome da categoria (será criada se não existir)
- `date`: Data da transação (formato YYYY-MM-DD)
- `notes`: Observações adicionais

## 📨 N8N Webhook - Categorias

Permite criação de categorias via n8n.

### Exemplo de Payload para Categoria:
```json
{
  "user_id": "user-uuid-here",
  "name": "Nova Categoria",
  "type": "expense",
  "icon": "shopping-cart",
  "color": "#FF6B6B"
}
```

### Campos Obrigatórios:
- `user_id`: UUID do usuário
- `name`: Nome da categoria
- `type`: Tipo da categoria ("income" ou "expense")

### Campos Opcionais:
- `icon`: Ícone da categoria (padrão: "folder")
- `color`: Cor da categoria em hex (padrão: "#6B7280")

## 📨 Resumo Financeiro

### Headers
```json
{
  "Content-Type": "application/json"
}
```

### Body Parameters
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `user_id` | string (UUID) | Não* | ID único do usuário no sistema |
| `phone_number` | string | Não* | Número de telefone (formatos aceitos: +5511999999999, (11) 99999-9999, etc.) |

*Pelo menos um dos dois parâmetros deve ser fornecido

**📞 Formatos de telefone aceitos:**
- `+5511999999999` (formato internacional)
- `11999999999` (apenas números)
- `(11) 99999-9999` (formatado)
- A API faz busca inteligente removendo formatação e tentando variações

### Exemplo de Requisição
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

## 📤 Resposta

### Estrutura da Resposta (200 OK)
```json
{
  "saldo": 1250.75,
  "gastos_por_categoria": {
    "alimentacao": 450.20,
    "transporte": 180.00,
    "lazer": 120.50,
    "moradia": 800.00
  },
  "metas": [
    {
      "titulo": "Viagem para Europa",
      "objetivo": 5000.00,
      "atual": 1500.00,
      "progresso_percentual": 30,
      "status": "active"
    },
    {
      "titulo": "Reserva de Emergência",
      "objetivo": 10000.00,
      "atual": 7500.00,
      "progresso_percentual": 75,
      "status": "active"
    }
  ],
  "resumo_mensal": {
    "mes_ano": "janeiro de 2025",
    "total_gastos": 1550.70,
    "total_receitas": 3200.00,
    "principal_categoria": {
      "nome": "alimentacao",
      "valor": 450.20
    },
    "saldo_mensal": 1649.30
  },
  "estatisticas": {
    "total_transacoes": 45,
    "total_categorias": 8,
    "total_metas": 2,
    "ultima_atualizacao": "2025-01-24T10:30:00.000Z"
  }
}
```

## ❌ Códigos de Erro

### 400 - Bad Request
```json
{
  "error": "user_id ou phone_number é obrigatório"
}
```

### 404 - Not Found
```json
{
  "error": "Usuário não encontrado com este telefone"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Erro interno do servidor"
}
```

## 🔧 Integração com n8n

### 1. Configuração do Nó HTTP Request

- **Method**: POST
- **URL**: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/financial-summary`
- **Headers**: 
  - Content-Type: application/json
- **Body**: JSON
  ```json
  {
    "phone_number": "{{$node["WhatsApp Trigger"].json["from"]}}"
  }
  ```

### 🚨 Solução para Erro "Invalid URL" no n8n

Se você receber o erro `Invalid URL: "https://...". URL must start with "http" or "https"`, siga estes passos:

1. **Delete e recrie o nó HTTP Request** no n8n
2. **Cole a URL sem aspas**: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/financial-summary`
3. **Verifique se não há caracteres invisíveis** copiando a URL deste documento
4. **Alternative**: Use uma variável de ambiente no n8n:
   - Crie uma variável `SUPABASE_FUNCTION_URL` 
   - Valor: `https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/financial-summary`
   - Use `{{$env.SUPABASE_FUNCTION_URL}}` no campo URL

### 🔍 Teste Manual
Antes de configurar no n8n, teste no Postman:
```bash
curl -X POST https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/financial-summary \
  -H "Content-Type: application/json" \
  -d '{"phone_number": "+5511999999999"}'
```

### 2. Exemplo de Fluxo n8n

```
WhatsApp Trigger → HTTP Request (Financial API) → Process Response → WhatsApp Reply
```

### 3. Processamento da Resposta

Você pode usar os dados retornados para criar mensagens personalizadas:

```javascript
// Exemplo de código no nó "Code" do n8n
const response = $input.first().json;

const message = `💰 *Seu Resumo Financeiro*

🏦 *Saldo Atual:* R$ ${response.saldo.toFixed(2)}

📊 *Gastos por Categoria:*
${Object.entries(response.gastos_por_categoria)
  .map(([cat, valor]) => `• ${cat}: R$ ${valor.toFixed(2)}`)
  .join('\n')}

🎯 *Suas Metas:*
${response.metas.map(meta => 
  `• ${meta.titulo}: ${meta.progresso_percentual}% (R$ ${meta.atual}/${meta.objetivo})`
).join('\n')}

📈 *Resumo de ${response.resumo_mensal.mes_ano}:*
• Receitas: R$ ${response.resumo_mensal.total_receitas}
• Gastos: R$ ${response.resumo_mensal.total_gastos}
• Principal categoria: ${response.resumo_mensal.principal_categoria?.nome} (R$ ${response.resumo_mensal.principal_categoria?.valor})
• Saldo do mês: R$ ${response.resumo_mensal.saldo_mensal}`;

return [{ json: { message } }];
```

## 🚀 Casos de Uso para o Bot

### 1. Consulta de Saldo
**Comando do usuário**: "saldo"
**Resposta**: "Seu saldo atual é R$ 1.250,75"

### 2. Gastos por Categoria
**Comando do usuário**: "gastos alimentação"
**Resposta**: "Você gastou R$ 450,20 em alimentação"

### 3. Progresso de Metas
**Comando do usuário**: "metas"
**Resposta**: "Viagem: 30% concluído (R$ 1.500/5.000)"

### 4. Resumo Mensal
**Comando do usuário**: "resumo mensal"
**Resposta**: Mensagem completa com todas as informações

## 🔒 Segurança

- ✅ API pública (não requer autenticação)
- ✅ CORS habilitado para integração web
- ✅ Validação de entrada obrigatória
- ✅ Rate limiting aplicado pelo Supabase
- ✅ Logs detalhados para monitoramento

## ⚠️ Notas Importantes

1. **Transações**: É obrigatório especificar uma conta bancária (`account_name`) ou cartão de crédito (`credit_card_name`). Se a conta/cartão não existir, a transação será rejeitada.
2. **Categorias**: Se já existir uma categoria com o mesmo nome e tipo para o usuário, retornará a categoria existente ao invés de criar uma nova.
3. Todas as datas devem estar no formato ISO 8601 (YYYY-MM-DD)
4. Valores monetários devem ser números positivos
5. O sistema criará automaticamente categorias que não existirem nas transações

## 📊 Monitoramento

Para monitorar a performance da API, acesse:
- **Logs**: [Supabase Functions Logs](https://supabase.com/dashboard/project/zdaoeuthpztxonytbcww/functions/financial-summary/logs)
- **Métricas**: Dashboard do Supabase

## 🧪 Teste da API

Você pode testar a API diretamente na interface do sistema:
1. Acesse a página de "Conexão WhatsApp"
2. Role até a seção "Testar API de Resumo Financeiro"
3. Insira um número de telefone (ou use seu usuário logado)
4. Clique em "Testar API"

## 🛠️ Desenvolvimento

### Logs e Debug
A função inclui logs detalhados para facilitar o debug:
- Dados da requisição recebida
- Consultas ao banco de dados
- Erros e exceções
- Sucesso na geração do resumo

### Personalização
Para adicionar novos campos ou modificar a estrutura de resposta, edite o arquivo:
`supabase/functions/financial-summary/index.ts`

---

**📞 Suporte**: Em caso de dúvidas ou problemas, verifique os logs da função no dashboard do Supabase.