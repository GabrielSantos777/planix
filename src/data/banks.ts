export interface Bank {
  id: string
  name: string
  icon: string
  color: string
}

export const banks: Bank[] = [
  { id: 'itau', name: 'Itaú', icon: '🔶', color: '#EC7000' },
  { id: 'bradesco', name: 'Bradesco', icon: '🔴', color: '#CC092F' },
  { id: 'banco-do-brasil', name: 'Banco do Brasil', icon: '🟡', color: '#FBB040' },
  { id: 'santander', name: 'Santander', icon: '🔺', color: '#EC0000' },
  { id: 'caixa', name: 'Caixa Econômica', icon: '🔵', color: '#0F75BC' },
  { id: 'nubank', name: 'Nubank', icon: '💜', color: '#8A05BE' },
  { id: 'inter', name: 'Banco Inter', icon: '🧡', color: '#FF8700' },
  { id: 'c6', name: 'C6 Bank', icon: '⚫', color: '#000000' },
  { id: 'original', name: 'Banco Original', icon: '🟢', color: '#00C851' },
  { id: 'safra', name: 'Banco Safra', icon: '🔷', color: '#00447C' },
  { id: 'btg', name: 'BTG Pactual', icon: '⚡', color: '#1B1464' },
  { id: 'xp', name: 'XP Investimentos', icon: '✨', color: '#F7B801' },
  { id: 'picpay', name: 'PicPay', icon: '💚', color: '#11C76F' },
  { id: 'mercado-pago', name: 'Mercado Pago', icon: '💎', color: '#009EE3' },
  { id: 'stone', name: 'Banco Stone', icon: '🟫', color: '#00D97E' },
  { id: 'neon', name: 'Neon', icon: '🔆', color: '#00D97E' },
  { id: 'next', name: 'Next', icon: '🟦', color: '#0066CC' },
  { id: 'will-bank', name: 'Will Bank', icon: '🌟', color: '#9C27B0' },
  { id: 'other', name: 'Outro', icon: '🏦', color: '#6B7280' }
]