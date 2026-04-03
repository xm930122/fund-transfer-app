// src/store/fundTransfer/context.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { type FundTransferState } from './types'
import { type FundAction } from './actions'
import { fundTransferReducer, initialState } from './reducer'

interface FundTransferContextValue {
  state: FundTransferState
  dispatch: React.Dispatch<FundAction>
}

const FundTransferContext = createContext<FundTransferContextValue | undefined>(
  undefined
)

export function FundTransferProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(fundTransferReducer, initialState)

  return (
    <FundTransferContext.Provider value={{ state, dispatch }}>
      {children}
    </FundTransferContext.Provider>
  )
}

// 自定义 Hook，方便使用
export function useFundTransfer() {
  const context = useContext(FundTransferContext)
  if (!context) {
    throw new Error('useFundTransfer must be used within FundTransferProvider')
  }
  return context
}