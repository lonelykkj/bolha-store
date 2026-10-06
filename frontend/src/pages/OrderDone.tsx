import Garment from '../components/Garment'
import Icon from '../components/Icon'
import { useStore } from '../context/store'
import { INK, pad } from '../styles/tokens'

export default function OrderDone() {
  const { lastId, goTrack, goOrders, go } = useStore()
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: `16px ${pad} 96px`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center' }}>
      <div style={{ width: 'min(420px,80%)', position: 'relative', aspectRatio: '1/1' }}>
        <div style={{ position: 'absolute', inset: '6%', borderRadius: '50%', background: '#6FE0BC' }} />
        <div className="float1" style={{ position: 'absolute', left: '22%', top: '18%', width: '56%', transform: 'rotate(-6deg)' }}><Garment kind="hoodie" color="#FF9AC8" /></div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: 76, height: 76, borderRadius: '50%', background: INK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={36} sw={2.6}><path d="M5 12l5 5 9-10" /></Icon></div>
      </div>
      <h1 className="disp" style={{ fontSize: 'clamp(44px,6vw,84px)' }}>Pedido confirmado!</h1>
      <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: '#4A4959', maxWidth: '32em' }}>Seu pedido <strong>{lastId}</strong> foi recebido. Você pode acompanhar cada etapa na área de pedidos da sua conta.</p>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="pri btn" onClick={() => goTrack(lastId)}>Acompanhar pedido</button>
        <button className="sec btn" onClick={goOrders}>Ver meus pedidos</button>
        <button className="sec btn" onClick={() => go('shop')}>Continuar comprando</button>
      </div>
    </main>
  )
}
