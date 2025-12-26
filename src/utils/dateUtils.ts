/**
 * Utilitários para manipulação correta de datas, respeitando o fuso horário local
 */

/**
 * Retorna a data atual no formato YYYY-MM-DD respeitando o fuso horário local
 * Evita o problema onde new Date().toISOString().split('T')[0] retorna o dia anterior
 * em fusos horários negativos (como Brasil UTC-3) após as 21h
 */
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Converte uma string de data para um objeto Date ajustado para meio-dia
 * para evitar problemas de fuso horário
 */
export function parseLocalDate(dateString: string): Date {
  // Adiciona T12:00:00 para evitar problemas de fuso horário
  return new Date(dateString + 'T12:00:00')
}

/**
 * Retorna a data de um mês futuro respeitando o fuso horário local
 * Útil para parcelas de cartão de crédito
 */
export function getLocalDateForMonth(baseDate: Date, monthsToAdd: number): string {
  const date = new Date(baseDate.getFullYear(), baseDate.getMonth() + monthsToAdd, baseDate.getDate())
  return getLocalDateString(date)
}
