import ConnectWallet from './ConnectWallet';
import User from './User';


type Props = {
  small?: boolean,
};
export default function AuthBox(props: Props) {
  const isLoggedIn = false;
  return isLoggedIn
    ? <User />
    : <ConnectWallet small={props.small} />
}
