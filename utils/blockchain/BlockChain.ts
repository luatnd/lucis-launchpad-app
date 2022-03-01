export enum ChainBranch {
  web3 = 'web3', // eth, bsc, polygon, ...
  near = 'near',
  polkadot = 'polkadot',
  solana = 'solana',
  // substrate?
  // octopus?
}

export enum ChainNetwork {
  eth = 'eth',
  bsc = 'bsc',
  polygon = 'polygon',
  avax = 'avax',
  flow = 'flow',
  near = 'near',
  polkadot = 'polkadot',
  solana = 'solana',
}

export const NetworkBranch = {
  [ChainNetwork.eth]: ChainBranch.web3,
  [ChainNetwork.bsc]: ChainBranch.web3,
  [ChainNetwork.polygon]: ChainBranch.web3,
  [ChainNetwork.avax]: ChainBranch.web3,
  [ChainNetwork.flow]: ChainBranch.web3,
  [ChainNetwork.near]: ChainBranch.near,
  [ChainNetwork.polkadot]: ChainBranch.polkadot,
  [ChainNetwork.solana]: ChainBranch.solana,
}

export enum Wallet {
  metamask = 'metamask',
  bsc = 'bsc', // binance wallet chrome extension
  c98 = 'c98', //
  wc = 'wc', // wallet connect

  near = 'near',
  polkadot_js = 'polkadot_js',
  solet = 'solet',
}

export const NetworkSupportedWallets: Record<ChainNetwork | string, Wallet[]> = {
  "null": [],

  [ChainNetwork.eth]: [Wallet.metamask, Wallet.wc, Wallet.bsc],
  [ChainNetwork.bsc]: [Wallet.metamask, Wallet.wc, Wallet.bsc],
  [ChainNetwork.polygon]: [Wallet.metamask, Wallet.wc],
  [ChainNetwork.avax]: [],
  [ChainNetwork.flow]: [],

  [ChainNetwork.near]: [Wallet.near],
  [ChainNetwork.polkadot]: [Wallet.polkadot_js],
  [ChainNetwork.solana]: [Wallet.solet],
}
