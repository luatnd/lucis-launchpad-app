import Web3Modal from 'web3modal'
import {isClient} from "../../utils/DOM";

import WalletConnectProvider from '@walletconnect/web3-provider'


/**
 * Support ETH mainnet, rinkedby, BSC, BSC testnet, Polygon
 */
export function initWeb3(chainIdNumeric: number): Web3Modal | undefined {
  if (!isClient) {
    return undefined
  }

  const providerOptions = _getProviderOptions(chainIdNumeric);
  return new Web3Modal({
    cacheProvider: true,
    // network: 'binance',
    providerOptions,
  })
}


function _getProviderOptions(chainIdNumeric: number) {
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

          // TODO: configure for binance into a files
          1: 'https://bsc-dataseed.binance.org/',
          2: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          3: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        },

        // Select BSC work on Trust wallet but dont work on metamask
        // https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/providers/connectors/walletconnect.ts#L30
        // https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/helpers/utils.ts#L198
        // web3modal has not support BSC testnet yet (because Trust wallet not support it). To support chain 97: // directly add network to this file to tmp test: node_modules/web3modal/dist/index.js
        network: _chainId2Network(chainIdNumeric),

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
            // "metamask", // TODO: Enable metamask if it's work, currently it's have connection bugs
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

function _chainId2Network(chainId: number): string {
  switch (chainId) {
    case 1:
      return 'mainnet'
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 56:
      return 'binance'
    case 97:
      return 'binance_testnet'
    case 137:
      return 'polygon' // TODO: Test this
    default:
      throw new Error(
        'Web3Modal.js__chainId2network: Not supported chain id: ' + chainId
      )
  }
}
