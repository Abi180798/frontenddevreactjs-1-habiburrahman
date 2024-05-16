export const randomNumber = Math.random() * 10000;
export function formatNumber(number: number) {
  return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number((number || 0)?.toFixed(2)))
}