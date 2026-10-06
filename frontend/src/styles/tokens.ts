import type { CSSProperties } from 'react'

export const INK = '#15141F'
export const ACCENT = '#8D9BFF'
export const muted = '#5B5A6B'
export const pad = 'clamp(16px,3vw,40px)'

export const on: CSSProperties = { background: INK, color: '#fff' }
export const off: CSSProperties = { background: 'transparent', color: INK }
export const offWhite: CSSProperties = { background: '#fff', color: INK }
export const linkBtn: CSSProperties = { background: 'none', border: 0, minHeight: 44, padding: 0, fontWeight: 700, textDecoration: 'underline' }

export const grid = (min: number, mode = 'auto-fit'): CSSProperties => ({ display: 'grid', gridTemplateColumns: `repeat(${mode},minmax(min(${min}px,100%),1fr))`, gap: 18 })
export const box = (radius = 32): CSSProperties => ({ background: '#fff', borderRadius: radius, padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column' })
