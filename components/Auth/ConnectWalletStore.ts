import {IClientMeta} from '@walletconnect/types'
import {ethers} from 'ethers'
import {makeAutoObservable} from 'mobx'
import {to_hex_str} from 'utils/String'
import {isClient} from "../../utils/DOM";


class ConnectWalletStore {
  // web3
  web3Modal?: any
  provider?: any
  web3Provider?: any

  // near
  // ..

  // solana
  // ..

  constructor() {
    makeAutoObservable(this)
  }

  resetStates() {
    this.provider = undefined;
    this.web3Provider = undefined;
  }
}

const s = new ConnectWalletStore();
if (isClient) {
  // @ts-ignore
  window.tmp__ConnectWalletStore = s;
}
export const reactive = s;

export const nonReactive: {
  provider?: any,
  web3Provider?: ethers.providers.Web3Provider,
} = {
  provider: undefined,
  web3Provider: undefined,
}
