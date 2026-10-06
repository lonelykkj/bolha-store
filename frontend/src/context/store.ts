import { createContext, useContext, useState } from 'react'
import { FREE, ORDERS, type Line, type Order } from '../data/products'
import { countItems, subtotal } from '../utils/cart'
import { fmt } from '../utils/format'

export type View = 'home' | 'shop' | 'product' | 'account' | 'checkout' | 'done' | 'cart' | 'track' | 'about'

const LAST_ID = '#BH-1043'

// Estado compartilhado entre as páginas: navegação, carrinho, favoritos e pedidos.
export function useStoreState() {
  const [view, setView] = useState<View>('home')
  const [cat, setCat] = useState('todos')
  const [pid, setPid] = useState('oversized')
  const [cart, setCart] = useState<Line[]>([{ pid: 'oversized', color: 0, size: 'M', qty: 1 }, { pid: 'meia1', color: 0, size: '34–38', qty: 2 }])
  const [cartOpen, setCartOpen] = useState(false)
  const [logged, setLogged] = useState(false)
  const [acc, setAcc] = useState('pedidos')
  const [favs, setFavs] = useState(['moletom', 'jogger'])
  const [shipOpt, setShipOpt] = useState('std')
  const [couponOk, setCouponOk] = useState(false)
  const [trackId, setTrackId] = useState('#BH-1030')
  const [orders, setOrders] = useState<Order[]>(ORDERS)

  function go(v: View) {
    setView(v)
    setCartOpen(false)
    window.scrollTo(0, 0)
  }
  function openProduct(id: string) { setPid(id); go('product') }
  function goShopCat(id: string) { setCat(id); go('shop') }
  function goOrders() { setAcc('pedidos'); setLogged(true); go('account') }
  function goTrack(id: string) { setTrackId(id); setLogged(true); go('track') }
  const toggleFav = (id: string) => setFavs(favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id])

  function addToCart(line: Line) {
    const next = [...cart]
    const i = next.findIndex((l) => l.pid === line.pid && l.color === line.color && l.size === line.size)
    if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + line.qty }
    else next.push(line)
    setCart(next)
    setCartOpen(true)
  }
  function step(i: number, d: number) {
    const next = [...cart]
    const n = next[i].qty + d
    if (n < 1) next.splice(i, 1)
    else next[i] = { ...next[i], qty: n }
    setCart(next)
  }
  const remove = (i: number) => setCart(cart.filter((_, j) => j !== i))

  const sub = subtotal(cart)
  const base = sub >= FREE || sub === 0 ? 0 : 19.9
  const ship = shipOpt === 'exp' ? 29.9 : base
  const disc = couponOk ? Math.round(sub * 10) / 100 : 0
  const total = sub - disc + ship

  function confirmOrder() {
    if (!cart.length) return
    setOrders([{ id: LAST_ID, date: 'Hoje', status: 'Preparando', ship, items: cart }, ...orders])
    setCart([])
    setLogged(true)
    go('done')
  }

  return {
    view, go, cat, setCat, pid, openProduct, goShopCat, goOrders, goTrack,
    cart, cartOpen, setCartOpen, addToCart, step, remove, confirmOrder,
    logged, setLogged, acc, setAcc, favs, toggleFav,
    shipOpt, setShipOpt, couponOk, setCouponOk, trackId, orders, lastId: LAST_ID,
    sub, base, ship, disc, total,
    cartCount: countItems(cart),
    freeMsg: sub >= FREE ? 'Você ganhou frete grátis!' : 'Faltam ' + fmt(FREE - sub) + ' para o frete grátis',
    barPct: Math.min(100, Math.round((sub / FREE) * 100)),
  }
}

export type Store = ReturnType<typeof useStoreState>
export const StoreContext = createContext<Store | null>(null)

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore precisa estar dentro do StoreProvider')
  return store
}
