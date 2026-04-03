import { type FundItem, type FundTransferState, FundActionTypes } from "./types";
import { initialFundTransferState } from "./initState";
import { type FundAction } from "./actions";

export const initialState: FundTransferState = initialFundTransferState;

const updateFundsWithInitData = (fundData: FundItem[]): FundItem[] => {
  const fundDataNew = fundData.map((item: FundItem) => ({
    ...item,
    showMinTip: item.amount === 0 || item.amount === null || (item.amount && item.amount < 100), // 初始化时根据金额设置提示
  }));
  return fundDataNew;
};

const getDisableConfirm = (funds: FundItem[]) => {
  return funds.some(
    (fund) => (fund.amount && fund.amount < 100) || fund.amount === null || fund.amount === 0,
  );
};

export function fundTransferReducer(
  state: FundTransferState,
  action: FundAction,
): FundTransferState {
  switch (action.type) {
    case FundActionTypes.ININT_FUNDS:
      const fundData = updateFundsWithInitData(state.funds);
      const disableConfirm = getDisableConfirm(fundData);
      return {
        ...state,
        funds: fundData,
        disableConfirm: disableConfirm, // 根据金额是否小于100来控制确认按钮的禁用状态
      };
    case FundActionTypes.UPDATE_AMOUNT:
      const amount = action.payload.amount;
      // 不输入或者输入金额小于100都显示提示
      const showTip = amount === 0 || amount === null || (amount && amount < 100);
      const newFunds = state.funds.map((fund) =>
        fund.id === action.payload.id
          ? { ...fund, amount: amount, showMinTip: showTip }
          : fund,
      );
      return {
        ...state,
        disableConfirm: getDisableConfirm(newFunds), // 根据金额是否小于100来控制确认按钮的禁用状态
        funds: newFunds,
      };

    case FundActionTypes.SET_SHOW_MODAL:
      return { ...state, showModal: action.payload };

    case FundActionTypes.SET_ERROR_MSG:
      return { ...state, errorMsg: action.payload };

    case FundActionTypes.REPLACE_FUNDS:
      return { ...state, funds: action.payload };

    default:
      return state;
  }
}
