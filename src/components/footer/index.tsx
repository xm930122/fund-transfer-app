// 头部组件
import React, { memo, useMemo } from "react";
import { type FundItem, type FundTransferState } from "@/const/fundTransfer/types";
import { add } from "@/utils";
import styles from "./index.module.less";

const Footer: React.FC = (props: FundTransferState) => {
  const { funds, errorMsg, disableConfirm } = props;

  const disabled = useMemo(
    () => disableConfirm || !!errorMsg,
    [disableConfirm, errorMsg],
  );

  // 计算当前所有基金转入金额的总和（将 null 视为 0）
  const totalAmount = useMemo(() => {
    return funds.reduce((sum: number, fund: FundItem) => {
      const amount = fund.amount && !isNaN(fund.amount) ? fund.amount : 0;
      return add(sum, amount);
    }, 0);
  }, [funds]);

  const handleConfirm = () => {
    alert(`转入金额总计: ${totalAmount.toFixed(2)}`);
    // 可在此处 dispatch 其他 action 或调用 API
  };

  return (
    <div className={styles.footer}>
      <div className={styles.serviceInfo}>
        基金销售服务由上海中正达广基金销售有限公司提供
      </div>
      <div className={styles.disclaimer}>
        本页面非任何法律文件，相关数据仅供参考，不构成投资建议。
        <br />
        过往业绩不预示未来表现，市场有风险，投资需谨慎。
      </div>
      <div
        className={`${styles.contactInfo} ${!errorMsg ? styles.padding : ""}`}
      >
        {errorMsg && <div className={styles.errorTip}>{errorMsg}</div>}
        <button
          className={`${styles.confirmBtn} ${disabled ? styles.disable : ""}`}
          onClick={handleConfirm}
          disabled={disabled}
        >
          确认
        </button>
      </div>
    </div>
  );
};

export default memo(Footer);
