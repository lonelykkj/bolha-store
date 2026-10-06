import { useState } from 'react'
import FreeShippingBar from '../components/FreeShippingBar'
import Garment from '../components/Garment'
import Icon, { ArrowLeft } from '../components/Icon'
import ProductCard from '../components/ProductCard'
import Stepper from '../components/Stepper'
import SummaryRow from '../components/SummaryRow'
import { useStore } from '../context/store'
import { PRODUCTS, byId } from '../data/products'
import { INK, box, grid, linkBtn, muted, pad } from '../styles/tokens'
import { fmt, plural, shipText } from '../utils/format'

export default function Cart() {
  const { cart, cartCount, sub, base, disc, total, step, remove, openProduct, go, couponOk, setCouponOk } = useStore()
  const [coupon, setCoupon] = useState('')
  const [couponErr, setCouponErr] = useState(false)
  const [cepDone, setCepDone] = useState(false)

  function applyCoupon() {
    const ok = coupon.trim().toUpperCase() === 'BOLHA10'
    setCouponOk(ok)
    setCouponErr(!ok)
  }

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: `16px ${pad} 80px`, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
        <h1 className="disp" style={{ fontSize: 'clamp(44px,5.4vw,80px)' }}>Seu carrinho</h1>
        <span style={{ color: muted, fontSize: 18, fontWeight: 700 }}>{plural(cartCount, 'item', 'itens')}</span>
      </div>

      {cart.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 40, padding: 'clamp(32px,6vw,72px) 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
          <div style={{ width: 'min(200px,50%)' }}><Garment kind="tee" color="#8D9BFF" /></div>
          <h2 className="disp" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>Seu carrinho está vazio</h2>
          <p style={{ margin: 0, color: muted, fontSize: 18, maxWidth: '28em' }}>Que tal dar uma olhada nas novidades? Tem muita peça fofa esperando por você.</p>
          <button className="pri btn" onClick={() => go('shop')}>Ver produtos</button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <section style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', borderRadius: 28, padding: '18px 22px' }}>
                <FreeShippingBar height={12} />
              </div>
              {cart.map((l, i) => {
                const p = byId(l.pid)
                const c = p.colors[l.color]
                return (
                  <article key={i} style={{ background: '#fff', borderRadius: 32, padding: 'clamp(16px,2.4vw,24px)', display: 'flex', gap: 'clamp(14px,2.4vw,24px)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button onClick={() => openProduct(p.id)} aria-label={'Ver ' + p.name} style={{ flex: '0 0 120px', width: 120, height: 120, borderRadius: 28, border: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.bg }}>
                      <span style={{ width: '78%' }}><Garment kind={p.type} color={c.h} /></span>
                    </button>
                    <div style={{ flex: '1 1 240px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <strong style={{ fontSize: 19, lineHeight: 1.25 }}>{p.name}</strong>
                      <span style={{ color: muted }}>{c.n} · Tamanho {l.size}</span>
                      <span style={{ color: muted, fontSize: 14 }}>{fmt(p.price)} cada</span>
                      <button className="lnk" onClick={() => remove(i)} style={{ alignSelf: 'flex-start', background: 'none', border: 0, minHeight: 44, padding: 0, color: muted, textDecoration: 'underline', fontSize: 14 }}>Remover</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, marginLeft: 'auto' }}>
                      <strong style={{ fontSize: 22 }}>{fmt(p.price * l.qty)}</strong>
                      <Stepper qty={l.qty} dec={() => step(i, -1)} inc={() => step(i, 1)} size={48} />
                    </div>
                  </article>
                )
              })}
              <button className="lnk" onClick={() => go('shop')} style={{ alignSelf: 'flex-start', background: 'none', border: 0, minHeight: 44, padding: 0, fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ArrowLeft size={18} /> Continuar comprando
              </button>
            </section>

            <aside style={{ flex: '1 1 360px', minWidth: 'min(360px,100%)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ ...box(), gap: 20 }}>
                <h2 className="disp" style={{ fontSize: 28 }}>Resumo do pedido</h2>

                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label className="lbl" htmlFor="cupom">Cupom de desconto</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input id="cupom" className="fld" type="text" placeholder="Digite o cupom" value={coupon} onChange={(e) => { setCoupon(e.target.value); setCouponErr(false) }} style={{ flex: 1, minWidth: 0 }} />
                    <button type="button" className="btn" onClick={applyCoupon} style={{ height: 52, borderRadius: 14, border: 0, background: INK, color: '#fff', padding: '0 20px', fontWeight: 700, fontSize: 16 }}>Aplicar</button>
                  </div>
                  {couponErr && <span style={{ color: '#B3261E', fontSize: 14, fontWeight: 700 }}>Cupom inválido. Confira o código e tente de novo.</span>}
                  {couponOk && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700 }}>
                      Cupom BOLHA10 aplicado
                      <button type="button" className="lnk" onClick={() => { setCouponOk(false); setCoupon('') }} style={{ ...linkBtn, fontSize: 14, fontWeight: 500 }}>Remover</button>
                    </span>
                  )}
                </form>

                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label className="lbl" htmlFor="cep">Calcular frete</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input id="cep" className="fld" type="text" inputMode="numeric" placeholder="00000-000" style={{ flex: 1, minWidth: 0 }} />
                    <button type="button" className="btn" onClick={() => setCepDone(true)} style={{ height: 52, borderRadius: 14, border: `1.5px solid ${INK}`, background: '#fff', padding: '0 20px', fontWeight: 700, fontSize: 16 }}>Calcular</button>
                  </div>
                  {cepDone && (
                    <div style={{ background: '#F4F3F9', borderRadius: 16, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Padrão · [X] dias úteis</span><strong>{shipText(base)}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Expresso · [X] dias úteis</span><strong>R$ 29,90</strong></div>
                    </div>
                  )}
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1.5px solid #ECEAF5', paddingTop: 18 }}>
                  <SummaryRow label="Subtotal" value={fmt(sub)} />
                  {disc > 0 && <SummaryRow label="Desconto" value={'- ' + fmt(disc)} />}
                  <SummaryRow label="Frete" value={shipText(base)} />
                  <SummaryRow label="Total" value={fmt(total)} total={24} />
                  <span style={{ color: muted, fontSize: 14 }}>ou 3x de {fmt(total / 3)} sem juros</span>
                </div>
                <button className="pri btn" onClick={() => go('checkout')} style={{ width: '100%', height: 60 }}>Finalizar compra</button>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: muted, fontSize: 14 }}>
                  <Icon sw={1.8}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Icon>
                  Pagamento seguro · Troca em até 30 dias
                </div>
              </div>
            </aside>
          </div>

          <section style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
            <h2 className="disp" style={{ fontSize: 'clamp(34px,4vw,56px)' }}>Combina com o seu carrinho</h2>
            <div style={grid(260)}>
              {PRODUCTS.filter((p) => !cart.some((l) => l.pid === p.id)).slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
