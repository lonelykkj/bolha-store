import { byId, type Line } from '../data/products'
import { INK } from '../styles/tokens'
import Garment from './Garment'

// Miniatura da peça com a quantidade no canto
export default function Thumb({ l, size = 72, radius = 20 }: { l: Line; size?: number; radius?: number }) {
  const p = byId(l.pid)
  return (
    <div style={{ position: 'relative', flex: `0 0 ${size}px`, width: size, height: size, borderRadius: radius, display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.bg }}>
      <div style={{ width: '76%' }}><Garment kind={p.type} color={p.colors[l.color].h} /></div>
      <span style={{ position: 'absolute', right: -6, top: -6, minWidth: 24, height: 24, borderRadius: 12, background: INK, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>{l.qty}</span>
    </div>
  )
}
