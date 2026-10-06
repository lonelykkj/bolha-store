import type { CSSProperties } from 'react'
import Icon, { ArrowLeft } from '../components/Icon'
import ItemRow from '../components/ItemRow'
import SummaryRow from '../components/SummaryRow'
import { useStore } from '../context/store'
import { BADGE } from '../data/products'
import { ACCENT, INK, box, grid, muted, pad } from '../styles/tokens'
import { subtotal } from '../utils/cart'
import { fmt, shipText } from '../utils/format'

const STEPS = [
  ['Pedido recebido', 'Recebemos o seu pedido e confirmamos os itens.'],
  ['Pagamento aprovado', 'O pagamento foi confirmado.'],
  ['Em separação', 'Estamos separando e embalando as suas peças.'],
  ['Enviado', 'O pedido saiu da Bolha e foi entregue à transportadora.'],
  ['A caminho', 'O pedido está em rota de entrega até você.'],
  ['Entregue', 'Pedido entregue no endereço informado.'],
]
const CUR_STEP = { Preparando: 2, 'A caminho': 4, Entregue: 5 }
const HEADLINE = {
  Preparando: ['Estamos separando o seu pedido', 'Assim que ele sair, você recebe o código de rastreio.'],
  'A caminho': ['Seu pedido está a caminho', 'Acompanhe a entrega com o código de rastreio abaixo.'],
  Entregue: ['Pedido entregue', 'Esperamos que você ame as suas peças! Se precisar trocar, você tem até 30 dias.'],
}
const infoBox: CSSProperties = { background: '#fff', borderRadius: 20, padding: '12px 16px', display: 'flex', flexDirection: 'column' }
const infoLabel: CSSProperties = { fontSize: 13, color: muted, fontWeight: 700 }

export default function TrackOrder() {
  const { orders, trackId, goOrders, go } = useStore()
  const to = orders.find((o) => o.id === trackId) || orders[0]
  const curStep = CUR_STEP[to.status]
  const [headline, subline] = HEADLINE[to.status]
  const tSub = subtotal(to.items)

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: `0 ${pad} 80px`, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <button className="lnk" onClick={goOrders} style={{ alignSelf: 'flex-start', background: 'none', border: 0, minHeight: 44, padding: 0, fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <ArrowLeft size={18} /> Meus pedidos
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ color: muted, fontWeight: 700 }}>Pedido {to.id} · {to.date}</span>
          <h1 className="disp" style={{ fontSize: 'clamp(40px,5vw,72px)' }}>Acompanhar pedido</h1>
        </div>
        <span style={{ borderRadius: 999, padding: '10px 20px', fontWeight: 700, color: INK, background: BADGE[to.status] }}>{to.status}</span>
      </div>

      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <section style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: ACCENT, borderRadius: 36, padding: 'clamp(24px,4vw,44px)', ...grid(260), gap: 24, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2 className="disp" style={{ fontSize: 'clamp(32px,3.6vw,48px)' }}>{headline}</h2>
              <p style={{ margin: 0, lineHeight: 1.5, fontSize: 17 }}>{subline}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={infoBox}><span style={infoLabel}>Previsão de entrega</span><span style={{ fontWeight: 700 }}>[PREVISÃO DE ENTREGA]</span></div>
              <div style={infoBox}><span style={infoLabel}>Transportadora</span><span style={{ fontWeight: 700 }}>[TRANSPORTADORA]</span></div>
              <div style={infoBox}><span style={infoLabel}>Código de rastreio</span><span style={{ fontWeight: 700 }}>[CÓDIGO DE RASTREIO]</span></div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 36, padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,44px) 16px' }}>
            <h2 className="disp" style={{ fontSize: 30, marginBottom: 28 }}>Etapas do pedido</h2>
            {STEPS.map(([label, desc], i) => {
              const st = to.status === 'Entregue' || i < curStep ? 'done' : i === curStep ? 'now' : 'todo'
              const dot: CSSProperties = st === 'done' ? { background: INK, color: '#fff', border: `3px solid ${INK}` } : st === 'now' ? { background: ACCENT, color: INK, border: `3px solid ${INK}` } : { background: '#fff', color: INK, border: '3px solid #CFCCE0' }
              return (
                <div key={label} style={{ display: 'flex', gap: 18 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ flex: '0 0 36px', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...dot }}>
                      {st === 'done' && <Icon size={18} sw={3}><path d="M5 12l5 5 9-10" /></Icon>}
                    </span>
                    {i < STEPS.length - 1 && <span style={{ width: 3, flex: 1, minHeight: 32, background: st === 'done' ? INK : '#CFCCE0' }} />}
                  </div>
                  <div style={{ paddingBottom: 28, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                    <strong style={{ fontSize: 18 }}>{label}</strong>
                    <span style={{ color: muted, lineHeight: 1.45 }}>{desc}</span>
                    {st === 'now' && <span style={{ background: ACCENT, borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 700, marginTop: 4 }}>Etapa atual</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <aside style={{ flex: '1 1 340px', minWidth: 'min(340px,100%)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ ...box(), padding: 'clamp(20px,3vw,28px)', gap: 18 }}>
            <h2 className="disp" style={{ fontSize: 26 }}>Itens do pedido</h2>
            {to.items.map((l, i) => <ItemRow key={i} l={l} />)}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1.5px solid #ECEAF5', paddingTop: 16 }}>
              <SummaryRow label="Subtotal" value={fmt(tSub)} />
              <SummaryRow label="Frete" value={shipText(to.ship)} />
              <SummaryRow label="Total" value={fmt(tSub + to.ship)} total={20} />
            </div>
          </div>
          <div style={{ ...box(), padding: 'clamp(20px,3vw,28px)', gap: 8 }}>
            <h2 className="disp" style={{ fontSize: 26 }}>Entrega</h2>
            <span style={{ color: '#3F3E4E', lineHeight: 1.5 }}>[NOME DO DESTINATÁRIO]<br />[RUA E NÚMERO] · [BAIRRO]<br />[CIDADE/UF] · [CEP]</span>
          </div>
          <div style={{ background: INK, color: '#fff', borderRadius: 32, padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            <h2 className="disp" style={{ fontSize: 26 }}>Precisa de ajuda?</h2>
            <p style={{ margin: 0, color: '#D9D7EA', lineHeight: 1.5 }}>Fale com a gente sobre este pedido ou peça a troca de uma peça.</p>
            <button className="btn" onClick={() => go('about')} style={{ height: 48, borderRadius: 999, border: 0, background: ACCENT, color: INK, padding: '0 24px', fontWeight: 700, fontSize: 16 }}>Falar com a Bolha</button>
          </div>
        </aside>
      </div>
    </main>
  )
}
