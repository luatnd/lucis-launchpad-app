import { useState } from "react";
import VerifyModal from "./VerifyModal/VerifyModal";
import s from "./index.module.sass";
import { Col, Row } from "antd";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  profile: any;
};

const Contact = ({ isEdit, setIsEdit, profile }: Props) => {
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const handleOpenVerifyModal = () => {
    setOpenVerifyModal(true);
  };

  const handleCloseVerifyModal = () => {
    setOpenVerifyModal(false);
  };

  const props = {
    handleCancel: handleCloseVerifyModal,
    handleOk: handleOpenVerifyModal,
    visible: openVerifyModal,
  };

  return (
    <>
      <div className={s.contactContainer}>
        <Row gutter={[10, 20]}>
          <Col span={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/phone.svg" alt="" />
              <span className="pl-0 md:pl-3">Phone</span>
            </div>
          </Col>
          <Col span={16}>
            <p>
              {profile && profile.me.profile.phone ? profile.me.profile.phone : "your phone number"}
            </p>
          </Col>

          <Col span={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/mail.svg" alt="" />
              <span className="pl-0 md:pl-3 ">Email</span>
            </div>
          </Col>
          <Col span={16}>
            {profile && profile.me.profile.email ? (
              <p>
                {profile.me.profile.emai}{" "}
                <button
                  className={`${s.verifyBtn} bg-gradient-1 md:ml-4`}
                  onClick={handleOpenVerifyModal}
                  disabled
                >
                  Verify
                </button>
              </p>
            ) : (
              <p>your.email@example.com</p>
            )}
          </Col>
        </Row>
        <VerifyModal {...props} />
      </div>
    </>
  );
};

export default Contact;
