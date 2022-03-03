import { gql } from "@apollo/client";

import { AuthUser } from "./AuthStore";
import apoloClient, { setAuthToken as ApoloClient_setAuthToken } from 'utils/apollo_client'
import { to_hex_str } from "../../utils/String";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "./ConnectWalletStore";
import { Web3ProviderErrorCodes } from "./ConnectWalletHelper";


export enum AuthError {
  UserDeniedMsgSignature = 'UserDeniedMsgSignature',
}

type LoginResponse = {
  error: AuthError | null,
}

export default class AuthService {
  setAuthInfo(user: AuthUser): void {
    localStorage.setItem('user', window.btoa(JSON.stringify(user)))
  }

  getAuthInfo(): AuthUser | null {
    try {
      const user_encoded = localStorage.getItem('user')
      if (typeof user_encoded === "string") {
        const user_plaintext = window.atob(user_encoded)
        return JSON.parse(user_plaintext)
      }

      return null
    } catch (e) {
      return null
    }
  }

  clearAuthInfo(): void {
    localStorage.setItem('user', '')
  }

  async fetchUserData(): Promise<any> {
    const variables = {
      address: "test"
    };
    const res = await apoloClient.mutate({
      mutation: gql`mutation ($address: String!) {
          generateNonce(address: $address)
      }`,
      variables
    })

    // .req({
    //   method: 'GET',
    //   url: '/user/get',
    // })
    const u = res.data.data
    const user = {
      id: u.id,
      address: u.address,
      networkChainId: 'TODO:', // this.network.chainId,
      token: res.data.token,
      email: u.email,
      referralCode: u.referral_code,
      loyalty: {
        level: u.loyalty_level,
        totalVolume: u.total_volume,
      },
    }
    return user
  }

  private async loginByAddress(address: string) {
    // TODO: add referal feature
    // const referral_code = Router.query.referralCode

    const sign_content = 'Lucis sign' // Future: Lucis verification
    // const signer = contract.getSigner()
    // const address = await signer.getAddress()


    // const nonceRes = await apiClient.req({
    //   method: 'GET',
    //   url: '/auth/get_nonce?address=' + address,
    // })
    // const nonce = nonceRes.data.data.nonce
    const nonceRes = await apoloClient.mutate({
      mutation: gql`mutation ($address: String!) {
          generateNonce(address: $address)
      }`,
      variables: {
        address: address
      }
    })
    console.log('{AuthService.loginByAddress} nonceRes: ', nonceRes);
    const nonce = nonceRes.data
    console.log('{AuthService.loginByAddress} nonce: ', nonce);

    const msg = `0x${to_hex_str([sign_content, nonce].join(' '))}`
    const params = [msg, address, nonce]

    /**
     * window.ethereum is for web3 injected like metamask only
     * IF you wanna support multiple wallet (including mobile wallet),
     * you need to use a universal abstract provider from web3provider
     */
    /*
    console.log('{loginByAddress} : ', params);
    const signed_hash = await window.ethereum.request({
      method: 'personal_sign',
      params: params,
    })
    const provider = getWcProvider(signer);
    const signed_hash = await provider.request({
      method: 'personal_sign',
      params: params,
    })
    */
    const web3Provider = ConnectWalletStore_NonReactiveData.web3Provider;
    const signed_hash = await web3Provider?.send('personal_sign', params)
    // console.log('{loginByAddress} done: ', signed_hash);

    // const loginRes = await apiClient.req({
    //   method: 'POST',
    //   url: '/auth/login',
    //   data: { address: address, sign: signed_hash, referral_code },
    // })
    const loginRes = await apoloClient.mutate({
      mutation: gql`mutation login($address: String!, $sign: String!) {
          login(address: $address, sign: $sign) {
              token
              user {
                  id
                  address
                  code
                  email
                  profile {
                      full_name
                  }
              }
          }
      }`,
      variables: {
        address,
        sign: signed_hash
      }
    })
    const u = loginRes.data.user;
    // TODO:
    const user = {
      id: u.id,
      // address: u.address,
      // networkChainId: "TODO",
      // token: loginRes.data.data.token,
      // email: u.email,
      // referralCode: u.referral_code,
      // loyalty: {
      //   level: u.loyalty_level,
      //   totalVolume: u.total_volume,
      // },
    }

    return user
  }

  async login(address: string): Promise<LoginResponse> {
    let res: LoginResponse = {
      error: null,
    };

    try {
      // NOTE: Change internal state without reactive
      // this.address = address

      const token = this.getAuthInfo()?.token
      if (
        token
        // && address.toLowerCase() === ('' + this.address).toLowerCase()
      ) {
        // re-login
        ApoloClient_setAuthToken(token)
        const user = await this.fetchUserData()
        console.log('{AuthService.login} user: ', user);

        // user.token = token // NOTE: Api do not have token returned
        this.setAuthInfo(user)
        // this.email = user.email
        // this.referralCode = user.referralCode
        // this.showVerify = !user.email
        // this.loyalty = user.loyalty
        // this.setToken(token)

        return res
      } else {
        // new-login
        const user = await this.loginByAddress(address)
        console.log('{AuthService.login} user: ', user);

        // TODO:
        // ApoloClient_setAuthToken(user?.token)
        // this.setAuthInfo(user)

        // this.email = user.email
        // this.referralCode = user.referralCode
        // this.showVerify = !user.email
        // this.loyalty = user.loyalty
        // this.setToken(user?.token)

        return res
      }
    } catch (e) {
      console.log('{login} e: ', e)

      // @ts-ignore
      switch (e.code) {
        case Web3ProviderErrorCodes.provider.userRejectedRequest:
          res.error = AuthError.UserDeniedMsgSignature;
          return res
      }

      return res
    }
  }

  logout() {
    // TODO:
    // apiClient.applyAuth(null)
    // this.clearAuthInfo()
    // this.resetStates()
  }
}