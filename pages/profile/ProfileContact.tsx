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
              <span className="pl-3">Phone</span>
            </div>
          </Col>
          <Col span={16}>
            <p>{profile.me ? profile.me.profile.phone : ""}</p>
          </Col>

          <Col span={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/mail.svg" alt="" />
              <span className="pl-3 ">Email</span>
            </div>
          </Col>
          <Col span={16}>
            <p>
              {/* {me ? me.profile.email : ""}{" "}
              <button
                className={`${s.verifyBtn} bg-gradient-1`}
                onClick={handleOpenVerifyModal}
                disabled
              >
                Verify
              </button> */}
              {/* {!userProfile.verify && (
                <button
                  className={`${s.verifyBtn} bg-gradient-1`}
                  onClick={handleOpenVerifyModal}
                  disabled
                >
                  Verify
                </button>
              )} */}
            </p>
          </Col>
        </Row>
        <VerifyModal {...props} />
      </div>
    </>
  );
};

export default Contact;

// const handleBlur = () => {
//   updateProfile({
//     variables:{
//       data: {
//         "full_name": {
//           "set":
//         }
//       }
//     }
//   })

// }
