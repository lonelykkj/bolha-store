import type { CSSProperties } from 'react'
import Garment from '../components/Garment'
import { useStore } from '../context/store'
import { ACCENT, INK, grid, muted, pad } from '../styles/tokens'

const BELIEFS = [
  ['#E3E6FF', '01', 'Conforto primeiro', 'Se não dá vontade de ficar com a peça o dia inteiro, ela não sai da prancheta.'],
  ['#FFE3F0', '02', 'Cor sem medo', 'Tons doces que combinam entre si e transformam o básico em favorito.'],
  ['#DDF7EC', '03', 'Peças para repetir', 'Roupa para usar muitas vezes, em muitas combinações, sem complicação.'],
  ['#FFF3C2', '04', 'Atendimento de gente', 'Dúvida, troca ou recado: do outro lado tem alguém que quer ajudar de verdade.'],
]
const FAQ = [
  ['Como funciona a troca?', 'Você pode pedir a troca em até 30 dias após receber o pedido. [DETALHES DA POLÍTICA DE TROCA]'],
  ['Qual o prazo de entrega?', 'O prazo aparece no checkout, de acordo com o seu CEP. [PRAZOS POR REGIÃO]'],
  ['Como escolho meu tamanho?', 'Cada produto tem uma tabela de medidas na página da peça. [TABELA DE MEDIDAS]'],
  ['Quais formas de pagamento?', 'Aceitamos Pix, cartão de crédito e boleto. O parcelamento é mostrado em cada produto.'],
]
const section: CSSProperties = { maxWidth: 1320, width: '100%', margin: '0 auto', padding: `0 ${pad}` }
const h2: CSSProperties = { fontSize: 'clamp(36px,4.6vw,64px)' }

export default function About() {
  const { go, goOrders } = useStore()
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 72, paddingBottom: 80 }}>
      <section style={{ ...section, padding: `8px ${pad} 0`, ...grid(440), gap: 32, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
          <span style={{ background: '#fff', border: `1.5px solid ${INK}`, borderRadius: 999, padding: '8px 16px', fontWeight: 700, fontSize: 14 }}>Sobre a Bolha</span>
          <h1 className="disp" style={{ fontSize: 'clamp(48px,6.8vw,104px)' }}>Feita para você ficar à vontade.</h1>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.55, maxWidth: '30em', color: '#4A4959' }}>Somos uma marca de roupas que acredita que conforto e personalidade andam juntos. Cada peça nasce folgada, colorida e pronta para o seu dia.</p>
          <button className="pri btn" onClick={() => go('shop')}>Conhecer os produtos</button>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', maxWidth: 600, justifySelf: 'center' }}>
          <div style={{ position: 'absolute', left: '6%', top: '6%', width: '88%', aspectRatio: '1/1', borderRadius: '50%', background: '#FFD84D' }} />
          <div className="float2" style={{ position: 'absolute', left: '4%', top: '26%', width: '46%', transform: 'rotate(-10deg)' }}><Garment kind="long" color="#FF9AC8" /></div>
          <div className="float1" style={{ position: 'absolute', right: '2%', top: '20%', width: '50%', transform: 'rotate(8deg)' }}><Garment kind="pants" color={ACCENT} /></div>
          <div className="float3" style={{ position: 'absolute', left: '34%', top: '54%', width: '36%', transform: 'rotate(-4deg)' }}><Garment kind="sock" color="#6FE0BC" /></div>
        </div>
      </section>

      <section style={section}>
        <div style={{ background: '#fff', borderRadius: 48, padding: 'clamp(28px,5vw,72px)', ...grid(380), gap: 40 }}>
          <h2 className="disp" style={h2}>Nossa história</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 18, lineHeight: 1.65, color: '#3F3E4E' }}>
            <p style={{ margin: 0 }}>A Bolha começou com uma ideia simples: roupa confortável não precisa ser sem graça. Queríamos peças que a gente realmente quisesse vestir todo dia, com modelagem solta e cores que dão vontade de sorrir.</p>
            <p style={{ margin: 0 }}>[CONTE AQUI COMO, QUANDO E POR QUEM A MARCA FOI CRIADA.]</p>
            <p style={{ margin: 0 }}>Hoje continuamos pensando em cada peça do mesmo jeito: o que faria o seu dia um pouco mais leve?</p>
          </div>
        </div>
      </section>

      <section style={{ ...section, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <h2 className="disp" style={h2}>No que acreditamos</h2>
        <div style={grid(260)}>
          {BELIEFS.map(([bg, n, title, text]) => (
            <div key={n} style={{ background: bg, borderRadius: 32, padding: 28, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 240 }}>
              <span className="disp" style={{ fontSize: 44 }}>{n}</span>
              <h3 className="disp" style={{ fontSize: 28 }}>{title}</h3>
              <p style={{ margin: 0, lineHeight: 1.55, color: '#3F3E4E' }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...section, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <h2 className="disp" style={h2}>Quem faz a Bolha</h2>
        <div style={grid(240)}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ aspectRatio: '1/1', borderRadius: 32, border: '2px dashed #AFAAC8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted, fontWeight: 700 }}>[FOTO]</div>
              <strong>[NOME]</strong>
              <span style={{ color: muted, marginTop: -8 }}>[CARGO]</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...section, maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 className="disp" style={h2}>Perguntas frequentes</h2>
        <div style={{ background: '#fff', borderRadius: 36, padding: '8px clamp(20px,4vw,40px)' }}>
          {FAQ.map(([q, a], i) => (
            <details key={q} style={{ borderBottom: i < FAQ.length - 1 ? '1.5px solid #ECEAF5' : undefined }}>
              <summary>{q} <span className="pl" aria-hidden="true">+</span></summary>
              <p style={{ margin: '0 0 16px', color: '#3F3E4E', lineHeight: 1.55 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={{ background: INK, color: '#fff', borderRadius: 48, padding: 'clamp(28px,5vw,72px)', ...grid(340), gap: 32, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 className="disp" style={h2}>Fale com a gente</h2>
            <p style={{ margin: 0, color: '#D9D7EA', lineHeight: 1.6, fontSize: 18 }}>[E-MAIL] · [WHATSAPP]<br />[HORÁRIO DE ATENDIMENTO]</p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <button className="btn" onClick={() => go('shop')} style={{ height: 56, borderRadius: 999, border: 0, background: ACCENT, color: INK, padding: '0 30px', fontWeight: 700, fontSize: 17 }}>Ver produtos</button>
            <button className="btn" onClick={goOrders} style={{ height: 56, borderRadius: 999, border: '1.5px solid #fff', background: 'transparent', color: '#fff', padding: '0 28px', fontWeight: 700, fontSize: 17 }}>Rastrear pedido</button>
          </div>
        </div>
      </section>
    </main>
  )
}
