// 头部组件
import React, { Fragment } from "react";
import { setShowModal } from "@/store/fundTransfer/actions";
import { type FundTransferState } from "@/const/fundTransfer/types";
import styles from "./index.module.less";

const Modal: React.FC = (props: FundTransferState) => {
  const { dispatch, showModal } = props;

  const handleModalStatus = (status: boolean) => {
    dispatch(setShowModal(status));
  };

  // 弹窗 - 取消修改
  const handleCancelModify = () => {
    handleModalStatus(false);
  };

  // 弹窗 - 选择某个产品（演示）
  const handleSelectProduct = (productName: string) => {
    alert(`选择了 ${productName}`);
    handleModalStatus(false);
  };

  return (
    <Fragment>
      {showModal && (
        <div className={styles.modalMask} onClick={handleCancelModify}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>选择产品</span>
              <button
                className={styles.modalCancel}
                onClick={handleCancelModify}
              >
                取消修改
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* 模拟产品列表 */}
              {["南方天天利货币A", "南方天天利货币B", "发财宝增强债"].map(
                (product) => (
                  <div
                    key={product}
                    className={styles.productItem}
                    onClick={() => handleSelectProduct(product)}
                  >
                    {product}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
