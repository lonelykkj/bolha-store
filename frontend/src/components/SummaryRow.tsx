import { muted } from '../styles/tokens'

type Props = { label: string; value: string; total?: number }

// Linha do resumo de valores; com `total` vira a linha de destaque com o tamanho da fonte informado.
export default function SummaryRow({ label, value, total }: Props) {
  if (total)
    return <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: total, fontWeight: 700, marginTop: 6 }}><span>{label}</span><span>{value}</span></div>
  return <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: muted }}>{label}</span><span>{value}</span></div>
}
