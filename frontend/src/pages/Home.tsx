import Garment from '../components/Garment'
import Icon, { ArrowRight } from '../components/Icon'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/store'
import { CATS, CAT_PREVIEW, PRODUCTS, byId } from '../data/products'
import { ACCENT, INK, grid, muted, pad } from '../styles/tokens'

const MARQUEE = ['Novidades toda semana', 'Frete grátis acima de R$ 299', 'Troca em até 30 dias', 'Parcele em até 3x sem juros']
const VALUES = [
  ['#8D9BFF', 'Folgado de propósito', 'Caimento solto que acompanha seus movimentos e não aperta em lugar nenhum.'],
  ['#FF9AC8', 'Cores que animam', 'Uma paleta doce, pensada para as peças combinarem entre si sem esforço.'],
  ['#6FE0BC', 'Sem complicação', 'Troca simples, compra segura e atendimento que responde de verdade.'],
]
const FEATURED = ['oversized', 'moletom', 'cargo', 'meia1']

export default function Home() {
  const { go, goShopCat } = useStore()
  return (
    <main>
      <section style={{ maxWidth: 1320, margin: '0 auto', padding: `clamp(8px,2vw,24px) ${pad} 56px`, ...grid(440), gap: 32, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}>
          <span style={{ background: '#fff', border: `1.5px solid ${INK}`, borderRadius: 999, padding: '8px 16px', fontWeight: 700, fontSize: 14 }}>Coleção Primavera 2026</span>
          <h1 className="disp" style={{ fontSize: 'clamp(52px,7.4vw,116px)' }}>Roupa com ar de bom humor.</h1>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, maxWidth: '30em', color: '#4A4959' }}>Peças fofas, folgadas e cheias de cor para deixar o dia a dia mais leve. Camisas, blusas, calças, meias e o que mais couber no seu estilo.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="pri btn" onClick={() => go('shop')}>Ver produtos <ArrowRight /></button>
            <button className="sec btn" onClick={() => go('about')}>Conheça a Bolha</button>
          </div>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', maxWidth: 640, justifySelf: 'center' }}>
          <div style={{ position: 'absolute', left: '8%', top: '8%', width: '84%', aspectRatio: '1/1', borderRadius: '50%', background: ACCENT }} />
          <div className="float1" style={{ position: 'absolute', left: '20%', top: '16%', width: '58%', transform: 'rotate(-6deg)' }}><Garment kind="hoodie" color="#FF8A5B" /></div>
          <div className="float2" style={{ position: 'absolute', left: '-2%', top: '54%', width: '38%', transform: 'rotate(-14deg)' }}><Garment kind="tee" color="#FFD84D" /></div>
          <div className="float3" style={{ position: 'absolute', right: 0, top: '56%', width: '32%', transform: 'rotate(12deg)' }}><Garment kind="sock" color="#6FE0BC" /></div>
          <div className="float2" style={{ position: 'absolute', right: '2%', top: 0, width: '34%', transform: 'rotate(10deg)' }}><Garment kind="cap" color="#FF9AC8" /></div>
          <div className="disp" style={{ position: 'absolute', left: '2%', top: '6%', width: '21%', aspectRatio: '1/1', borderRadius: '50%', background: '#FFD84D', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 'clamp(14px,1.7vw,24px)', transform: 'rotate(-12deg)' }}>novo na loja</div>
        </div>
      </section>

      <div style={{ background: INK, color: '#fff', overflow: 'hidden', padding: '18px 0' }} aria-hidden="true">
        <div className="mq">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="disp" style={{ fontSize: 28, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 56, whiteSpace: 'nowrap' }}>
              {m} <span style={{ width: 14, height: 14, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
            </span>
          ))}
        </div>
      </div>

      <section style={{ maxWidth: 1320, margin: '0 auto', padding: `80px ${pad} 24px`, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <h2 className="disp" style={{ fontSize: 'clamp(40px,5vw,72px)' }}>Compre por categoria</h2>
          <button className="sec btn" onClick={() => go('shop')} style={{ height: 48 }}>Ver tudo</button>
        </div>
        <div style={grid(220)}>
          {CATS.map(([id, label]) => {
            const t = CAT_PREVIEW[id]
            return (
              <button key={id} className="tile" onClick={() => goShopCat(id)} style={{ position: 'relative', aspectRatio: '4/5', border: 0, borderRadius: 32, overflow: 'hidden', padding: 0, textAlign: 'left', background: t.bg }}>
                <span className="tg" style={{ position: 'absolute', left: '12%', right: '12%', top: '10%', bottom: '26%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ width: '100%' }}><Garment kind={t.kind} color={t.hex} /></span>
                </span>
                <span style={{ position: 'absolute', left: 16, right: 16, bottom: 16, background: '#fff', borderRadius: 999, padding: '8px 8px 8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>{label} <span style={{ color: muted, fontWeight: 500 }}>· {PRODUCTS.filter((p) => p.cat === id).length}</span></span>
                  <span style={{ width: 34, height: 34, borderRadius: '50%', background: INK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={16} sw={2.4}><path d="M5 12h14M13 6l6 6-6 6" /></Icon></span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section id="sobre" style={{ maxWidth: 1320, margin: '0 auto', padding: `56px ${pad}` }}>
        <div style={{ background: INK, color: '#fff', borderRadius: 48, padding: 'clamp(28px,5vw,72px)', display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ ...grid(380), gap: 32, alignItems: 'end' }}>
            <h2 className="disp" style={{ fontSize: 'clamp(40px,5.4vw,80px)' }}>Pequenas coisas infladas de personalidade.</h2>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.6, color: '#D9D7EA' }}>A Bolha nasceu da vontade de vestir algo confortável sem abrir mão de cor. Modelagens folgadas, tons doces e peças que ficam bem em qualquer dia — do café da manhã ao fim da noite.</p>
          </div>
          <div style={{ ...grid(260), gap: 20 }}>
            {VALUES.map(([c, title, text]) => (
              <div key={title} style={{ background: '#2B2A3D', borderRadius: 28, padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: c }} />
                <h3 className="disp" style={{ fontSize: 28 }}>{title}</h3>
                <p style={{ margin: 0, color: '#D9D7EA', lineHeight: 1.55 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1320, margin: '0 auto', padding: `40px ${pad} 80px`, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <h2 className="disp" style={{ fontSize: 'clamp(40px,5vw,72px)' }}>Os queridinhos</h2>
          <button className="sec btn" onClick={() => go('shop')} style={{ height: 48 }}>Ver todos os produtos</button>
        </div>
        <div style={grid(260)}>{FEATURED.map((id) => <ProductCard key={id} p={byId(id)} />)}</div>
      </section>
    </main>
  )
}
