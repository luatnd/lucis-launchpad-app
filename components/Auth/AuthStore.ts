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


export type TAuthInfo = AuthUser | AuthWallet;

class AuthStore {
  private _id?: number
  private _token?: string
  private _email?: string
  private _loyalty: TLoyalty = {
    level: 0,
    totalVolume: 0,
  }
  private _loading: boolean = false

  private _address?: string
  networkId?: number
  chainId?: number
  balance?: number

  public get isLoggedIn(): boolean {
    return !!this._token
  }

  constructor() {
    makeAutoObservable(this)
  }

  resetStates() {
    this._id = undefined
    this._id = undefined;
    this._token = undefined;
    this._email = undefined;
    this._loyalty = {
      level: 0,
      totalVolume: 0,
    };
    this._loading = false;
    this._address = undefined;
    this.networkId = undefined;
    this.chainId = undefined;
    this.balance = undefined;
  }

  setAuthUser(user: AuthUser) {
    this._id = user.id
    this._token = user.token
    this._email = user.email
    this._loyalty = user.loyalty!
  }


  /* ============= Getter & Setter ==============*/

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get token(): string | undefined {
    return this._token;
  }

  set token(value: string | undefined) {
    this._token = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get loyalty(): TLoyalty {
    return this._loyalty;
  }

  set loyalty(value: TLoyalty) {
    this._loyalty = value;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get address(): string | undefined {
    return this._address;
  }

  set address(value: string | undefined) {
    this._address = value;
  }
}


const s = new AuthStore();
if (isClient) {
  // @ts-ignore
  window.tmp__AuthStore = s;
}
export default s;
