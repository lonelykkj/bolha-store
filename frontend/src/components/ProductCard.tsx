import { useStore } from '../context/store'
import type { Product } from '../data/products'
import { INK } from '../styles/tokens'
import { fmt } from '../utils/format'
import Garment from './Garment'

export default function ProductCard({ p }: { p: Product }) {
  const { favs, toggleFav, openProduct } = useStore()
  const fav = favs.includes(p.id)
  const price = fmt(p.price)
  return (
    <div className="pc" style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 32, overflow: 'hidden', background: p.bg }}>
      <button onClick={() => openProduct(p.id)} aria-label={`Ver ${p.name}, ${price}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: 'transparent', padding: 0, textAlign: 'left' }}>
        <span className="pc-img" style={{ position: 'absolute', left: '12%', right: '12%', top: '8%', bottom: '24%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: '100%' }}><Garment kind={p.type} color={p.colors[0].h} /></span>
        </span>
        <span style={{ position: 'absolute', left: 14, right: 14, bottom: 14, background: '#fff', borderRadius: 999, padding: '8px 8px 8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, boxShadow: '0 4px 14px rgba(21,20,31,.08)' }}>
          <span style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2, minWidth: 0 }}>{p.name}</span>
          <span style={{ flex: '0 0 auto', background: INK, color: '#fff', borderRadius: 999, padding: '8px 14px', fontWeight: 700, fontSize: 14 }}>{price}</span>
        </span>
      </button>
      <button className="pc-fav" onClick={() => toggleFav(p.id)} aria-label="Favoritar" aria-pressed={fav} style={{ position: 'absolute', top: 14, right: 14, width: 48, height: 48, borderRadius: '50%', border: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill={fav ? '#FF8A5B' : 'none'} stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </svg>
      </button>
    </div>
  )
}
