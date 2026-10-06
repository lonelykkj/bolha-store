import { useState } from 'react'
import Garment from '../components/Garment'
import { useStore } from '../context/store'
import { ACCENT, linkBtn, off, on, pad } from '../styles/tokens'

export default function Login() {
  const { setLogged, setAcc } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: `16px ${pad} 80px` }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(380px,100%),1fr))', background: '#fff', borderRadius: 48, overflow: 'hidden' }}>
        <div style={{ background: ACCENT, padding: 'clamp(28px,4vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32, minHeight: 420 }}>
          <h1 className="disp" style={{ fontSize: 'clamp(40px,5vw,64px)' }}>Sua conta, do seu jeito.</h1>
          <div style={{ width: '70%', alignSelf: 'center' }}><Garment kind="hoodie" color="#FFD84D" /></div>
          <p style={{ margin: 0, fontWeight: 500, lineHeight: 1.5 }}>Acompanhe pedidos, salve favoritos e finalize suas compras mais rápido.</p>
        </div>
        <div style={{ padding: 'clamp(28px,4vw,56px)', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', background: '#F4F3F9', borderRadius: 999, padding: 4, alignSelf: 'flex-start' }}>
            <button onClick={() => setIsLogin(true)} aria-pressed={isLogin} className="nv" style={isLogin ? on : off}>Entrar</button>
            <button onClick={() => setIsLogin(false)} aria-pressed={!isLogin} className="nv" style={isLogin ? off : on}>Criar conta</button>
          </div>
          <h2 className="disp" style={{ fontSize: 36 }}>{isLogin ? 'Que bom te ver de novo' : 'Crie sua conta'}</h2>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {!isLogin && <label className="lbl">Nome completo<input className="fld" type="text" autoComplete="name" placeholder="Seu nome" /></label>}
            <label className="lbl">E-mail<input className="fld" type="email" autoComplete="email" placeholder="voce@email.com" /></label>
            <label className="lbl">Senha<input className="fld" type="password" autoComplete="current-password" placeholder="••••••••" /></label>
            <button type="button" className="pri btn" onClick={() => { setLogged(true); setAcc('pedidos') }} style={{ width: '100%' }}>{isLogin ? 'Entrar' : 'Criar conta'}</button>
          </form>
          <button className="lnk" style={{ ...linkBtn, textAlign: 'left' }}>Esqueci minha senha</button>
        </div>
      </div>
    </main>
  )
}
