import { useState } from "react";
import VerifyModal from "./VerifyModal/VerifyModal";
import s from "./index.module.sass";
import { Col, Row } from "antd";

const userProfile = {
  fullName: "Nguyen Thi Kieu Oanh",
  id: "0x948d6D28D396Eae2F8c3459b092a85268B1bD96B",
  balance: 135,
  affilateId: "01234567989svfdv",
  phone: "0912345678",
  email: "anhcbt@lucis.network",
  facebook: "Lucis network",
  twitter: "Lucis network",
  discord: "Lucis channel",
  tele: "Lucis9999",
  verify: false,
};

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
};

const Contact = ({ isEdit, setIsEdit }: Props) => {
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
              <span className="sm:pl-3 lg:pl-8">Phone</span>
            </div>
          </Col>
          <Col span={16}>
            <p>{userProfile.phone}</p>
          </Col>

          <Col span={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/mail.svg" alt="" />
              <span className="sm:pl-3 lg:pl-8">Email</span>
            </div>
          </Col>
          <Col span={16}>
            <p>
              {userProfile.email}{" "}
              {!userProfile.verify && (
                <button
                  className={`${s.verifyBtn} bg-gradient-1`}
                  onClick={handleOpenVerifyModal}
                  disabled
                >
                  Verify
                </button>
              )}
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
