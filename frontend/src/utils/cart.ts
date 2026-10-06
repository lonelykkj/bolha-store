import { byId, type Line } from '../data/products'

export const subtotal = (items: Line[]) => items.reduce((a, l) => a + byId(l.pid).price * l.qty, 0)
export const countItems = (items: Line[]) => items.reduce((a, l) => a + l.qty, 0)
