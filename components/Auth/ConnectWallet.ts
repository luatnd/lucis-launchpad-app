import Web3Modal from 'web3modal'
import {isClient} from "../../utils/DOM";

import WalletConnectProvider from '@walletconnect/web3-provider'
import {ChainNetwork, Wallet} from "../../utils/BlockChain";

const web3modalChainId2Network = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return 'mainnet'
    case 56:
      return 'binance'
    case 97:
      return 'binance_testnet'
    default:
      throw new Error(
        'web3modal__chainId2network: Not supported chain id: ' + chainId
      )
  }
}
// const requiredChainId = +process.env.NEXT_PUBLIC_REQUIRED_CHAIN_ID
const requiredChainId = 1

function getProviderOptions() {
  const providerOptions = {
    binancechainwallet: {
      package: true,
    },

    // Auto recognize your injected wallet: Metamask
    // injected: {},

    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: 'https://bsc-dataseed.binance.org/',
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        },

        // Select BSC work on Trust wallet but dont work on metamask
        // https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/providers/connectors/walletconnect.ts#L30
        // https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/helpers/utils.ts#L198
        // web3modal has not support BSC testnet yet (because Trust wallet not support it). To support chain 97: // directly add network to this file to tmp test: node_modules/web3modal/dist/index.js
        network: web3modalChainId2Network(requiredChainId),

        // This will turn on only some wallet for mobile
        qrcodeModalOptions: {
          mobileLinks: [
            'trust',
            'rainbow',
            'argent',
            'imtoken',
            'pillar',
            'bitpay',
            'coin98',
            'houbi',
            'safepal',
            // "metamask",
            // "kyberswap",
            // "orange",
            // "krystal",
          ],
        },
      },
    },
  }

  return providerOptions;
}




class WalletConnectService {
  // Support web3 connection
  web3Modal: any

  constructor() {

  }

  /**
   * Try to init the sdk to make user connect to his wallet
   */
  initFor(wallet: Wallet, network: ChainNetwork): Promise<any> {
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

  /**
   * Support ETH mainnet, rinkedby, BSC, BSC testnet, Polygon
   */
  private initWeb3() {
    const providerOptions = getProviderOptions();

    this.web3Modal = isClient
      ? new Web3Modal({
        cacheProvider: true,
        network: 'binance',
        providerOptions,
      })
      : null
  }

  private initNear() {

  }

  private connectMetamask(network: ChainNetwork) {
    return new Promise<any>((resolve, reject) => {
      reject("TODO: trigger metamask via web3 modal")
    })
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
}

export const AppWalletConnect = new WalletConnectService();
