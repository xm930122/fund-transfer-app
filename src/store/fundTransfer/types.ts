export interface FundItem {
  id: number;
  name: string;
  code: string;
  sevenDayYield: string;
  perTenThousand: string;
  amount: number | null;
  showMinTip?: boolean;
  // ... 其他字段
}

export interface FundTransferState {
  funds: FundItem[];
  disableConfirm: boolean;
  errorMsg: string;
  showModal: boolean;
  // ... 其他状态
}

export enum FundActionTypes {
  ININT_FUNDS = 'ININT_FUNDS',
  UPDATE_AMOUNT = 'UPDATE_AMOUNT',
  SET_SHOW_MODAL = 'SET_SHOW_MODAL',
  SET_ERROR_MSG = 'SET_ERROR_MSG',
  REPLACE_FUNDS = 'REPLACE_FUNDS',
}

// actions 中定义 payload 类型
export type FundAction =
  | { type: FundActionTypes.ININT_FUNDS; payload?: any }  // 可无 payload，从 state 或外部获取
  | { type: FundActionTypes.UPDATE_AMOUNT; payload: { id: number; amount: number | null } }
  | { type: FundActionTypes.SET_SHOW_MODAL; payload: boolean }
  | { type: FundActionTypes.SET_ERROR_MSG; payload: string }
  | { type: FundActionTypes.REPLACE_FUNDS; payload: FundItem[] };