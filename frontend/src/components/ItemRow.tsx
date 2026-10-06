import { byId, type Line } from '../data/products'
import { muted } from '../styles/tokens'
import { fmt } from '../utils/format'
import Thumb from './Thumb'

export default function ItemRow({ l }: { l: Line }) {
  const p = byId(l.pid)
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <Thumb l={l} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <strong>{p.name}</strong>
        <span style={{ color: muted, fontSize: 14 }}>{p.colors[l.color].n} · {l.size}</span>
      </div>
      <strong>{fmt(p.price * l.qty)}</strong>
    </div>
  )
}
