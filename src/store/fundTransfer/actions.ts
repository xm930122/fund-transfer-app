import { FundActionTypes, type FundItem } from './types'

// 初始化格式化数据
export const initFunds = () => ({
  type: FundActionTypes.ININT_FUNDS,
})

// 更新某个基金的转入金额
export const updateAmount = (id: number, amount: number | null) => ({
  type: FundActionTypes.UPDATE_AMOUNT,
  payload: { id, amount }
})

// 控制产品选择弹窗显示/隐藏
export const setShowModal = (show: boolean) => ({
  type: FundActionTypes.SET_SHOW_MODAL,
  payload: show
})

// 设置错误提示信息
export const setErrorMsg = (msg: string | null) => ({
  type: FundActionTypes.SET_ERROR_MSG,
  payload: msg
})

// 替换整个基金列表（如更换产品后）
export const replaceFunds = (funds: FundItem[]) => ({
  type: FundActionTypes.REPLACE_FUNDS,
  payload: funds
})

// 导出联合类型供 reducer 使用
export type FundAction =
  | ReturnType<typeof initFunds>
  | ReturnType<typeof updateAmount>
  | ReturnType<typeof setShowModal>
  | ReturnType<typeof setErrorMsg>
  | ReturnType<typeof replaceFunds>