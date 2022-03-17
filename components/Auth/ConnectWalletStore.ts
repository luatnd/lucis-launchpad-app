import {IClientMeta} from '@walletconnect/types'
import {ethers} from 'ethers'
import { Network} from "@ethersproject/networks";
import {makeAutoObservable} from 'mobx'
import Web3Modal from "web3modal";

import {to_hex_str} from 'utils/String'
import {isClient} from "../../utils/DOM";
import {ChainNetwork} from "../../utils/blockchain/BlockChain";

interface IConnectWalletStore {
  address?: string
  network?: Network
  chainNetwork?: ChainNetwork
}

class ConnectWalletStore implements IConnectWalletStore {
  // common
  private _address?: string
  private _network?: Network
  private _chainNetwork?: ChainNetwork

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

  get chainNetwork(): ChainNetwork | undefined {
    return this._chainNetwork;
  }

  set chainNetwork(value: ChainNetwork | undefined) {
    this._chainNetwork = value;
  }

  constructor() {
    makeAutoObservable(this)
  }

  /**
   * Use this will trigger component re-render only once with observer()
   */
  setState(s: IConnectWalletStore) {
    s.address && (this._address = s.address)
    s.network && (this._network = s.network)
    s.chainNetwork && (this._chainNetwork = s.chainNetwork)
  }

  resetStates() {
    this._address = undefined;
    this._network = undefined;
    this._chainNetwork = undefined;
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

  isConnected: boolean,
  resetStates: () => void,
} = {
  provider: undefined,
  web3Provider: undefined,
  web3Modal: undefined,
  // signer: undefined, // Use when needed: const signer = web3Provider.getSigner()

  get isConnected(): boolean {
    return !!this.web3Provider
  },

  resetStates() {
    this.provider = undefined;
    this.web3Provider = undefined;
    this.web3Modal = undefined;
  }
}
