import { ethers, providers } from 'ethers'

import { ensureTargetChain, initWeb3 } from "./Web3Modal";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "./ConnectWalletStore";
import {ChainNetwork, Wallet} from "../../utils/blockchain/BlockChain";
import { makeError } from "utils/Error";


export enum ConnectWalletError {
  MetamaskNotInstalled = 'MetamaskNotInstalled',
  UserRejected = 'UserRejected',
  AddNetworkProfileNotSupported = 'AddNetworkProfileNotSupported',
  SwitchChainNotSupported = 'SwitchChainNotSupported',
}

/**
 * copied from wallet connect
 */
export const Web3ProviderErrorCodes = {
  rpc: {
    invalidInput: -32e3,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603,
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901,
  },
}

class ConnectWalletHelper {
  // The data was store at ConnectWalletStore with reactive

  constructor() {

  }

  /**
   * Try to init the sdk to make user connect to his wallet
   *
   * Test cases PC:
   * - [x] browser dont have metamask
   * - [x] Click open metamask
   * - [x] Click connect while we have a metamask pending request already
   * - [x] user rejected to connect on metamask
   * - [ ] user rejected to connect on wc
   * - [x] Dont have profile => prompt to add profile
   * - [x] wrong chain => prompt to switch chain
   * - [ ] connect & disconnect while metamask is connected
   * - [ ] connect & disconnect while metamask is not connected
   * - [ ] user click disconnect on metamask while connected on the site
   *
   * Additional for Mobile:
   *
   */
  async connectWallet(wallet: Wallet, network: ChainNetwork): Promise<any> {
    switch (wallet) {
      case Wallet.metamask:
        return this.connectMetamask(network);
      case Wallet.wc:
        return this.connectWalletConnect(network);
      case Wallet.bsc:
        return this.connectBinanceWallet(network);
      default:
        return new Promise<any>((resolve, reject) => {
          reject("initFor: Unhandled wallet: " + wallet)
        })
    }
  }

  public web3_ensureActiveTargetChain(wallet: Wallet, network: ChainNetwork): Promise<boolean> {
    switch (wallet) {
      case Wallet.metamask:
        const chainId = this.getConfiguredChainId(network);
        return ensureTargetChain(chainId);

      default:
        return new Promise<boolean>((resolve, reject) => {
          reject(this.makeError(ConnectWalletError.SwitchChainNotSupported, ConnectWalletError.SwitchChainNotSupported))
        })
    }
  }

  public disconnectWallet(wallet: Wallet, network: ChainNetwork) {
    switch (wallet) {
      case Wallet.metamask:
        return this.disconnectMetamask(network);
      case Wallet.wc:
        return this.disconnectWalletConnect(network);
      case Wallet.bsc:
        return this.disconnectBinanceWallet(network);
      default:
        return new Promise<any>((resolve, reject) => {
          reject("disconnectWallet: Unhandled wallet: " + wallet)
        })
    }
  }

  /**
   * connect* funtion must fire this event on success
   */
  onConnectSuccess() {
    // Set AuthStore
  }

  /**
   * connect* funtion must fire this event on failed
   */
  onConnectFailed() {

  }

  //
  // private initNear() {
  //
  // }

  private makeError(code: string | number, msg: string): Error {
    return makeError(code, msg)
  }

  private connectMetamask(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      const isMetamask = window.ethereum && window.ethereum.isMetaMask;
      if (!isMetamask) {
        reject(this.makeError(ConnectWalletError.MetamaskNotInstalled, ConnectWalletError.MetamaskNotInstalled))
      }

      const requiredChainId = this.getConfiguredChainId(network)
      const web3Modal = initWeb3(requiredChainId)! // this was ensured to run only on client

      web3Modal.connectTo("injected")
        .then(provider => {
          const web3Provider = new providers.Web3Provider(provider, 'any')
          ConnectWalletStore_NonReactiveData.provider = provider;
          ConnectWalletStore_NonReactiveData.web3Provider = web3Provider;
          ConnectWalletStore_NonReactiveData.web3Modal = web3Modal;

          resolve(provider)
        })
        .catch(e => {
          // console.log('{ConnectWalletHelper.connectTo} e: ', e);
          /**
           * NOTE: Web3Modal does not retain the error.code from metamask
           * It's all consider "User Rejected" error
           */
          if (e.message === "User Rejected") {
            reject(this.makeError(Web3ProviderErrorCodes.provider.userRejectedRequest, ConnectWalletError.UserRejected))
          }
        })
    })
  }

  private connectC98Wallet(network: ChainNetwork) {

  }

  private connectWalletConnect(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO: trigger wc via web3 modal")
    })
  }

  private connectBinanceWallet(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO")
    })
  }

  private disconnectMetamask(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO")
    })
  }

  private disconnectWalletConnect(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO")
    })
  }

  private disconnectBinanceWallet(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO")
    })
  }


  private getConfiguredChainId(network: ChainNetwork): number {
    let requiredChainId: number;
    switch (network) {
      case ChainNetwork.eth:
        requiredChainId = parseInt('' + process.env.NEXT_PUBLIC_CHAIN_ID__ETH);
        break;
      case ChainNetwork.polygon:
        requiredChainId = parseInt('' + process.env.NEXT_PUBLIC_CHAIN_ID__POLYGON);
        break;
      case ChainNetwork.bsc:
        requiredChainId = parseInt('' + process.env.NEXT_PUBLIC_CHAIN_ID__BSC);
        console.log('{ConnectWalletHelper.getConfiguredChainId} process.env.NEXT_PUBLIC_CHAIN_ID__BSC: ', process.env.NEXT_PUBLIC_CHAIN_ID__BSC, requiredChainId);
        break;
      default:
        // @ts-ignore
        throw new Error(`requiredChainId was not handled for network ${network}, please add new case`)
    }

    if (!requiredChainId) {
      throw new Error(`requiredChainId was not configured for network ${network}, please check .env`)
    }

    return requiredChainId;
  }
}

export const connectWalletHelper = new ConnectWalletHelper();
