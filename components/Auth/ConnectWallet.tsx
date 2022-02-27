import {useCallback, useEffect, useState} from "react";
import { Modal, Button } from 'antd';

import s from './ConnectWallet.module.sass';
import GradientButton from '../Button/GradientButton';


type Props = {
  small?: boolean,
};
export default function Header(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={s.container}>
      <GradientButton
        onClick={showModal} type={1}
        small={!!props.small}
        className={`text-white text-24px leading-28px px-40px py-15px ${props.small ? '' : 'ml-15px'}`}
        style={{whiteSpace: 'nowrap', fontWeight: '600'}}
      >
        Connect wallet
      </GradientButton>

      <Modal
        title="Connect wallet"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        wrapClassName={s.mdl}
      >
        <p className={s.title}>1. Choose network</p>
        <div className={s.items}>
          <div className={s.item}>
            <img src="/assets/crypto/ico-chain-eth.png" alt="" />
            <p>Ethereum</p>
          </div>
          <div className={`${s.item} ${s.active}`}>
            <img src="/assets/crypto/ico-chain-bsc.png" alt="" />
            <p>BSC</p>
          </div>
          <div className={`${s.item} ${s.disable}`}>
            <img src="/assets/crypto/ico-chain-polygon.png" alt="" />
            <p>Polygon</p>
          </div>
        </div>


        <p className={s.title}>2. Choose wallet</p>
        <div className={s.items}>
          <div className={s.item}>
            <img src="/assets/crypto/ico-chain-eth.png" alt="" />
            <p>Metamask</p>
          </div>
          <div className={`${s.item} ${s.active}`}>
            <img src="/assets/crypto/ico-chain-bsc.png" alt="" />
            <p>BSC Wallet</p>
          </div>
          <div className={`${s.item} ${s.disable}`}>
            <img src="/assets/crypto/ico-chain-polygon.png" alt="" />
            <p>Wallet Connect</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
