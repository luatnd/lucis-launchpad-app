import { observer } from "mobx-react" // Or "mobx-react".

import ConnectWallet from './ConnectWallet';
import User from './User';
import AuthStore from "../AuthStore";
import ConnectWalletModal from "./ConnectWalletModal";


type Props = {
  small?: boolean,
};
export default observer((props: Props) => {
  return (
    <>
      {AuthStore.isLoggedIn
        ? <User />
        : <ConnectWallet small={props.small} />
      }

      <ConnectWalletModal />
    </>
  )
})
