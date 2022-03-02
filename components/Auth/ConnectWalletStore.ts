import {IClientMeta} from '@walletconnect/types'
import {ethers} from 'ethers'
import { Network} from "@ethersproject/networks";
import {makeAutoObservable} from 'mobx'
import {to_hex_str} from 'utils/String'
import {isClient} from "../../utils/DOM";


class ConnectWalletStore {
  // common
  private _address?: string
  private _network?: Network

  // web3
  web3Modal?: any
  provider?: any
  web3Provider?: any

  // near
  // ..

  // solana
  // ..

  get address(): string | undefined {
    return this._address;
  }

  set address(value: string | undefined) {
    this._address = value;
  }

  get network(): Network | undefined {
    return this._network;
  }

  set network(value: Network | undefined) {
    this._network = value;
  }

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

// default is reactive data
export default s;

export const nonReactive: {
  provider?: any,
  web3Provider?: ethers.providers.Web3Provider,
} = {
  provider: undefined,
  web3Provider: undefined,
  // signer: undefined, // Use when needed: const signer = web3Provider.getSigner()
}
