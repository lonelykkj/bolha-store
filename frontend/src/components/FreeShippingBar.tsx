import { useStore } from '../context/store'
import { ACCENT } from '../styles/tokens'

export default function FreeShippingBar({ height, fontSize }: { height: number; fontSize?: number }) {
  const { freeMsg, barPct } = useStore()
  return (
    <>
      <div style={{ fontWeight: 700, fontSize, marginBottom: fontSize ? 8 : 10 }}>{freeMsg}</div>
      <div style={{ height, borderRadius: height / 2, background: '#ECEAF5', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: height / 2, background: ACCENT, width: barPct + '%' }} />
      </div>
    </>
  )
}
