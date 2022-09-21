import s from "./index.module.sass";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Popconfirm} from "antd";
import ModalShare from "../Modal";
import AuthStore from "../../../Auth/AuthStore";
import ConnectWalletStore from "../../../Auth/ConnectWalletStore";
import {AppEmitter} from "../../../../services/emitter";
import {observer} from "mobx-react";

const ShareCampaign =  observer(function () {
  const [isModalShareVisible, setIsModalShareVisible] = useState(false);
  const { chainNetwork } = ConnectWalletStore;
  const showConnectWalletModal = useCallback(() => {
    AppEmitter.emit("showConnectWalletModal");
  }, []);
  const closeModalShare = () => {
    setIsModalShareVisible(false);
  };

  const openShare = () => {
    if (!AuthStore.isLoggedIn) {
      return;
    }
    setIsModalShareVisible(true);
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={`${s.container}`}>
          <div className={s.title}>
            <h2>Refer friend and get commission up to 12%</h2>
          </div>
          <div className={s.btn}>
            {!AuthStore.isLoggedIn
              ? <Popconfirm
              title={
                <span>
                        You need to {chainNetwork ? "verify" : "connect"} wallet
                        <br /> in order to buy this box
                      </span>
              }
              onConfirm={showConnectWalletModal}
              // onCancel={cancel}
              okText={chainNetwork ? "Verify Wallet" : "Connect Wallet"}
              cancelText="Close"
            >
                <Button className={`${s.button}`} onClick={openShare}>Share this campaign</Button>
              </Popconfirm>
              : <Button className={`${s.button}`} onClick={openShare}>Share this campaign</Button>
            }
          </div>
        </div>
      </div>
      <ModalShare
        closeModalShare={closeModalShare}
        status={isModalShareVisible}
      />
    </>
  );
})

export default ShareCampaign;

