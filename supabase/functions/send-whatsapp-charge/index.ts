import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChargeRequest {
  phoneNumber: string
  contactName: string
  transactions: Array<{
    description: string
    amount: number
    date: string
  }>
  total: number
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { phoneNumber, contactName, transactions, total }: ChargeRequest = await req.json()

    console.log('Sending WhatsApp charge message to:', phoneNumber)

    // Formatar lista de transações
    const transactionList = transactions
      .map((t, index) => `${index + 1}. ${t.description} - R$ ${Math.abs(t.amount).toFixed(2)} (${new Date(t.date).toLocaleDateString('pt-BR')})`)
      .join('\n')

    // Montar mensagem
    const message = `Olá ${contactName}! 👋\n\nAqui está o resumo das suas compras:\n\n${transactionList}\n\n💰 *Total: R$ ${total.toFixed(2)}*\n\nPor favor, realize o pagamento quando possível. Obrigado!`

    // Get WhatsApp credentials from environment
    const WHATSAPP_ACCESS_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN')
    const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID') || '517099498154043'

    if (!WHATSAPP_ACCESS_TOKEN) {
      throw new Error('WHATSAPP_ACCESS_TOKEN not configured')
    }

    // Clean phone number (remove special characters)
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`

    // Send via WhatsApp Business API
    const whatsappResponse = await fetch(
      `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: fullPhone,
          type: 'text',
          text: {
            body: message
          }
        }),
      }
    )

    const whatsappData = await whatsappResponse.json()

    if (!whatsappResponse.ok) {
      console.error('WhatsApp API error:', whatsappData)
      throw new Error(`WhatsApp API error: ${JSON.stringify(whatsappData)}`)
    }

    console.log('WhatsApp message sent successfully:', whatsappData)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mensagem enviada com sucesso',
        whatsappData 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error: any) {
    console.error('Error in send-whatsapp-charge function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
