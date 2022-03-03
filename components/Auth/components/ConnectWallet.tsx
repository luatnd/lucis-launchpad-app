import { ReactElement, useCallback, useState } from "react";
import { Button, message, Modal } from 'antd';
import { observer } from 'mobx-react-lite'

import AuthService, { AuthError } from "../AuthService";
import { ConnectWalletError, connectWalletHelper } from "../ConnectWalletHelper";
import ConnectWalletStore, { nonReactive as ConnectWalletStore_NonReactiveData } from "../ConnectWalletStore";
import AuthStore from "../AuthStore";
import { ChainNetwork, getChainNetworkFromChainId, NetworkSupportedWallets, Wallet } from "utils/blockchain/BlockChain";
import { trim_middle } from "utils/String";
import { getAppNetworkFriendlyName } from "utils/blockchain/ChainConfig";

import s from './ConnectWallet.module.sass';
import GradientButton from '../../Button/GradientButton';


type Props = {
  small?: boolean,
};
export default observer(function ConnectWallet(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [network, setNetwork] = useState<ChainNetwork | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const {
    address,
    network: connected_network
  } = ConnectWalletStore;

  const {
    isLoggedIn: logged_in_with_lucis,
    loading: authing,
  } = AuthStore;

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
      .then(async provider => {
        // console.log('{changeWallet} Wallet Connected: provider: ', provider);

        // add profile and switch the network
        const ensureActiveNetworkResult = await connectWalletHelper.web3_ensureActiveTargetChain(w, network)
        console.log('ensureActiveNetworkResult: ', ensureActiveNetworkResult);


        if (!ConnectWalletStore_NonReactiveData.web3Provider) {
          message.error(
            <span>Unexpected error happen (code: 6002)</span>,
            8,
          );
          return;
        }

        const web3Provider = ConnectWalletStore_NonReactiveData.web3Provider;
        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()
        const connected_network = await web3Provider.getNetwork()

        // Save to store
        ConnectWalletStore.network = connected_network;
        ConnectWalletStore.address = address;

        /**
         * In case of user connected to BSC network before
         * Then user choose ETH network => Cancel to switch to network => Still on BSC
         * => Need to alias the UI back to BSC
         */
        const n: ChainNetwork | undefined = getChainNetworkFromChainId(connected_network.chainId);
        if (n) {
          setNetwork(n)
        }

        // If connect failed then => set wallet to null
        // If connect success then => set wallet to connected wallet
        const success = !!address;
        if (success) {
          setWallet(w);
        }

        // finally close the modal if success verified
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
            message.error(
              <span>
                You've rejected to do this action.<br/>
                Or there's already a same pending request on your wallet.
              </span>,
              5,
            );
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
      setWallet(null); // reset collect wallet

      // show list of suitable wallet for this network
      // Let UI do this
    }
  }, [network]);

  const loginWithLucis = useCallback(async () => {
    /**
     * Web3 User need to link their wallet with Lucis system
     */
    if (!address) {
      message.error(
        <span>Wallet not connected properly, please connect wallet again</span>,
        3,
      );
      return;
    }

    AuthStore.loading = true;
    const authService = new AuthService();
    const r = await authService.login(address!);
    AuthStore.loading = false;
    console.log('{loginWithLucis.} r: ', r);

    switch (r.error) {
      case null:
        // Success
        // Already set the auth token to the AuthStore in AuthService
        message.error(
          <span>Successfully connect and verify your wallet</span>,
          5,
        );
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1000)
        break;

      case AuthError.UserDeniedMsgSignature:
        message.error(
          <span>User denied</span>,
          500,
        );
        break;

      default:
        message.error(
          <span>
            Cannot verify your address due to unhandled error.<br />
            It's might be the improper wallet connection
          </span>,
          5,
        );
    }
  }, [address]);


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
        <div className={s.items}>
          {supported_wallets.map(i => predefined_wallets[i])}
        </div>

        <p className={s.title}>3. Verify address</p>
        <div className={s.items} style={{display: "block", paddingLeft: 16}}>
          {!!wallet && <>
            <p>Address: {!address ? '' : trim_middle(address, 8, 8)}</p>
            <p>Network: {getAppNetworkFriendlyName(connected_network)}</p>
            {(address && logged_in_with_lucis)
              ? <Button type="primary" size="large" disabled>
                  <img src="/assets/UpComing/tick-done-2.svg" alt="" style={{padding: '0 6px 4px 0'}} />
                  Verified
                </Button>
              : <Button type="primary" size="large" onClick={loginWithLucis} loading={authing}>
                  Verify
                </Button>
            }
          </>}
        </div>

      </Modal>
    </div>
  );
})
