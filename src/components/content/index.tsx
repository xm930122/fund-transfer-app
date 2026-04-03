import React, { memo } from "react";
import { useFundTransfer } from "@/store/fundTransfer/context";
import { initFunds, updateAmount, setErrorMsg } from "@/store/fundTransfer/actions";
import { useDeepCompareEffect, add, subtraction } from "@/utils";
import { type FundItem } from "@/const/fundTransfer/types";
import styles from "./index.module.less";

// 本次可分配的总金额
const TOTAL_BUDGET = 5000;

const FundTransfer: React.FC = () => {
  const { state, dispatch } = useFundTransfer();
  const { funds } = state;

  // 初始化数据（模拟从接口获取并格式化后的数据）
  useDeepCompareEffect(() => {
    dispatch(initFunds());
  }, [funds]);

  // 计算超出金额（正数表示超出，负数或零表示未超出）
  // const exceedAmount = totalAmount - TOTAL_BUDGET;
  // const isOverBudget = exceedAmount > 0;

  // 动态生成错误提示信息
  // const getErrorMessage = useCallback(() => {
  //   if (isOverBudget) {
  //     return `分配金额超出本次充值金额，超出 ${exceedAmount.toFixed(2)} 元`;
  //   }
  //   return "";
  // }, [isOverBudget, exceedAmount]);

  // 处理金额输入变化
  const handleAmountChange = (id: number, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    dispatch(updateAmount(id, numValue));

    //由于 state 更新是异步的，这里不能直接使用最新的 totalAmount，
    // 基于当前其他基金的金额 + 新输入的值，手动计算新的总和用于错误提示。
    // 获取其他基金的金额总和（排除当前修改的基金）
    const otherFundsTotal = funds.reduce((sum: number, fund: FundItem) => {
      if (fund.id === id) return sum;
      const amt = fund.amount && !isNaN(fund.amount) ? fund.amount : 0;
      return add(sum, amt);
    }, 0);

    const newTotal = add(otherFundsTotal, numValue || 0);
    const newExceed = subtraction(newTotal, TOTAL_BUDGET);
    const newErrorMsg =
      newExceed > 0 ? "分配金额超出本次充值金额，以超出5，000元" : "";
    dispatch(setErrorMsg(newErrorMsg));
  };

  // 正负数样式处理
  const getClassName = (fund: FundItem, key = "sevenDayYield") => {
    if (!fund[key]) return ""; // 处理空值情况
    // 使用正则替换 % 并转为数字
    const value = parseFloat(fund[key].replace(/\%/g, ""));
    if (value > 0) return styles.red;
    if (value < 0) return styles.green;
    if (value === 0) return "";
  };

  const handleSelect = () => {
    alert("选择产品功能待实现");
  };

  const handleCancel = () => {
    alert("取消修改功能待实现");
  }

  return (
    <div className={styles.card}>
      <div className={styles.tools}>
        <div className={styles.select} onClick={handleSelect}>
          选择产品
        </div>
        <div className={styles.cancel} onClick={handleCancel}>取消修改</div>
      </div>
      <div className={styles.fundList}>
        {funds.map((fund: FundItem, idx: number) => (
          <div key={fund.id} className={styles.fund}>
            <div className={styles.fundTitle}>
              <span className={styles.fundName}>
                {fund.name}（{fund.code}）
              </span>
            </div>
            <div className={styles.fundItem}>
              <div className={styles.metric}>
                <span
                  className={`${styles.metricValue} ${getClassName(fund, "sevenDayYield")}`}
                >
                  {fund.sevenDayYield}
                </span>
                <span className={styles.metricLabel}>七日年化</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>
                  {fund.perTenThousand}
                </span>
                <span className={styles.metricLabel}>万份收益</span>
              </div>
              <div className={styles.fundRight}>
                <div className={styles.amountInputWrapper}>
                  {/* <span className={styles.currency}>¥</span> */}
                  <input
                    type="number"
                    className={styles.amountInput}
                    value={fund.amount === null ? "" : fund.amount}
                    onChange={(e) =>
                      handleAmountChange(fund.id, e.target.value)
                    }
                    placeholder="转入金额"
                    step="0.01"
                  />
                </div>
                <div className={styles.metricVal}>转入金额</div>
              </div>
            </div>
            {fund.showMinTip && (
              <div className={styles.minTip}>最低转入100元</div>
            )}
            <div
              className={`${styles.line} ${idx === funds.length - 1 ? styles.last : ""}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(FundTransfer);
