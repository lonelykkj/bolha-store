import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/store'
import { CATS, PRODUCTS } from '../data/products'
import { grid, muted, off, on, pad } from '../styles/tokens'
import { plural } from '../utils/format'

const SHOP_CATS: [string, string, number][] = [
  ['todos', 'Todos', PRODUCTS.length],
  ...CATS.map(([id, label]): [string, string, number] => [id, label, PRODUCTS.filter((p) => p.cat === id).length]),
]

export default function Shop() {
  const { cat, setCat } = useStore()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('rel')

  let list = PRODUCTS.filter((p) => (cat === 'todos' || p.cat === cat) && (!q || p.name.toLowerCase().includes(q.toLowerCase())))
  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: `16px ${pad} 80px`, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
        <h1 className="disp" style={{ fontSize: 'clamp(48px,6vw,88px)' }}>Produtos</h1>
        <label className="lbl" style={{ minWidth: 'min(340px,100%)' }}>
          <span className="sr">Buscar produtos</span>
          <input className="fld" type="search" placeholder="Buscar por nome…" value={q} onChange={(e) => setQ(e.target.value)} style={{ borderRadius: 999, padding: '0 22px' }} />
        </label>
      </div>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <aside style={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', gap: 28, minWidth: 'min(220px,100%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: muted }}>Categorias</h2>
            {SHOP_CATS.map(([id, label, count]) => (
              <button key={id} onClick={() => setCat(id)} aria-pressed={cat === id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 0, borderRadius: 14, minHeight: 44, padding: '0 14px', fontSize: 16, fontWeight: 700, textAlign: 'left', ...(cat === id ? on : off) }}>
                <span>{label}</span><span style={{ fontWeight: 500, opacity: 0.7 }}>{count}</span>
              </button>
            ))}
          </div>
          <label className="lbl">
            Ordenar por
            <select className="fld" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="rel">Mais relevantes</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </label>
        </aside>
        <div style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ margin: 0, color: muted }}>{plural(list.length, 'produto', 'produtos')}</p>
          <div style={grid(260, 'auto-fill')}>{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          {list.length === 0 && (
            <div style={{ background: '#fff', borderRadius: 32, padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              <h2 className="disp" style={{ fontSize: 36 }}>Nada por aqui ainda</h2>
              <p style={{ margin: 0, color: muted }}>Tente outro nome ou volte para todas as categorias.</p>
              <button className="pri btn" onClick={() => { setCat('todos'); setQ('') }}>Limpar filtros</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
