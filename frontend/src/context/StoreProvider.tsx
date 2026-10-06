import type { ReactNode } from 'react'
import { StoreContext, useStoreState } from './store'

export default function StoreProvider({ children }: { children: ReactNode }) {
  return <StoreContext.Provider value={useStoreState()}>{children}</StoreContext.Provider>
}
