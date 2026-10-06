import type { ReactNode } from 'react'

export default function Icon({ size = 20, sw = 2.2, children }: { size?: number; sw?: number; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

export const ArrowRight = ({ size }: { size?: number }) => <Icon size={size}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
export const ArrowLeft = ({ size }: { size?: number }) => <Icon size={size}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>
