import Modal from "antd/lib/modal/Modal";
import { Maybe } from "graphql/jsutils/Maybe";
import { ChainSymbol, GChain } from "src/generated/graphql";
import s from "../Box/Box.module.sass";

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
  boxImg: Maybe<string> | undefined;
  chains: GChain[];
};

const ModalConfirm = (props: Props) => {
  const {
    isModalVisible,
    handleOk,
    handleCancel,
    boxName,
    chainIcon,
    price,
    amount,
    symbol,
    boxImg,
    chains,
  } = props;

  return (
    <Modal
      className={s.modalContainer}
      title={<strong>Buy order confirmation</strong>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Confirm"
      centered
    >
      <div>
        <img className="w-100px mb-4" src={boxImg ?? ""} alt="" />
        <p>Box name: {boxName}</p>
        {/* <p>
          Chain:{" "}
          {chainIcon.map((i, idx) => (
            <img
              className="w-20px lg:w-30px"
              key={idx}
              src={i.url}
              alt=""
              title={i.symbol}
            />
          ))}
        </p> */}
        <p>Chain: {chains.map((i) => i.symbol)}</p>
        <p>Amount: {amount}</p>
        <p>
          Total price: {Number(amount) * Number(price)} {symbol}
        </p>
        <p style={{ color: "#00c4ff" }}>
          Note: After confirmation, your balance will be deduced directly on
          your wallet. Please double check before confirming
        </p>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
