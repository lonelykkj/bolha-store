import ProductCard from '../components/ProductCard'
import Thumb from '../components/Thumb'
import { useStore } from '../context/store'
import { BADGE, byId } from '../data/products'
import { ACCENT, INK, box, grid, linkBtn, muted, offWhite, on, pad } from '../styles/tokens'
import { countItems, subtotal } from '../utils/cart'
import { fmt, plural } from '../utils/format'

export default function Account() {
  const { acc, setAcc, orders, favs, setLogged, go, goTrack } = useStore()
  const tabs: [string, string, number | string][] = [['pedidos', 'Pedidos', orders.length], ['favoritos', 'Favoritos', favs.length], ['enderecos', 'Endereços', ''], ['dados', 'Meus dados', '']]

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: `16px ${pad} 80px`, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
        <h1 className="disp" style={{ fontSize: 'clamp(44px,5.4vw,80px)' }}>Olá, Cliente!</h1>
        <button className="sec btn" onClick={() => { setLogged(false); go('home') }} style={{ height: 48 }}>Sair</button>
      </div>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <nav aria-label="Minha conta" style={{ flex: '0 0 240px', display: 'flex', flexDirection: 'column', gap: 6, minWidth: 'min(240px,100%)' }}>
          {tabs.map(([id, label, count]) => (
            <button key={id} onClick={() => setAcc(id)} aria-pressed={acc === id} style={{ minHeight: 52, border: 0, borderRadius: 18, padding: '0 18px', fontSize: 16, fontWeight: 700, textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...(acc === id ? on : offWhite) }}>
              <span>{label}</span><span style={{ opacity: 0.7, fontWeight: 500 }}>{count}</span>
            </button>
          ))}
        </nav>
        <section style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {acc === 'pedidos' && (
            <>
              <h2 className="disp" style={{ fontSize: 36 }}>Meus pedidos</h2>
              {orders.map((o) => (
                <article key={o.id} style={{ ...box(), gap: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: 18 }}>Pedido {o.id}</span>
                      <span style={{ color: muted, fontSize: 14 }}>{o.date} · {plural(countItems(o.items), 'item', 'itens')}</span>
                    </div>
                    <span style={{ borderRadius: 999, padding: '8px 16px', fontWeight: 700, fontSize: 14, color: INK, background: BADGE[o.status] }}>{o.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {o.items.map((l, i) => <Thumb key={i} l={l} size={84} radius={22} />)}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center', borderTop: '1.5px solid #ECEAF5', paddingTop: 16 }}>
                    <span style={{ fontWeight: 700, fontSize: 18 }}>Total {fmt(subtotal(o.items) + o.ship)}</span>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button className="sec btn" onClick={() => goTrack(o.id)} style={{ height: 46, fontSize: 15 }}>Ver detalhes</button>
                      <button className="pri btn" onClick={() => goTrack(o.id)} style={{ height: 46, fontSize: 15 }}>Acompanhar</button>
                    </div>
                  </div>
                </article>
              ))}
            </>
          )}

          {acc === 'favoritos' && (
            <>
              <h2 className="disp" style={{ fontSize: 36 }}>Favoritos</h2>
              <div style={grid(240, 'auto-fill')}>{favs.map((id) => <ProductCard key={id} p={byId(id)} />)}</div>
              {favs.length === 0 && (
                <div style={{ background: '#fff', borderRadius: 32, padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
                  <p style={{ margin: 0, color: muted }}>Você ainda não favoritou nada. Toque no coração de uma peça para salvá-la aqui.</p>
                  <button className="pri btn" onClick={() => go('shop')}>Ver produtos</button>
                </div>
              )}
            </>
          )}

          {acc === 'enderecos' && (
            <>
              <h2 className="disp" style={{ fontSize: 36 }}>Endereços</h2>
              <div style={grid(300)}>
                <div style={{ background: '#fff', borderRadius: 32, padding: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ background: ACCENT, borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 700, alignSelf: 'flex-start' }}>Principal</span>
                  <strong style={{ fontSize: 18 }}>Casa</strong>
                  <span style={{ color: '#3F3E4E', lineHeight: 1.5 }}>[RUA E NÚMERO]<br />[BAIRRO] · [CIDADE/UF]<br />[CEP]</span>
                  <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                    <button className="lnk" style={linkBtn}>Editar</button>
                    <button className="lnk" style={linkBtn}>Remover</button>
                  </div>
                </div>
                <button style={{ background: 'transparent', border: '2px dashed #AFAAC8', borderRadius: 32, padding: 28, minHeight: 180, fontWeight: 700, fontSize: 17 }}>+ Novo endereço</button>
              </div>
            </>
          )}

          {acc === 'dados' && (
            <>
              <h2 className="disp" style={{ fontSize: 36 }}>Meus dados</h2>
              <form onSubmit={(e) => e.preventDefault()} style={{ ...box(), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 16 }}>
                <label className="lbl">Nome<input className="fld" type="text" placeholder="Seu nome" /></label>
                <label className="lbl">E-mail<input className="fld" type="email" placeholder="voce@email.com" /></label>
                <label className="lbl">Telefone<input className="fld" type="tel" placeholder="(00) 00000-0000" /></label>
                <label className="lbl">CPF<input className="fld" type="text" placeholder="000.000.000-00" /></label>
                <div style={{ gridColumn: '1/-1' }}><button type="button" className="pri btn">Salvar alterações</button></div>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  )
}
