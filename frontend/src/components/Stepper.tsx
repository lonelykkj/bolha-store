import type { CSSProperties } from 'react'
import { INK } from '../styles/tokens'
import Icon from './Icon'

type Props = { qty: number; dec: () => void; inc: () => void; size: number }

export default function Stepper({ qty, dec, inc, size }: Props) {
  const b: CSSProperties = { width: size, height: size, border: 0, background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${INK}`, borderRadius: 999 }}>
      <button onClick={dec} aria-label="Diminuir quantidade" style={b}><Icon size={16} sw={2.4}><path d="M5 12h14" /></Icon></button>
      <span style={{ minWidth: 26, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
      <button onClick={inc} aria-label="Aumentar quantidade" style={b}><Icon size={16} sw={2.4}><path d="M12 5v14M5 12h14" /></Icon></button>
    </div>
  )
}
