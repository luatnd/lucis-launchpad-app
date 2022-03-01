import {ReactElement, useCallback, useEffect, useState} from "react";
import { Modal, Button, message } from 'antd';

import {ChainNetwork, NetworkSupportedWallets, Wallet} from "../../utils/blockchain/BlockChain";
import {ConnectWalletError, connectWalletHelper} from "./ConnectWalletHelper";

import s from './ConnectWallet.module.sass';
import GradientButton from '../Button/GradientButton';
import { isClient } from "../../utils/DOM";


type Props = {
  small?: boolean,
};
export default function ConnectWallet(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [network, setNetwork] = useState<ChainNetwork | null>(null);
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

  const changeWallet = useCallback(async (w: Wallet) => {
    /**
     * This will try to popup the wallet, then make a connection to your wallet
     * If success, it will set auth info to AuthStore
     */
    if (!network) {
      console.error("{changeWallet} ERROR: network is null")
      return
    }

    // TODO: Handle mobile
    connectWalletHelper.initFor(w, network!)
      .then(r => {
        console.log('{changeWallet} AppWalletConnect.initFor r: ', r);

        // If connect failed then => set wallet to null
        // If connect success then => set wallet to connected wallet
        const success = true; // TODO
        if (success) {
          setWallet(w);
        }

        // finally close the modal if success connect
        if (success) {
          setIsModalVisible(false);
        }
      })
      .catch(e => {
        console.error('{changeWallet} e: ', e.code, e.message, e);
        switch (e.message) {
          case ConnectWalletError.MetamaskNotInstalled:
            message.error(
              <span>
                [PC] Metamask extension is not installed. <br/>
                Please install it from <a href="https://metamask.io/download/">metamask.io</a>
              </span>,
              8,
            );
            break;
          case ConnectWalletError.UserRejected:
            message.error("You've rejected to do this action", 3);
            break;
          default:
            console.error("{changeWallet.initFor} Above error was not handled")
            break;
        }
      });
  }, [network]);

  const changeNetwork = useCallback(async (n: ChainNetwork) => {
    // check different before update is not required because react will do it
    // But if not check: we still get 1 more redundant render
    if (network !== n) {
      // change state
      setNetwork(n);

      // show list of suitable wallet for this network
      // Let UI do this
    }
  }, [network]);


  const supported_wallets = network === null ? [] : NetworkSupportedWallets[network];

  // @ts-ignored
  const predefined_wallets: Record<Wallet, ReactElement | null> = {
    [Wallet.metamask]: (
      <div
        key='metamask'
        onClick={() => changeWallet(Wallet.metamask)}
        className={`${s.item} ${wallet === Wallet.metamask ? s.active : ''}`}
      >
        <img src="/assets/crypto/ico-wallet-metamask.png" alt="" />
        <p>Metamask</p>
      </div>
    ),
    [Wallet.wc]: (
      <div
        key='wc'
        onClick={() => changeWallet(Wallet.wc)}
        className={`${s.item} ${wallet === Wallet.wc ? s.active : ''}`}
      >
        <img src="/assets/crypto/ico-wallet-wc.png" alt="" />
        <p>Wallet Connect</p>
      </div>
    ),
    [Wallet.bsc]: (
      <div
        key='bsc'
        className={`${s.item} ${s.disable} ${wallet === Wallet.bsc ? s.active : ''}`}
      >
        <img src="/assets/crypto/ico-chain-bsc.png" alt="" />
        <p>BSC Wallet</p>
      </div>
    ),
    [Wallet.near]: null,

    // NOTE: Remember to defined the wallet here if it exist in NetworkSupportedWallets
  }

  // NOTE: Comment this after done
  console.log('{ConnectWallet} rendered');

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
          <div onClick={() => changeNetwork(ChainNetwork.eth)} className={`${s.item} ${network === ChainNetwork.eth ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-eth.svg" alt="" />
            <p>Ethereum</p>
          </div>
          <div onClick={() => changeNetwork(ChainNetwork.bsc)} className={`${s.item} ${network === ChainNetwork.bsc ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-bsc.png" alt="" />
            <p>BSC</p>
          </div>
          <div onClick={() => changeNetwork(ChainNetwork.polygon)} className={`${s.item} ${network === ChainNetwork.polygon ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-polygon.png" alt="" />
            <p>Polygon</p>
          </div>
          <div className={`${s.item} ${s.disable} ${network === ChainNetwork.near ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-near.svg" alt="" />
            <p>NEAR</p>
          </div>
          <div className={`${s.item} ${s.disable} ${network === ChainNetwork.flow ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-flow.png" alt="" />
            <p>Flow</p>
          </div>
          <div className={`${s.item} ${s.disable} ${network === ChainNetwork.avax ? s.active : ''}`}>
            <img src="/assets/crypto/ico-chain-avax.svg" alt="" />
            <p>Avalanche</p>
          </div>
        </div>


        <p className={s.title}>2. Choose wallet</p>
        <div className={s.items} style={{justifyContent: "space-evenly"}}>
          {supported_wallets.map(i => predefined_wallets[i])}
        </div>
      </Modal>
    </div>
  );
}
