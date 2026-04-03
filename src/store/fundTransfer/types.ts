export interface FundItem {
  id: number,
  name: string,
  code: string,
  sevenDayYield: string,
  perTenThousand: string,
  amount: number | null,
  showMinTip?: boolean,
  isLongName?: boolean,
}

export interface FundTransferState {
  funds: FundItem[],
  showModal: boolean,
  errorMsg: string | null,
  transferNum: number,
  disableConfirm: boolean,
}

// Action 类型枚举
export const FundActionTypes = {
  UPDATE_AMOUNT: 'UPDATE_AMOUNT',
  SET_SHOW_MODAL: 'SET_SHOW_MODAL',
  SET_ERROR_MSG: 'SET_ERROR_MSG',
  REPLACE_FUNDS: 'REPLACE_FUNDS',
  ININT_FUNDS: 'ININT_FUNDS'
} as const

// 如果需要类型，可以从常量推导
export type FundActionType = typeof FundActionTypes[keyof typeof FundActionTypes]