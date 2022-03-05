import { Button, message, Modal } from "antd";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Network } from "@ethersproject/networks";

import { ChainNetwork, getChainNetworkFromChainId, NetworkSupportedWallets, Wallet } from "utils/blockchain/BlockChain";
import s from "./ConnectWallet.module.sass";
import { trim_middle } from "utils/String";
import { getAppNetworkFriendlyName } from "utils/blockchain/ChainConfig";
import { observer } from "mobx-react-lite";
import ConnectWalletStore, { nonReactive as ConnectWalletStore_NonReactiveData } from "../ConnectWalletStore";
import AuthStore from "../AuthStore";
import { ConnectWalletError, connectWalletHelper } from "../ConnectWalletHelper";
import AuthService, { AuthError } from "../AuthService";
import AuthBoxStore from "./AuthBoxStore";
import { AppEmitter } from "../../../services/emitter";


type Props = {};
export default observer(function ConnectWalletModal(props: Props) {
  const [network, setNetwork] = useState<ChainNetwork | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const
    isModalVisible = AuthBoxStore.connectModalVisible,
    setIsModalVisible = (v: boolean) => AuthBoxStore.connectModalVisible = v
  ;

  const {
    address,
    network: connected_network
  } = ConnectWalletStore;

  const {
    isLoggedIn: logged_in_with_lucis,
    loading: authing,
  } = AuthStore;

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
    connectWalletHelper.connectWallet(w, network!)
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
    const r = await authService.login(address!, 0);
    AuthStore.loading = false;
    console.log('{loginWithLucis.} r: ', r);

    switch (r.error) {
      case null:
        // Success
        // Already set the auth token to the AuthStore in AuthService
        message.success(
          <span>Successfully connect and verify your wallet</span>,
          5,
        );
        AuthBoxStore.verified = true;
        setTimeout(() => {
          setIsModalVisible(false);
        }, 2000)
        break;

      case AuthError.UserDeniedMsgSignature:
        message.error(
          <span>User denied</span>,
          5,
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


  const disconnectWallet = useCallback(async () => {
    // reset UI
    setNetwork(null)
    setWallet(null)

    const provider = ConnectWalletStore_NonReactiveData.provider
    const web3Modal = ConnectWalletStore_NonReactiveData.web3Modal!

    console.log('{disconnectWallet} provider: ', provider, provider.isMetaMask)
    console.log('{disconnectWallet} cachedProvider: ', web3Modal, web3Modal.cachedProvider)

    // remove provider cache in browser
    await web3Modal.clearCachedProvider()

    // disconnect wallet:
    // this is not for metamask, it's for sth else?
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect()
    } else {
      console.warn('{disconnectWallet} cannot trigger provider.disconnect()')
    }

    setTimeout(() => {
      ConnectWalletStore.resetStates();
      ConnectWalletStore_NonReactiveData.resetStates();
    }, 200);
  }, [])

  useEffect(() => {
    const listener = AppEmitter.addListener('onWalletDisconnect', disconnectWallet)
    return () => {
      listener.remove()
    }
  }, [])


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



  return <Modal
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
    <div className={`${s.items} ${s.verifyC}`} style={{display: "block", paddingLeft: 16}}>
      {!!wallet && <>
        <p>Address: {!address ? '' : trim_middle(address, 10, 10)}</p>
        <p>Network: {getAppNetworkFriendlyName(connected_network)}</p>
        {(address && logged_in_with_lucis)
          ? <Button type="primary" size="large" disabled>
            <img src="/assets/UpComing/tick-done-2.svg" alt="" style={{padding: '0 6px 4px 0'}} />
            Verified
          </Button>
          : <>
            <Button type="primary" size="large" onClick={loginWithLucis} loading={authing}>
              Verify
            </Button>
            {authing && <p className={s.note}>Please do confirm on your wallet</p>}
          </>

        }
      </>}
    </div>

  </Modal>;
})
