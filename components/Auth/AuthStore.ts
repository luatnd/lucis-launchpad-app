import {IClientMeta} from '@walletconnect/types'
import {ethers} from 'ethers'
import {makeAutoObservable} from 'mobx'
import {to_hex_str} from 'utils/String'
import {isClient} from "../../utils/DOM";


type TLoyalty = {
  level: number
  totalVolume: number
}
export type AuthUser = {
  id?: number
  token?: string
  email?: string
  loyalty?: TLoyalty
  loading?: boolean
}
type AuthWallet = {
  address?: string
  networkId?: number
  chainId?: number
  balance?: number
}
type AuthWeb3Connection = {
  provider?: any
  web3Provider?: any
}


export type TAuthInfo = AuthUser | AuthWallet | AuthWeb3Connection

class AuthStore {
  id?: number
  token?: string
  email?: string
  loyalty: TLoyalty = {
    level: 0,
    totalVolume: 0,
  }
  loading: boolean = false

  address?: string
  networkId?: number
  chainId?: number
  balance?: number

  provider?: any
  web3Provider?: any

  public get isLoggedIn(): boolean {
    return !!this.token
  }

  constructor() {
    makeAutoObservable(this)
  }

  resetStates() {
    this.id = undefined
    this.id = undefined;
    this.token = undefined;
    this.email = undefined;
    this.loyalty = {
      level: 0,
      totalVolume: 0,
    };
    this.loading = false;
    this.address = undefined;
    this.networkId = undefined;
    this.chainId = undefined;
    this.balance = undefined;
    this.provider = undefined;
    this.web3Provider = undefined;
  }
}


const s = new AuthStore();
if (isClient) {
  // @ts-ignore
  window.tmp__AuthStore = s;
}
export default s;
