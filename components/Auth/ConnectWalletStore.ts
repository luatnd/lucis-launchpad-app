import {IClientMeta} from '@walletconnect/types'
import {ethers} from 'ethers'
import { Network} from "@ethersproject/networks";
import {makeAutoObservable} from 'mobx'
import Web3Modal from "web3modal";

import {to_hex_str} from 'utils/String'
import {isClient} from "../../utils/DOM";


class ConnectWalletStore {
  // common
  private _address?: string
  private _network?: Network

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
    this._address = undefined;
    this._network = undefined;
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
  web3Modal?: Web3Modal,

  resetStates: () => void,
} = {
  provider: undefined,
  web3Provider: undefined,
  web3Modal: undefined,
  // signer: undefined, // Use when needed: const signer = web3Provider.getSigner()

  resetStates() {
    this.provider = undefined;
    this.web3Provider = undefined;
    this.web3Modal = undefined;
  }
}
