import { useState } from 'react'
import ItemRow from '../components/ItemRow'
import SummaryRow from '../components/SummaryRow'
import { useStore } from '../context/store'
import { INK, box, grid, linkBtn, offWhite, on, pad } from '../styles/tokens'
import { fmt, shipText } from '../utils/format'

const PAY_TABS = [['pix', 'Pix'], ['card', 'Cartão'], ['boleto', 'Boleto']]

export default function Checkout() {
  const { cart, sub, base, ship, disc, total, shipOpt, setShipOpt, confirmOrder, go } = useStore()
  const [pay, setPay] = useState('pix')
  const shipOpts = [
    { id: 'std', label: 'Envio padrão', price: shipText(base) },
    { id: 'exp', label: 'Envio expresso', price: fmt(29.9) },
  ]

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: `16px ${pad} 80px`, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h1 className="disp" style={{ fontSize: 'clamp(44px,5.4vw,80px)' }}>Finalizar compra</h1>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <form onSubmit={(e) => e.preventDefault()} style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <section style={{ ...box(), gap: 16 }}>
            <h2 className="disp" style={{ fontSize: 28 }}>1. Contato</h2>
            <label className="lbl">E-mail<input className="fld" type="email" placeholder="voce@email.com" /></label>
          </section>
          <section style={{ ...box(), gap: 16 }}>
            <h2 className="disp" style={{ fontSize: 28 }}>2. Entrega</h2>
            <div style={{ ...grid(220), gap: 16 }}>
              <label className="lbl">Nome completo<input className="fld" type="text" /></label>
              <label className="lbl">CEP<input className="fld" type="text" placeholder="00000-000" /></label>
              <label className="lbl">Endereço<input className="fld" type="text" /></label>
              <label className="lbl">Número e complemento<input className="fld" type="text" /></label>
              <label className="lbl">Cidade<input className="fld" type="text" /></label>
              <label className="lbl">Estado<input className="fld" type="text" placeholder="UF" /></label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
              <div style={{ fontWeight: 700 }}>Forma de envio</div>
              {shipOpts.map((o) => (
                <button key={o.id} type="button" onClick={() => setShipOpt(o.id)} aria-pressed={shipOpt === o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, minHeight: 60, padding: '0 20px', borderRadius: 20, border: `1.5px solid ${INK}`, textAlign: 'left', fontSize: 16, ...(shipOpt === o.id ? on : offWhite) }}>
                  <span><strong>{o.label}</strong><br /><span style={{ opacity: 0.8, fontSize: 14 }}>Prazo estimado: [X] dias úteis</span></span>
                  <strong>{o.price}</strong>
                </button>
              ))}
            </div>
          </section>
          <section style={{ ...box(), gap: 16 }}>
            <h2 className="disp" style={{ fontSize: 28 }}>3. Pagamento</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PAY_TABS.map(([id, label]) => (
                <button key={id} type="button" onClick={() => setPay(id)} aria-pressed={pay === id} style={{ height: 48, borderRadius: 999, border: `1.5px solid ${INK}`, padding: '0 22px', fontSize: 16, fontWeight: 700, ...(pay === id ? on : offWhite) }}>{label}</button>
              ))}
            </div>
            {pay === 'card' && (
              <div style={{ ...grid(220), gap: 16 }}>
                <label className="lbl" style={{ gridColumn: '1/-1' }}>Número do cartão<input className="fld" type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" /></label>
                <label className="lbl">Validade<input className="fld" type="text" placeholder="MM/AA" /></label>
                <label className="lbl">CVV<input className="fld" type="text" placeholder="000" /></label>
                <label className="lbl" style={{ gridColumn: '1/-1' }}>Nome impresso no cartão<input className="fld" type="text" /></label>
              </div>
            )}
            {pay === 'pix' && <p style={{ margin: 0, color: '#3F3E4E', lineHeight: 1.55 }}>O código Pix é gerado assim que você confirmar o pedido e fica válido por tempo limitado.</p>}
            {pay === 'boleto' && <p style={{ margin: 0, color: '#3F3E4E', lineHeight: 1.55 }}>O boleto é gerado ao confirmar o pedido. O envio começa depois da compensação do pagamento.</p>}
          </section>
        </form>

        <aside style={{ ...box(), flex: '1 1 340px', minWidth: 'min(340px,100%)', gap: 20 }}>
          <h2 className="disp" style={{ fontSize: 28 }}>Resumo</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cart.map((l, i) => <ItemRow key={i} l={l} />)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1.5px solid #ECEAF5', paddingTop: 18 }}>
            <SummaryRow label="Subtotal" value={fmt(sub)} />
            {disc > 0 && <SummaryRow label="Desconto" value={'- ' + fmt(disc)} />}
            <SummaryRow label="Frete" value={shipText(ship)} />
            <SummaryRow label="Total" value={fmt(total)} total={22} />
          </div>
          <button className="pri btn" onClick={confirmOrder} style={{ width: '100%', height: 60 }}>Confirmar pedido</button>
          <button className="lnk" onClick={() => go('shop')} style={linkBtn}>Continuar comprando</button>
        </aside>
      </div>
    </main>
  )
}
