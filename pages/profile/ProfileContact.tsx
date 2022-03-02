import { ChangeEvent, useState } from "react";
import VerifyModal from "./VerifyModal/VerifyModal";
import s from "./index.module.sass";
import { Col, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "hooks/profile/useMutationProfile";
import { WarningOutlined } from "@ant-design/icons";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  profile: any;
};

function validateEmail(email?: string) {
  if (email == null) {
    return;
  }
  var re = /\S+@\S+\.\S+/;
  return re.test(email.toLowerCase());
}

const Contact = ({ isEdit, setIsEdit, profile }: Props) => {
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [tempContact, setTempContact] = useState({
    phone: profile?.me.profile.phone,
    email: profile?.me.email,
  });
  const [validEmail, setValidEmail] = useState(
    validateEmail(profile?.me.email)
  );

  const { updateProfile, loading, error, data } = useMutationProfile();

  const handleOpenVerifyModal = () => {
    setOpenVerifyModal(true);
  };

  const handleCloseVerifyModal = () => {
    setOpenVerifyModal(false);
  };

  const handleBlur = (field: string) => {
    updateProfile({
      variables: {
        data: {
          [field]: {
            //@ts-ignore
            set: tempContact[field],
          },
        },
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    console.log(e.target.value);
    setTempContact({
      ...tempContact,
      [field]: e.target.value,
    });
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
            {isEdit ? (
              <Input
                value={tempContact.phone !== "" ? tempContact.phone : ""}
                onChange={(e) => handleChange(e, "phone")}
                onBlur={() => handleBlur("phone")}
                placeholder={"091xxx0909"}
              />
            ) : (
              <p>{tempContact.phone ? tempContact.phone : "Not available"}</p>
            )}
          </Col>

          <Col span={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/mail.svg" alt="" />
              <span className="pl-0 md:pl-3 ">Email</span>
            </div>
          </Col>
          <Col span={16}>
            {tempContact.email ? (
              <p>
                {tempContact.email}{" "}
                <button
                  className={`${s.verifyBtn} bg-gradient-1 md:ml-4`}
                  onClick={handleOpenVerifyModal}
                  disabled
                >
                  Verify
                </button>
              </p>
            ) : (
              <p>Not available</p>
            )}
          </Col>
        </Row>
        <VerifyModal {...props} />
      </div>
    </>
  );
};

export default Contact;
