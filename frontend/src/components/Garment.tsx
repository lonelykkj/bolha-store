import type { Kind } from '../data/products'
import { INK } from '../styles/tokens'

// Peça "inflável" desenhada em SVG, usada no lugar das fotos dos produtos.
export default function Garment({ kind, color }: { kind: Kind; color: string }) {
  const body = { fill: color, stroke: color, strokeWidth: 14, strokeLinejoin: 'round' as const }
  const svg = { viewBox: '0 0 200 200', style: { width: '100%', height: 'auto', display: 'block' }, role: 'img' }

  if (kind === 'long')
    return (
      <svg {...svg} aria-label="Blusa de manga longa inflável">
        <ellipse cx="100" cy="184" rx="58" ry="7" fill={INK} opacity=".12" />
        <path d="M72 34 L100 46 L128 34 L156 54 L184 138 L162 148 L142 98 L134 106 L134 166 L66 166 L66 106 L58 98 L38 148 L16 138 L44 54 Z" {...body} />
        <path d="M120 48 L128 34 L156 54 L184 138 L162 148 L142 98 L134 106 L134 166 L112 166 Z" fill={INK} opacity=".1" />
        <path d="M80 36 Q100 66 120 36 Q100 46 80 36 Z" fill={INK} opacity=".25" />
        <path d="M20 134 L38 144 M180 134 L164 144" stroke={INK} strokeOpacity=".14" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="82" cy="112" rx="8" ry="28" fill="#fff" opacity=".42" />
        <ellipse cx="38" cy="96" rx="5" ry="22" transform="rotate(20 38 96)" fill="#fff" opacity=".42" />
        <circle cx="80" cy="62" r="3.5" fill="#fff" opacity=".6" />
      </svg>
    )

  if (kind === 'hoodie')
    return (
      <svg {...svg} aria-label="Moletom com capuz inflável">
        <ellipse cx="100" cy="186" rx="60" ry="7" fill={INK} opacity=".12" />
        <path d="M68 54 L132 54 L160 68 L182 146 L160 154 L142 104 L140 168 L60 168 L58 104 L40 154 L18 146 L40 68 Z" {...body} />
        <path d="M70 56 Q100 4 130 56 Q100 86 70 56 Z" {...body} />
        <path d="M82 54 Q100 24 118 54 Q100 72 82 54 Z" fill={INK} opacity=".3" />
        <path d="M122 60 L132 54 L160 68 L182 146 L160 154 L142 104 L140 168 L116 168 Z" fill={INK} opacity=".1" />
        <path d="M70 128 H130 L138 158 H62 Z" fill={INK} opacity=".1" />
        <path d="M92 74 V104 M108 74 V104" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" fill="none" opacity=".85" />
        <ellipse cx="80" cy="102" rx="8" ry="20" fill="#fff" opacity=".42" />
        <ellipse cx="82" cy="34" rx="10" ry="5" transform="rotate(-30 82 34)" fill="#fff" opacity=".5" />
        <ellipse cx="34" cy="108" rx="5" ry="20" transform="rotate(18 34 108)" fill="#fff" opacity=".36" />
      </svg>
    )

  if (kind === 'pants')
    return (
      <svg {...svg} aria-label="Calça inflável">
        <ellipse cx="100" cy="188" rx="60" ry="7" fill={INK} opacity=".12" />
        <path d="M62 28 L138 28 L148 172 L110 172 L100 84 L90 172 L52 172 Z" {...body} />
        <path d="M100 84 L110 172 L148 172 L138 28 L100 28 Z" fill={INK} opacity=".1" />
        <path d="M62 28 H138 L139 46 H61 Z" fill={INK} opacity=".14" />
        <path d="M100 46 V84" stroke={INK} strokeOpacity=".18" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M60 156 H92 M108 156 H140" stroke={INK} strokeOpacity=".12" strokeWidth="2" fill="none" />
        <ellipse cx="76" cy="96" rx="7" ry="34" fill="#fff" opacity=".42" />
        <circle cx="80" cy="38" r="3" fill="#fff" opacity=".6" />
      </svg>
    )

  if (kind === 'sock')
    return (
      <svg {...svg} aria-label="Meia inflável">
        <ellipse cx="104" cy="184" rx="64" ry="7" fill={INK} opacity=".12" />
        <path d="M76 22 H124 V98 L158 124 Q176 142 160 158 Q150 168 134 164 L88 166 Q64 166 66 140 Z" {...body} />
        <path d="M112 22 H124 V98 L158 124 Q176 142 160 158 Q150 168 134 164 L112 165 Z" fill={INK} opacity=".1" />
        <rect x="72" y="22" width="56" height="16" rx="8" fill="#fff" opacity=".55" />
        <rect x="72" y="48" width="56" height="7" rx="3.5" fill="#fff" opacity=".4" />
        <ellipse cx="152" cy="146" rx="13" ry="13" fill="#fff" opacity=".4" />
        <ellipse cx="76" cy="142" rx="9" ry="13" fill="#fff" opacity=".4" />
        <ellipse cx="88" cy="74" rx="6" ry="22" fill="#fff" opacity=".42" />
      </svg>
    )

  if (kind === 'cap')
    return (
      <svg {...svg} aria-label="Boné inflável">
        <ellipse cx="104" cy="172" rx="66" ry="7" fill={INK} opacity=".12" />
        <g transform="translate(0 14)">
          <path d="M38 118 Q38 46 100 46 Q162 46 162 118 Z" {...body} />
          <path d="M118 48 Q162 54 162 118 H112 Z" fill={INK} opacity=".1" />
          <path d="M44 120 Q100 108 156 120 Q196 126 184 146 Q100 130 44 136 Z" {...body} strokeWidth={12} />
          <path d="M44 120 Q100 108 156 120 Q196 126 184 146 Q100 130 44 136 Z" fill={INK} opacity=".14" />
          <path d="M100 46 Q84 80 82 116 M100 46 Q116 80 118 116" stroke={INK} strokeOpacity=".14" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="44" r="7" fill={color} stroke={color} strokeWidth="4" />
          <ellipse cx="70" cy="78" rx="8" ry="16" transform="rotate(24 70 78)" fill="#fff" opacity=".45" />
        </g>
      </svg>
    )

  return (
    <svg {...svg} aria-label="Camiseta inflável">
      <ellipse cx="100" cy="184" rx="58" ry="7" fill={INK} opacity=".12" />
      <path d="M72 36 L100 48 L128 36 L168 58 L150 98 L134 90 L134 166 L66 166 L66 90 L50 98 L32 58 Z" {...body} />
      <path d="M120 50 L128 36 L168 58 L150 98 L134 90 L134 166 L112 166 Z" fill={INK} opacity=".1" />
      <path d="M80 38 Q100 68 120 38 Q100 48 80 38 Z" fill={INK} opacity=".25" />
      <path d="M66 154 H134" stroke={INK} strokeOpacity=".12" strokeWidth="2" fill="none" />
      <ellipse cx="80" cy="106" rx="8" ry="28" fill="#fff" opacity=".42" />
      <ellipse cx="47" cy="64" rx="5" ry="12" transform="rotate(-35 47 64)" fill="#fff" opacity=".42" />
      <circle cx="80" cy="64" r="3.5" fill="#fff" opacity=".6" />
    </svg>
  )
}
