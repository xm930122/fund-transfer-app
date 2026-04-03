import { type FundTransferState } from './types';

export const initialFundTransferState: FundTransferState = {
  funds: [
    {
      id: 1,
      name: '南方天天利货币B',
      code: '005827',
      sevenDayYield: '2.8523%',
      perTenThousand: '0.8523',
      amount: 10000,
      showMinTip: false,
      isLongName: false,
    },
    {
      id: 2,
      name: '南方天天利货币B',
      code: '005827',
      sevenDayYield: '1.8523%',
      perTenThousand: '0.8523',
      amount: 0.1,
      showMinTip: true,
      isLongName: false,
    },
    {
      id: 3,
      name: '南方天天利货币B',
      code: '005827',
      sevenDayYield: '1.8523%',
      perTenThousand: '0.8523',
      amount: 0,
      showMinTip: false,
      isLongName: false,
    },
    {
      id: 4,
      name: '南方天天利货币文字文字文字文字文字...',
      code: '005827',
      sevenDayYield: '1.8523%',
      perTenThousand: '0.8523',
      amount: 10000,
      showMinTip: false,
      isLongName: true,
    },
  ],
  showModal: false,
  disableConfirm: false, // 是否禁用确认按钮（如金额超出预算时）
  errorMsg: '分配金额超出本次充值金额，以超出5，000元',
  transferNum: 3
}