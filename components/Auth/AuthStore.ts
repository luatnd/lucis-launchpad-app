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
  code?: string
  address?: string
  token?: string
  email?: string
  name?: string
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
  private _code?: string
  private _address?: string
  private _token?: string
  private _email?: string
  private _name?: string
  private _loyalty: TLoyalty = {
    level: 0,
    totalVolume: 0,
  }
  private _loading: boolean = false


  public get isLoggedIn(): boolean {
    return !!this._token
  }

  constructor() {
    makeAutoObservable(this)
  }

  resetStates() {
    this._id = undefined
    this._code = undefined;
    this._token = undefined;
    this._email = undefined;
    this._name = undefined;
    this._loyalty = {
      level: 0,
      totalVolume: 0,
    };
    this._loading = false;
  }

  setAuthUser(user: AuthUser) {
    this._id = user.id
    this._code = user.code
    this._address = user.address
    this._token = user.token
    this._email = user.email
    this._name = user.name
    this._loyalty = user.loyalty!
  }


  /* ============= Getter & Setter ==============*/

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get address(): string | undefined {
    return this._address;
  }

  set address(value: string | undefined) {
    this._address = value;
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

  get code(): string | undefined {
    return this._code;
  }

  set code(value: string | undefined) {
    this._code = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }
}


const s = new AuthStore();
if (isClient) {
  // @ts-ignore
  window.tmp__AuthStore = s;
}
export default s;
