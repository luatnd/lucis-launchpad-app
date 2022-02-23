import { Modal } from "antd";
import s from "../index.module.sass";
import InputCode from "./InputCode";

type Props = {
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
};

const VerifyModal = (props: Props) => {
  const { handleOk, handleCancel, visible } = props;
  return (
    <Modal
      visible={visible}
      className={`${s.verifyModal}`}
      onCancel={handleCancel}
      centered
      footer={""}
      closable={false}
    >
      <InputCode length={5} />
    </Modal>
  );
};

export default VerifyModal;
