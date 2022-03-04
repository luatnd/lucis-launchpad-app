import { AuthUser } from "./AuthStore";
import { isClient } from "../../utils/DOM";
import { setAuthToken } from "../../utils/apollo_client";

export function setLocalAuthInfo(user: AuthUser): void {
  localStorage.setItem('user', window.btoa(JSON.stringify(user)))
}

export function getLocalAuthInfo(): AuthUser | null {
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

export function clearLocalAuthInfo(): void {
  localStorage.setItem('user', '')
}

export function debug__forceToken_LocalAuthInfo(token: string): void {
  const u = getLocalAuthInfo()!;
  u.token = token;
  setLocalAuthInfo(u)
}
if (isClient) {
  // @ts-ignore
  window.tmp__debug__forceToken_LocalAuthInfo = debug__forceToken_LocalAuthInfo;
}