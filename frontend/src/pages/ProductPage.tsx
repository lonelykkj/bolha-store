import { useState, type CSSProperties } from 'react'
import Garment from '../components/Garment'
import Icon, { ArrowLeft, ArrowRight } from '../components/Icon'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/store'
import { CAT_LABEL, PRODUCTS, byId } from '../data/products'
import { ACCENT, INK, grid, muted, offWhite, on, pad } from '../styles/tokens'
import { fmt } from '../utils/format'

const line = '1.5px solid #DAD8E8'
const navBtn: CSSProperties = { width: 48, height: 48, border: 0, borderRadius: 999, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }
const qtyBtn: CSSProperties = { width: 48, height: 54, border: 0, background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }

export default function ProductPage() {
  const { pid, go, addToCart } = useStore()
  const [color, setColor] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)

  const cur = byId(pid)
  const col = cur.colors[color]
  const gallery = [
    { bg: cur.bg, tf: 'scale(1)', label: 'Frente' },
    { bg: cur.bg, tf: 'scale(1.9) translate(-3%,5%)', label: 'Detalhe' },
    { bg: INK, tf: 'scale(.85) rotate(-8deg)', label: 'Em destaque' },
  ]
  const gal = gallery[img]
  const related = [...PRODUCTS.filter((p) => p.id !== cur.id && p.cat === cur.cat), ...PRODUCTS.filter((p) => p.id !== cur.id && p.cat !== cur.cat)].slice(0, 4)

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: `0 ${pad} 80px`, display: 'flex', flexDirection: 'column', gap: 64 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <nav aria-label="Você está em" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 14, color: muted }}>
          <button className="lnk" onClick={() => go('shop')} style={{ background: 'none', border: 0, minHeight: 44, padding: 0, color: muted, textDecoration: 'underline', fontSize: 14 }}>Produtos</button>
          <span aria-hidden="true">/</span>
          <span>{CAT_LABEL[cur.cat]}</span>
          <span aria-hidden="true">/</span>
          <span style={{ color: INK, fontWeight: 700 }}>{cur.name}</span>
        </nav>
        <div style={{ ...grid(460), gap: 'clamp(24px,4vw,64px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 40, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: gal.bg }}>
              <div style={{ width: '74%', transition: 'transform .5s cubic-bezier(.3,1.3,.5,1)', transform: gal.tf }}><Garment kind={cur.type} color={col.h} /></div>
              <div style={{ position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)', background: '#fff', borderRadius: 999, padding: 4, display: 'flex', gap: 2, boxShadow: '0 6px 20px rgba(21,20,31,.12)' }}>
                <button onClick={() => setImg((img + 2) % 3)} aria-label="Imagem anterior" style={navBtn}><ArrowLeft /></button>
                <span style={{ width: 1, background: '#DAD8E8', margin: '8px 0' }} />
                <button onClick={() => setImg((img + 1) % 3)} aria-label="Próxima imagem" style={navBtn}><ArrowRight /></button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {gallery.map((g, i) => (
                <button key={g.label} onClick={() => setImg(i)} aria-label={'Ver imagem: ' + g.label} aria-pressed={i === img} style={{ width: 92, height: 92, borderRadius: 24, border: '2.5px solid', borderColor: i === img ? INK : 'transparent', padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: g.bg }}>
                  <span style={{ width: '78%', transform: g.tf }}><Garment kind={cur.type} color={col.h} /></span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 28, borderBottom: line }}>
              <h1 className="disp" style={{ fontSize: 'clamp(38px,4.6vw,64px)' }}>{cur.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span style={{ background: ACCENT, color: INK, borderRadius: 999, padding: '8px 18px', fontWeight: 700, fontSize: 20 }}>{fmt(cur.price)}</span>
                <span style={{ color: muted, fontSize: 15 }}>ou 3x de {fmt(cur.price / 3)} sem juros</span>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#3F3E4E' }}>{cur.desc}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontWeight: 700 }}>Cor: <span style={{ fontWeight: 500 }}>{col.n}</span></div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', padding: 6 }}>
                {cur.colors.map((c, i) => (
                  <button key={c.n} onClick={() => setColor(i)} aria-label={c.n} aria-pressed={i === color} style={{ width: 44, height: 44, borderRadius: '50%', border: 0, padding: 0, background: c.h, boxShadow: i === color ? `0 0 0 3px #F4F3F9,0 0 0 5px ${INK}` : 'inset 0 0 0 1.5px rgba(21,20,31,.25)' }} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontWeight: 700 }}>Tamanho</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {cur.sizes.map((z) => (
                  <button key={z} onClick={() => setSize(z)} aria-pressed={z === size} style={{ minWidth: 64, height: 48, borderRadius: 999, border: `1.5px solid ${INK}`, padding: '0 18px', fontSize: 16, fontWeight: 700, ...(z === size ? on : offWhite) }}>{z}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 999, border: `1.5px solid ${INK}` }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuir quantidade" style={qtyBtn}><Icon size={18} sw={2.4}><path d="M5 12h14" /></Icon></button>
                <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 700, fontSize: 18 }} aria-live="polite">{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Aumentar quantidade" style={qtyBtn}><Icon size={18} sw={2.4}><path d="M12 5v14M5 12h14" /></Icon></button>
              </div>
              <button className="pri btn" onClick={() => size && addToCart({ pid, color, size, qty })} aria-disabled={!size} style={{ flex: '1 1 240px', height: 58, ...(size ? {} : { opacity: 0.55, cursor: 'not-allowed' }) }}>
                {size ? 'Adicionar ao carrinho' : 'Escolha um tamanho'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', borderTop: line }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: line }}>
                <Icon size={24} sw={1.8}><path d="M2 6h11v10H2zM13 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></Icon>
                <span>Frete grátis em compras acima de R$ 299</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: line }}>
                <Icon size={24} sw={1.8}><path d="M4 9h11a5 5 0 0 1 0 10H8M4 9l4-4M4 9l4 4" /></Icon>
                <span>Troca em até 30 dias</span>
              </div>
              <details style={{ borderBottom: line }}>
                <summary>Composição e cuidados <span className="pl" aria-hidden="true">+</span></summary>
                <p style={{ margin: '0 0 16px', color: '#3F3E4E', lineHeight: 1.55 }}>[COMPOSIÇÃO DA PEÇA] · [INSTRUÇÕES DE LAVAGEM]</p>
              </details>
              <details style={{ borderBottom: line }}>
                <summary>Tabela de medidas <span className="pl" aria-hidden="true">+</span></summary>
                <p style={{ margin: '0 0 16px', color: '#3F3E4E', lineHeight: 1.55 }}>[TABELA DE MEDIDAS POR TAMANHO]</p>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <h2 className="disp" style={{ fontSize: 'clamp(34px,4vw,56px)' }}>Você também vai gostar</h2>
        <div style={grid(260)}>{related.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
    </main>
  )
}
