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
