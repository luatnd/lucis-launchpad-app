import { observer } from 'mobx-react-lite'
import { Button } from "antd";

import ConnectWalletStore from "../ConnectWalletStore";
import AuthStore from "../AuthStore";
import s from "./User.module.sass";
import { useCallback } from "react";
import AuthService from "../AuthService";


type Props = {};
export default  observer(function User(props: Props) {
  const {
    address,
    network: connected_network
  } = ConnectWalletStore;

  const {
    name,
  } = AuthStore;

  const disconnectWallet = useCallback(async () => {
    const authService = new AuthService();
    authService.logout();

    // TODO: Need clean wallet connection
  }, [])


  return (
    <div className={s.container}>
      <p>{name}</p>
      <p>ICON</p>
      <Button onClick={disconnectWallet}>Disconnect</Button>
    </div>
  )
})
