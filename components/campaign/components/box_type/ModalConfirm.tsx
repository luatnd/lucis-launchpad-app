import Modal from "antd/lib/modal/Modal";
import { Maybe } from "graphql/jsutils/Maybe";
import s from "./GotProject.module.sass";

type Props = {
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
  boxName: Maybe<string> | undefined;
  chainIcon: Maybe<string> | undefined;
  price: string;
  amount: string;
  symbol: Maybe<string> | undefined;
};

const ModalConfirm = (props: Props) => {
  const { isModalVisible, handleOk, handleCancel, boxName, chainIcon, price, amount, symbol } =
    props;

  return (
    <Modal
      title="Buy order confirmation"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      <div>
        <p>Box name: {boxName}</p>
        <p>
          Chain: <img src={chainIcon ?? ""} alt="" />
        </p>
        <p>Amount: {amount}</p>
        <p>
          Total price: {Number(amount) * Number(price)} {symbol}
        </p>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
