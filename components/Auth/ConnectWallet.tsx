import {useCallback, useEffect, useState} from "react";
import { Modal, Button } from 'antd';

import s from './ConnectWallet.module.sass';
import GradientButton from '../Button/GradientButton';
import {Chain, Wallet} from "../../utils/Chain";


type Props = {
  small?: boolean,
};
export default function Header(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chain, setChain] = useState<Chain | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

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
          <div onClick={() => setChain(Chain.eth)} className={`${s.item} ${chain === Chain.eth ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-eth.svg" alt="" />
            <p>Ethereum</p>
          </div>
          <div onClick={() => setChain(Chain.bsc)} className={`${s.item} ${chain === Chain.bsc ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-bsc.png" alt="" />
            <p>BSC</p>
          </div>
          <div onClick={() => setChain(Chain.polygon)} className={`${s.item} ${chain === Chain.polygon ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-polygon.png" alt="" />
            <p>Polygon</p>
          </div>
          <div className={`${s.item} ${s.disable} ${chain === Chain.near ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-near.svg" alt="" />
            <p>NEAR</p>
          </div>
          <div className={`${s.item} ${s.disable} ${chain === Chain.flow ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-flow.png" alt="" />
            <p>Flow</p>
          </div>
          <div className={`${s.item} ${s.disable} ${chain === Chain.avax ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-avax.svg" alt="" />
            <p>Avalanche</p>
          </div>
        </div>


        <p className={s.title}>2. Choose wallet</p>
        <div className={s.items}>
          <div onClick={() => setWallet(Wallet.metamask)} className={`${s.item} ${wallet === Wallet.metamask ? s.active : ''}`}>
            <img src="/assets/crypto/ico-wallet-metamask.png" alt="" />
            <p>Metamask</p>
          </div>
          <div onClick={() => setWallet(Wallet.wc)} className={`${s.item} ${wallet === Wallet.wc ? s.active : ''}`}>
            <img src="/assets/crypto/ico-wallet-wc.png" alt="" />
            <p>Wallet Connect</p>
          </div>
          <div className={`${s.item} ${s.disable} ${wallet === Wallet.bsc ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-bsc.png" alt="" />
            <p>BSC Wallet</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
