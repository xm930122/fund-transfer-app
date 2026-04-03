// 头部组件
import React, { memo } from "react";
import SvgIcon from "@/components/SvgIcon";
import { type FundTransferState } from "@/const/fundTransfer/types";
import { getFormattedTime, getTime } from "@/utils";
import styles from "./index.module.less";

const Header: React.FC = (props: FundTransferState) => {
  const { setShowModal, transferNum } = props;

  // 获取当前时间并格式化显示 时:分:秒
  const formattedTime = `${getFormattedTime()} ${getTime()}`;

  // 返回
  const handleBack = () => {
    alert('返回');
  }

  // 更换产品 - 打开弹窗
  const handleChangeProduct = () => {
    setShowModal(true);
  };

  // 点击图标
  const handleIcon = () => {
    alert('点击图标')
  }

  return (
    <div className={styles.header}>
      <div className={styles.statusBar}>
        <div className={styles.left}>
          <span className={styles.dots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </span>
          <span>YNZ</span>
          <span className={styles.wifiIcon}>
            <SvgIcon name="wifi" size={14} color="#1a2c3e" />
          </span>
        </div>
        <div className={styles.time}>{formattedTime}</div>
        <div className={styles.battery}>
          <span className={styles.starBar}>100%</span>
          <SvgIcon name="battery" size={24} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.changeBtnWrapper}>
          <span><SvgIcon name="back" size={24} onClick={handleBack} /></span>
          <span className={styles.changeBtn} onClick={handleChangeProduct}>更换产品</span>
          <span onClick={handleIcon}><SvgIcon name="dotIcon" size={24} /></span>
        </div>
        <div className={styles.transferCount}>将转入
          <span className={styles.count}>{transferNum}只</span>产品
        </div>
        {/* 快赎额度说明 */}
        <div className={styles.quotaNotice}>
          发财宝每支基金的单日快取最高为1万，发财宝组合单日快赎额度
          <br />
          最高为30万。仅供参考，以实际转入情况为准。
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
