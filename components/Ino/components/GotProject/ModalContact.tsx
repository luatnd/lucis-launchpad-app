import Modal from "antd/lib/modal/Modal";
import s from "./GotProject.module.sass";

type Props = {
  handleOk: () => void;
  handleCancel: () => void;
  isModalVisible: boolean;
};

const ModalContact = (props: Props) => {
  const { isModalVisible, handleOk, handleCancel } = props;
  return (
    <Modal
      title="Contact us"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <div>
        <p>
          Feel free to discuss more with us, just leave your content here and we'll reach you soon.
        </p>

        <p>Please send us the content in Telegram by clicking the below button.</p>
        <p>The content might follow this template:</p>

        <div
          style={{
            color: "#FFF",
            background: "rgba(63, 183, 219,0.5)",
            padding: "30px",
            borderRadius: "40px 40px 40px 0",
            fontSize: "smaller",
          }}
        >
          From: Alexander George
          <br />
          Proposal: Apply for INO
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non quam id libero pulvinar
          accumsan at eu est. Nulla faucibus nisi eget mattis cursus.
          <br />
        </div>
        <br />
        {/* <p style={{ color: "#00c4ff" }}>Note: Lucis network will never dm you first.</p> */}
      </div>

      <div className={s.btnChatContainer}>
        <a
          className={`${s.btnChat} text-[14px] md:text-[18px]`}
          href="https://t.me/lucislaunchpad_support"
          target="_blank"
          rel="noreferrer"
        >
          Chat with us <img src="/assets/UpComing/tele.svg" alt="" />
        </a>
        {/* <img src="/assets/MyProfile/teleChat.svg" alt="" /> */}
      </div>
    </Modal>
  );
};

export default ModalContact;
