import { toDict } from 'utils/Array'

export interface IAssetData {
  symbol: string
  name: string
  decimals: string
  contractAddress: string
  balance?: string
}

export interface IChainData {
  name: string
  short_name: string
  chain: string
  network: string
  chain_id: number
  network_id: number
  rpc_url: string
  native_currency: IAssetData
  blockExplorerUrls?: string[]
  iconUrls?: string[]
}

export const BSC_MainNet: IChainData = {
  name: 'BSC MainNet',
  short_name: 'bsc',
  chain: 'smartchain',
  network: 'mainnet',
  chain_id: 56,
  network_id: 56,
  rpc_url: 'https://bsc-dataseed.binance.org/',
  blockExplorerUrls: ['https://bscscan.com'],
  native_currency: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: '18',
    contractAddress: '',
    balance: '',
  },
}

export const BSC_TestNet: IChainData = {
  name: 'BSC TestNet',
  short_name: 'bsc_testnet',
  chain: 'smartchain',
  network: 'testnet',
  chain_id: 97,
  network_id: 97,
  rpc_url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  blockExplorerUrls: ['https://testnet.bscscan.com'],
  native_currency: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: '18',
    contractAddress: '',
    balance: '',
  },
}

const chainProfiles: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Ropsten',
    short_name: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chain_id: 3,
    network_id: 3,
    rpc_url: 'https://ropsten.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Rinkeby',
    short_name: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chain_id: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Görli',
    short_name: 'gor',
    chain: 'ETH',
    network: 'goerli',
    chain_id: 5,
    network_id: 5,
    rpc_url: 'https://goerli.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Kovan',
    short_name: 'kov',
    chain: 'ETH',
    network: 'kovan',
    chain_id: 42,
    network_id: 42,
    rpc_url: 'https://kovan.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Classic Mainnet',
    short_name: 'etc',
    chain: 'ETC',
    network: 'mainnet',
    chain_id: 61,
    network_id: 1,
    rpc_url: 'https://ethereumclassic.network',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  BSC_MainNet,
  BSC_TestNet,
  {
    name: 'Polygon',
    short_name: 'pol',
    chain: 'MATIC',
    network: 'mainnet',
    chain_id: 137,
    network_id: 137,
    rpc_url: 'https://polygon-rpc.com',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
]

export default chainProfiles

export const chainProfilesIndexed: Record<number, IChainData> = toDict(
  chainProfiles,
  'chain_id'
)

interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

export function convertIChainData2ChainParameter(
  c: IChainData
): AddEthereumChainParameter {
  return {
    chainId: '0x' + c.chain_id.toString(16), // A 0x-prefixed hexadecimal string
    chainName: c.name,
    nativeCurrency: {
      name: c.native_currency.name,
      symbol: c.native_currency.symbol, // 2-6 characters long
      decimals: parseInt(c.native_currency.decimals),
    },
    rpcUrls: [c.rpc_url],
    blockExplorerUrls: c.blockExplorerUrls,
    iconUrls: c.iconUrls, // Currently ignored.
  }
}