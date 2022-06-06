import { Modal } from "antd";
import s from "./modal.module.sass";
import InputCode from "./InputCode";

type Props = {
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
};

const VerifyModal = (props: Props) => {
  const { handleOk, handleCancel, visible } = props;
  const verifyCodeLength = 5;

  return (
    <Modal
      visible={visible}
      className={`${s.verifyModal}`}
      onCancel={handleCancel}
      centered
      footer={""}
      closable={false}
    >
      <p>Mã OTP đã được gửi vào Email của ban!</p>
      <p>
        <strong>Nhập mã OTP</strong>
      </p>
      <InputCode length={verifyCodeLength} />
    </Modal>
  );
};

export default VerifyModal;
