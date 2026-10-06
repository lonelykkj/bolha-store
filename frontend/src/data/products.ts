export type Kind = 'tee' | 'long' | 'hoodie' | 'pants' | 'sock' | 'cap'
export type Color = { n: string; h: string }
export type Product = {
  id: string
  name: string
  cat: string
  price: number
  type: Kind
  bg: string
  colors: Color[]
  sizes: string[]
  desc: string
}
export type Line = { pid: string; color: number; size: string; qty: number }
export type Status = 'Entregue' | 'A caminho' | 'Preparando'
export type Order = { id: string; date: string; status: Status; ship: number; items: Line[] }

export const FREE = 299

export const CATS: [string, string][] = [
  ['camisas', 'Camisas'],
  ['blusas', 'Blusas'],
  ['calcas', 'Calças'],
  ['meias', 'Meias'],
  ['acessorios', 'Acessórios'],
]
export const CAT_LABEL: Record<string, string> = Object.fromEntries(CATS)
export const CAT_PREVIEW: Record<string, { kind: Kind; hex: string; bg: string }> = {
  camisas: { kind: 'tee', hex: '#8D9BFF', bg: '#E3E6FF' },
  blusas: { kind: 'hoodie', hex: '#6FE0BC', bg: '#DDF7EC' },
  calcas: { kind: 'pants', hex: '#FF8A5B', bg: '#FFE5DA' },
  meias: { kind: 'sock', hex: '#FF9AC8', bg: '#FFE3F0' },
  acessorios: { kind: 'cap', hex: '#FFD84D', bg: '#FFF3C2' },
}

const LAV = { n: 'Lavanda', h: '#8D9BFF' }
const MEN = { n: 'Menta', h: '#6FE0BC' }
const ROS = { n: 'Rosa', h: '#FF9AC8' }
const TAN = { n: 'Tangerina', h: '#FF8A5B' }
const LIM = { n: 'Limão', h: '#FFD84D' }
const GRA = { n: 'Grafite', h: '#3A3948' }
const CRE = { n: 'Creme', h: '#F2E9D8' }
const ROUPA = ['P', 'M', 'G', 'GG']

export const PRODUCTS: Product[] = [
  { id: 'oversized', name: 'Camiseta Bolha Oversized', cat: 'camisas', price: 129.9, type: 'tee', bg: '#E3E6FF', colors: [LAV, MEN, ROS], sizes: ROUPA, desc: 'Modelagem ampla e ombro caído, para usar com tudo. Uma camiseta que você vai querer em todas as cores.' },
  { id: 'basica', name: 'Camiseta Pufo Básica', cat: 'camisas', price: 89.9, type: 'tee', bg: '#FFF3C2', colors: [LIM, CRE, GRA], sizes: ROUPA, desc: 'A básica do dia a dia, com caimento reto e cara de peça favorita desde o primeiro uso.' },
  { id: 'balao', name: 'Camisa Balão Manga Longa', cat: 'camisas', price: 169.9, type: 'long', bg: '#FFE5DA', colors: [TAN, LAV], sizes: ROUPA, desc: 'Manga longa com volume na medida certa. Combina com calça, bermuda e com o seu humor.' },
  { id: 'moletom', name: 'Moletom Infla Capuz', cat: 'blusas', price: 299.9, type: 'hoodie', bg: '#DDF7EC', colors: [MEN, ROS, GRA], sizes: ROUPA, desc: 'Capuz grande, bolso canguru e aquele abraço de moletom. Feito para os dias de ficar à vontade.' },
  { id: 'nuvem', name: 'Blusa Nuvem Manga Longa', cat: 'blusas', price: 219.9, type: 'long', bg: '#E3E6FF', colors: [CRE, LAV, ROS], sizes: ROUPA, desc: 'Blusa leve e folgada, ótima para sobrepor ou usar sozinha quando o clima pede.' },
  { id: 'cargo', name: 'Calça Boia Cargo', cat: 'calcas', price: 259.9, type: 'pants', bg: '#FFE5DA', colors: [TAN, GRA, CRE], sizes: ['36', '38', '40', '42', '44'], desc: 'Perna larga, cós confortável e muito espaço para ir e vir. A calça que combina com tênis e com chinelo.' },
  { id: 'jogger', name: 'Calça Bolha Jogger', cat: 'calcas', price: 199.9, type: 'pants', bg: '#DDF7EC', colors: [MEN, GRA, LAV], sizes: ['36', '38', '40', '42', '44'], desc: 'Jogger macia com barra ajustada. Confortável para o dia inteiro, do sofá à rua.' },
  { id: 'meia1', name: 'Meia Cano Alto', cat: 'meias', price: 49.9, type: 'sock', bg: '#FFE3F0', colors: [ROS, MEN, LIM], sizes: ['34–38', '39–43'], desc: 'Cano alto e pé fofinho. Para quem acredita que meia também é parte do look.' },
  { id: 'meia2', name: 'Meia Bolinha', cat: 'meias', price: 39.9, type: 'sock', bg: '#E3E6FF', colors: [LAV, TAN], sizes: ['34–38', '39–43'], desc: 'Meia curtinha e divertida, com a cara da Bolha. Boa de dar de presente (e de ficar com ela).' },
  { id: 'bone', name: 'Boné Bolha', cat: 'acessorios', price: 99.9, type: 'cap', bg: '#FFF3C2', colors: [LIM, ROS, GRA], sizes: ['Único'], desc: 'Aba curva, regulagem na parte de trás e o toque de cor que faltava no seu visual.' },
]

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!
export const BADGE: Record<Status, string> = { Entregue: '#6FE0BC', 'A caminho': '#FFD84D', Preparando: '#C9D0FF' }

export const ORDERS: Order[] = [
  { id: '#BH-1030', date: '3 de outubro', status: 'Preparando', ship: 19.9, items: [{ pid: 'meia2', color: 0, size: '39–43', qty: 2 }, { pid: 'bone', color: 1, size: 'Único', qty: 1 }] },
  { id: '#BH-1012', date: '28 de setembro', status: 'A caminho', ship: 0, items: [{ pid: 'moletom', color: 0, size: 'G', qty: 1 }] },
  { id: '#BH-0987', date: '12 de setembro', status: 'Entregue', ship: 0, items: [{ pid: 'oversized', color: 1, size: 'M', qty: 1 }, { pid: 'jogger', color: 1, size: '40', qty: 1 }] },
]
