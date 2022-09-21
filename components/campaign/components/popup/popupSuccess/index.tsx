import {Button, Modal } from "antd";
import s from "./index.module.sass";
import React from "react";
import CampaignStore from "../../../../../src/store/CampaignStore";

type Props = {
};

const PopupPurchasedSuccess = (props: Props) => {

  const isModalVisible = CampaignStore.connectModalVisible;

  const closePurchasedSuccess = () => {
    CampaignStore.connectModalVisible = false;
  }
  return (
    <Modal
      visible={isModalVisible}
      centered
      title={<h3 className={s.title}>Congratulaions!</h3>}
      className={s.content_modal}
      onCancel={closePurchasedSuccess}
      footer={null}
    >
      <div className={s.container}>
        <p>You have successfully purchased</p>
      </div>
    </Modal>
  );
};

export default PopupPurchasedSuccess;
