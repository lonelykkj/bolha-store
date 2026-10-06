import type { CSSProperties } from 'react'
import { useStore } from '../context/store'
import { CATS } from '../data/products'
import { ACCENT, INK, grid, pad } from '../styles/tokens'

const footLink: CSSProperties = { background: 'none', border: 0, color: '#D9D7EA', textAlign: 'left', padding: 0, minHeight: 36, fontSize: 16, textDecoration: 'none', display: 'flex', alignItems: 'center' }

export default function Footer() {
  const { go, goShopCat, goOrders } = useStore()
  return (
    <footer style={{ background: INK, color: '#fff', marginTop: 24 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: `64px ${pad} 32px`, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ ...grid(200), gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, gridColumn: 'span 2', minWidth: 'min(320px,100%)' }}>
            <span className="disp" style={{ fontSize: 44 }}>bolha</span>
            <p style={{ margin: 0, color: '#D9D7EA', lineHeight: 1.55, maxWidth: '26em' }}>Roupa com ar de bom humor. Entre para a turma e receba novidades e promoções em primeira mão.</p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <label className="sr" htmlFor="news">E-mail para novidades</label>
              <input id="news" className="fld" type="email" placeholder="Seu melhor e-mail" style={{ flex: '1 1 200px', borderRadius: 999, padding: '0 20px' }} />
              <button type="button" className="btn" style={{ height: 52, borderRadius: 999, border: 0, background: ACCENT, color: INK, padding: '0 24px', fontWeight: 700, fontSize: 16 }}>Quero receber</button>
            </form>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <strong style={{ marginBottom: 6 }}>Loja</strong>
            {CATS.map(([id, label]) => <button key={id} className="lnk" onClick={() => goShopCat(id)} style={footLink}>{label}</button>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <strong style={{ marginBottom: 6 }}>Ajuda</strong>
            <button className="lnk" onClick={() => go('about')} style={footLink}>Sobre a Bolha</button>
            <button className="lnk" onClick={goOrders} style={footLink}>Rastrear pedido</button>
            <a className="lnk" href="#" style={footLink}>Trocas e devoluções</a>
            <a className="lnk" href="#" style={footLink}>Prazos de entrega</a>
            <a className="lnk" href="#" style={footLink}>Fale com a gente</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #3A3950', paddingTop: 24, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', color: '#B9B7CE', fontSize: 14 }}>
          <span>© 2026 Bolha. Todos os direitos reservados.</span>
          <span>[CNPJ] · [ENDEREÇO DA EMPRESA]</span>
        </div>
      </div>
    </footer>
  )
}
