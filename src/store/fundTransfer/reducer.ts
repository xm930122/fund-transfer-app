import { type FundItem, type FundTransferState, FundActionTypes } from "./types";
import { initialFundTransferState } from "./initState";
import { type FundAction } from "./actions";

export const initialState: FundTransferState = initialFundTransferState;

// 工具函数：更新单个基金的 showMinTip 标志
const updateFundShowTip = (fund: FundItem): FundItem => {
  const amount = fund.amount;
  const showTip = amount === null || amount === 0 || (amount !== undefined && amount < 100);
  return { ...fund, showMinTip: showTip };
};

// 批量更新所有基金的 showMinTip
const updateFundsWithShowTip = (funds: FundItem[]): FundItem[] => {
  return funds.map(updateFundShowTip);
};

// 计算是否应禁用确认按钮（任一基金金额无效或小于100）
const getDisableConfirm = (funds: FundItem[]): boolean => {
  return funds.some((fund) => {
    const amount = fund.amount;
    return amount === null || amount === 0 || (amount !== undefined && amount < 100);
  });
};

export function fundTransferReducer(
  state: FundTransferState,
  action: FundAction,
): FundTransferState {
  switch (action.type) {
    case FundActionTypes.ININT_FUNDS: {
      // 假设初始化时 funds 已由外部传入，这里重新计算 showMinTip 和 disableConfirm
      const updatedFunds = updateFundsWithShowTip(state.funds);
      const disableConfirm = getDisableConfirm(updatedFunds);
      return {
        ...state,
        funds: updatedFunds,
        disableConfirm,
      };
    }

    case FundActionTypes.UPDATE_AMOUNT: {
      const { id, amount } = action.payload;
      // 更新指定基金的金额，并重新计算该基金的 showMinTip
      const newFunds = state.funds.map((fund) => {
        if (fund.id === id) {
          const showTip = amount === null || amount === 0 || (amount !== undefined && amount < 100);
          return { ...fund, amount, showMinTip: showTip };
        }
        return fund;
      });
      const disableConfirm = getDisableConfirm(newFunds);
      return {
        ...state,
        funds: newFunds,
        disableConfirm,
      };
    }

    case FundActionTypes.SET_SHOW_MODAL:
      return { ...state, showModal: action.payload };

    case FundActionTypes.SET_ERROR_MSG:
      return { ...state, errorMsg: action.payload };

    case FundActionTypes.REPLACE_FUNDS: {
      // 替换整个基金列表，同时重新计算每个基金的 showMinTip 和全局 disableConfirm
      const newFunds = updateFundsWithShowTip(action.payload);
      const disableConfirm = getDisableConfirm(newFunds);
      return {
        ...state,
        funds: newFunds,
        disableConfirm,
        // 可选：重置错误信息
        errorMsg: '',
      };
    }

    default:
      return state;
  }
}