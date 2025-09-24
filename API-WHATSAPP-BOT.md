# API de Resumo Financeiro para Bot WhatsApp

## 📋 Visão Geral

API criada para permitir que bots do WhatsApp consultem informações financeiras personalizadas dos usuários. Retorna dados estruturados em JSON para fácil integração com n8n e outros sistemas de automação.

## 🔗 Endpoint

```
POST https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/financial-summary
```

## 📨 Requisição

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
| `phone_number` | string | Não* | Número de telefone no formato +5511999999999 |

*Pelo menos um dos dois parâmetros deve ser fornecido

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
- **URL**: https://zdaoeuthpztxonytbcww.supabase.co/functions/v1/financial-summary
- **Headers**: 
  - Content-Type: application/json
- **Body**: JSON
  ```json
  {
    "phone_number": "{{$node["WhatsApp Trigger"].json["from"]}}"
  }
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