export const fmt = (n: number) => 'R$ ' + n.toFixed(2).replace('.', ',')
export const shipText = (n: number) => (n === 0 ? 'Grátis' : fmt(n))
export const plural = (n: number, one: string, many: string) => n + ' ' + (n === 1 ? one : many)
