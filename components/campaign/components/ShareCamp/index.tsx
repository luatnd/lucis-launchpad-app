import s from "./index.module.sass";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import ModalShare from "../Modal";

export default function ShareCampaign() {
  const [isModalShareVisible, setIsModalShareVisible] = useState(false);
  
  const closeModalShare = () => {
    setIsModalShareVisible(false);
  };

  const openShare = () => {
    setIsModalShareVisible(true);
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={`${s.container}`}>
          <div className={s.title}>
            <h2>Refer friend and get commission up to 5%</h2>
          </div>
          <div className={s.btn}>
            <Button className={`${s.button}`} onClick={openShare}>Share this campaign</Button>
          </div>
        </div>
      </div>
      <ModalShare
        closeModalShare={closeModalShare}
        status={isModalShareVisible}
      />
    </>
  );
}
