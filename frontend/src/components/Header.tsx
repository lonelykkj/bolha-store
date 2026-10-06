import { useStore, type View } from '../context/store'
import { ACCENT, INK, off, on, pad } from '../styles/tokens'
import Icon from './Icon'

export default function Header() {
  const { view, go, logged, cartCount, setCartOpen } = useStore()
  const navItems: [string, View, boolean][] = [
    ['Início', 'home', view === 'home'],
    ['Produtos', 'shop', view === 'shop' || view === 'product'],
    ['Sobre', 'about', view === 'about'],
  ]
  return (
    <>
      <div style={{ background: INK, color: '#fff', textAlign: 'center', padding: '10px 16px', fontSize: 14, fontWeight: 500 }}>Frete grátis em compras acima de R$ 299 · Troca em até 30 dias</div>

      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', maxWidth: 1320, margin: '0 auto', padding: `18px ${pad}` }}>
        <button onClick={() => go('home')} aria-label="Bolha, ir para o início" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 0, padding: 0, minHeight: 44 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill={ACCENT} /><ellipse cx="13" cy="12" rx="6" ry="3.4" fill="#fff" opacity=".7" transform="rotate(-30 13 12)" /></svg>
          <span className="disp" style={{ fontSize: 36 }}>bolha</span>
        </button>
        <nav aria-label="Principal" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', background: '#fff', borderRadius: 999, padding: 4 }}>
          {navItems.map(([label, target, active]) => (
            <button key={label} className="nv" onClick={() => go(target)} style={active ? on : off}>{label}</button>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="ico btn" onClick={() => go('shop')} aria-label="Buscar produtos">
            <Icon size={22} sw={2}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></Icon>
          </button>
          <button className="btn" onClick={() => go('account')} style={{ height: 48, borderRadius: 999, border: 0, background: '#fff', padding: '0 18px 0 14px', display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15 }}>
            <Icon size={22} sw={2}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></Icon>
            {logged ? 'Minha conta' : 'Entrar'}
          </button>
          <button className="ico btn" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho" style={{ background: INK, color: '#fff' }}>
            <Icon size={22} sw={2}><path d="M3 4h2l2.2 11h10.6L20 7H6.2" /><circle cx="9" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></Icon>
            {cartCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 22, height: 22, borderRadius: 999, background: '#FFD84D', color: INK, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>{cartCount}</span>}
          </button>
        </div>
      </header>
    </>
  )
}
