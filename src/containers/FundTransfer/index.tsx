import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Modal from "@/components/modal";
import Content from "@/components/content";
import { useFundTransfer } from "@/store/fundTransfer/context";
import { setShowModal } from "@/store/fundTransfer/actions";
import styles from "./index.module.less";

const FundTransfer: React.FC = () => {
  const { state, dispatch } = useFundTransfer();
  const { showModal, errorMsg } = state;

  const handleChangeProduct = (status: boolean) => {
    dispatch(setShowModal(status));
  };

  // 处理金额变化
  // const handleAmountChange = (id: number, value: string) => {
  //   const numValue = value === "" ? null : parseFloat(value);
  //   setFunds((prev) =>
  //     prev.map((fund) =>
  //       fund.id === id ? { ...fund, amount: numValue } : fund,
  //     ),
  //   );
  //   // 模拟错误提示（实际根据业务逻辑控制）
  //   setErrorMsg("分配金额超出本次充值金额，以超出5，000元");
  // };

  return (
    <div className={styles.container}>
      {/* 头部 */}
      <Header
        setShowModal={handleChangeProduct}
        showModal={showModal}
        dispatch={dispatch}
        {...state}
      />
      {/* 内容部分 */}
      <Content />
      {/* 底部 */}
      <Footer errorMsg={errorMsg} dispatch={dispatch} {...state} />
      {/* 弹窗：选择产品 / 取消修改 */}
      <Modal dispatch={dispatch} {...state} />
    </div>
  );
};

export default FundTransfer;
