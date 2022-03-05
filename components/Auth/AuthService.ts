import { gql } from "@apollo/client";

import AuthStore, { AuthUser } from "./AuthStore";
import apoloClient, { setAuthToken as ApoloClient_setAuthToken } from 'utils/apollo_client'
import { to_hex_str, trim_middle } from "../../utils/String";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "./ConnectWalletStore";
import { Web3ProviderErrorCodes } from "./ConnectWalletHelper";
import { clearLocalAuthInfo, getLocalAuthInfo, setLocalAuthInfo } from "./AuthLocal";


export enum AuthError {
  Unknown = 'Unknown',
  UserDeniedMsgSignature = 'UserDeniedMsgSignature',
}

type LoginResponse = {
  error: AuthError | null,
}

export default class AuthService {

  async fetchUserData(): Promise<AuthUser> {
    const res = await apoloClient.mutate({
      mutation: gql`query {
          me {
              id
              address
              code
              email
              profile {
                  full_name
              }
          }
      }`,
      variables: {}
    })

    // .req({
    //   method: 'GET',
    //   url: '/user/get',
    // })
    const u = res.data.me
    const name = u.profile ? u.profile.full_name : '';
    const user: AuthUser = {
      id: u.id,
      code: u.code,
      address: u.address,
      email: u.email,
      name: !!name ? name : trim_middle(u.address, 6, 6),
    }

    return user
  }

  private async loginByAddress(address: string): Promise<AuthUser> {
    // TODO: add referal feature
    // const referral_code = Router.query.referralCode

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
    const nonce = nonceRes.data.generateNonce
    // console.log('{AuthService.loginByAddress} nonce: ', nonce);

    // TODO: Improve to multiline message with explanation and hello thank you
    const msg = `0x${to_hex_str(`Lucis verification ${nonce}`)}`
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
    // console.log('{loginByAddress} signed_hash: ', signed_hash);

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
    console.log('{AuthService.loginByAddress} loginRes: ', loginRes);

    const u = loginRes.data.login.user;
    const token = loginRes.data.login.token;

    if (address !== u.address) {
      throw new Error(`Invalid login address(${address}) vs user address(${u.address})`)
    }

    const name = u.profile ? u.profile.full_name : '';
    const user: AuthUser = {
      id: u.id,
      code: u.code,
      address: u.address,
      token: token,
      email: u.email,
      name: !!name ? name : trim_middle(u.address, 6, 6),
    }

    return user
  }

  /**
   *
   * @param address
   * @param delay Delay some duration before make change to the AuthStore,
   *              useful when you wanna show success for some secs before unmount the components
   */
  async login(address: string, delay = 1000): Promise<LoginResponse> {
    let res: LoginResponse = {
      error: null,
    };

    try {
      const token = getLocalAuthInfo()?.token
      if (token) {
        ApoloClient_setAuthToken(token)

        // re-login
        const user = await this.fetchUserData()
        console.log('{AuthService.login} re-login user: ', user);

        user.token = token; // fetchUserData does not have token

        setLocalAuthInfo(user)
        if (!delay) {
          AuthStore.setAuthUser(user);
        } else {
          setTimeout(() => {
            AuthStore.setAuthUser(user);
          }, delay)
        }

        return res
      } else {
        // new-login
        const user = await this.loginByAddress(address)
        console.log('{AuthService.login} new-login user: ', user);

        user.token && ApoloClient_setAuthToken(user.token)
        setLocalAuthInfo(user)
        if (!delay) {
          AuthStore.setAuthUser(user);
        } else {
          setTimeout(() => {
            AuthStore.setAuthUser(user);
          }, delay)
        }

        return res
      }
    } catch (e) {
      console.error('{login} e: ', e)

      /*
       Metamask error
       */
      // @ts-ignore
      switch (e.code) {
        case Web3ProviderErrorCodes.provider.userRejectedRequest:
          res.error = AuthError.UserDeniedMsgSignature;
          return res
      }

      /*
       Graphql error
       */


      res.error = AuthError.Unknown;
      return res
    }
  }

  logout() {
    ApoloClient_setAuthToken('')
    AuthStore.resetStates()
    clearLocalAuthInfo()
  }
}