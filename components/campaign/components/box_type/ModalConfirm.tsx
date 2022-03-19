import Modal from "antd/lib/modal/Modal";
import { Maybe } from "graphql/jsutils/Maybe";
import { ChainSymbol } from "src/generated/graphql";

type ChainProps = {
  url: string;
  symbol: ChainSymbol;
};

type Props = {
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
  boxName: Maybe<string> | undefined;
  chainIcon: ChainProps[];
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
      okText="Confirm"
      centered
    >
      <div>
        <p>Box name: {boxName}</p>
        <p>
          Chain:{" "}
          {chainIcon.map((i, idx) => (
            <img className="w-20px lg:w-30px" key={idx} src={i.url} alt="" title={i.symbol} />
          ))}
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
