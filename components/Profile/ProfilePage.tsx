import { observer } from "mobx-react";
import AuthStore from "../Auth/AuthStore";
import InfoProfile from "./temp";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
};

export default observer(function ProfilPage({ isEdit, setIsEdit }: Props) {
  return <>{AuthStore.isLoggedIn ? <InfoProfile /> : ""}</>;
});
