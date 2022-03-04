import { AuthUser } from "./AuthStore";

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
