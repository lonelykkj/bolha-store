import { useStore } from '../context/store'
import { byId } from '../data/products'
import { linkBtn, muted } from '../styles/tokens'
import { fmt } from '../utils/format'
import FreeShippingBar from './FreeShippingBar'
import Garment from './Garment'
import Icon from './Icon'
import Stepper from './Stepper'

export default function CartDrawer() {
  const { cart, cartCount, sub, step, remove, openProduct, go, setCartOpen } = useStore()
  const close = () => setCartOpen(false)
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
      <button onClick={close} aria-label="Fechar carrinho" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: 'rgba(21,20,31,.5)', cursor: 'pointer' }} />
      <aside role="dialog" aria-modal="true" aria-label="Carrinho de compras" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(460px,100%)', background: '#fff', display: 'flex', flexDirection: 'column', borderRadius: '36px 0 0 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 16px' }}>
          <h2 className="disp" style={{ fontSize: 32 }}>Seu carrinho <span style={{ color: muted }}>({cartCount})</span></h2>
          <button className="ico" onClick={close} aria-label="Fechar carrinho" style={{ background: '#F4F3F9' }}><Icon><path d="M6 6l12 12M18 6L6 18" /></Icon></button>
        </div>
        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 24, textAlign: 'center' }}>
            <div style={{ width: 140 }}><Garment kind="tee" color="#8D9BFF" /></div>
            <p style={{ margin: 0, color: muted, fontSize: 17 }}>Seu carrinho está vazio por enquanto.</p>
            <button className="pri btn" onClick={() => go('shop')}>Ver produtos</button>
          </div>
        ) : (
          <>
            <div style={{ padding: '0 24px 8px' }}>
              <FreeShippingBar height={10} fontSize={14} />
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: '8px 24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.map((l, i) => {
                const p = byId(l.pid)
                const c = p.colors[l.color]
                return (
                  <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: '1.5px solid #ECEAF5' }}>
                    <button onClick={() => openProduct(p.id)} aria-label={'Ver ' + p.name} style={{ flex: '0 0 84px', height: 84, borderRadius: 22, border: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.bg }}>
                      <span style={{ width: '76%' }}><Garment kind={p.type} color={c.h} /></span>
                    </button>
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><strong style={{ lineHeight: 1.25 }}>{p.name}</strong><strong>{fmt(p.price * l.qty)}</strong></div>
                      <span style={{ color: muted, fontSize: 14 }}>{c.n} · {l.size}</span>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stepper qty={l.qty} dec={() => step(i, -1)} inc={() => step(i, 1)} size={44} />
                        <button className="lnk" onClick={() => remove(i)} style={{ background: 'none', border: 0, minHeight: 44, padding: '0 4px', color: muted, textDecoration: 'underline', fontSize: 14 }}>Remover</button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1.5px solid #ECEAF5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700 }}><span>Subtotal</span><span>{fmt(sub)}</span></div>
              <span style={{ color: muted, fontSize: 14 }}>Frete e descontos calculados no checkout.</span>
              <button className="pri btn" onClick={() => go('checkout')} style={{ width: '100%', height: 60 }}>Finalizar compra</button>
              <button className="sec btn" onClick={() => go('cart')} style={{ width: '100%', height: 52 }}>Ver carrinho completo</button>
              <button className="lnk" onClick={close} style={linkBtn}>Continuar comprando</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
