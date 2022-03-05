import { Col, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "components/Profile/Hooks/useMutationProfile";
import { useMutaionVerifyEmail } from "components/Profile/Hooks/useVerifyEmail";
import { ChangeEvent, useState } from "react";
import s from "../../pages/profile/index.module.sass";
import VerifyModal from "./VerifyModal/VerifyModal";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  profile: any;
  refetch: () => void;
};

function validateEmail(email?: string) {
  if (email == null) {
    return;
  }
  var re = /\S+@\S+\.\S+/;
  return re.test(email.toLowerCase());
}

const Contact = ({ isEdit, setIsEdit, profile, refetch }: Props) => {
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [tempContact, setTempContact] = useState({
    phone: profile?.me.profile.phone,
    email: profile?.me.email,
  });
  // const [validEmail, setValidEmail] = useState(validateEmail(profile?.me.email));

  const { updateProfile, loading, error, data } = useMutationProfile();
  const {
    verifyEmail,
    loading: verifyLoading,
    error: verifyError,
    data: verifyData,
  } = useMutaionVerifyEmail();

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

  // TODO: Handle logic after
  const handleBlurEmailInput = () => {
    verifyEmail({
      variables: {
        value: tempContact.email,
      },
    })
      .then((res) => {
        setValidEmail(true);
      })
      .catch((err) => {
        setValidEmail(false);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
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
      <div className={`${s.contactContainer}`}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="space-between">
          <Col xs={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/phone.svg" alt="" />
              <span className="pl-0 md:pl-3">Phone</span>
            </div>
          </Col>
          <Col xs={16}>
            {isEdit ? (
              <Input
                value={tempContact.phone !== "" ? tempContact.phone : ""}
                onChange={(e) => handleChange(e, "phone")}
                onBlur={() => handleBlur("phone")}
                placeholder={"091xxx0909"}
              />
            ) : (
              <p>{tempContact.phone ? tempContact.phone : "Invalid phone"}</p>
            )}
          </Col>

          <Col span={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/mail.svg" alt="" />
              <span className="pl-0 md:pl-3 ">Email</span>
            </div>
          </Col>
          <Col span={16}>
            {
              isEdit ? (
                <>
                  <Input
                    value={tempContact.email !== "" ? tempContact.email : ""}
                    onChange={(e) => handleChange(e, "email")}
                    onBlur={handleBlurEmailInput}
                    placeholder={"your.email@example.com"}
                  />
                  {!validEmail ? <p className={s.invalid}>Invalid email</p> : ""}
                </>
              ) : tempContact.email ? (
                validEmail ? (
                  <p>{tempContact.email}</p>
                ) : (
                  <p>{profile.me.email}</p>
                )
              ) : (
                <p>Invalid email address</p>
              )
              // <p>{tempContact.email ? tempContact.email : "Invalid email address"}</p>
            }
            {/* ----- TODO: Verify button */}
            {/* {tempContact.email ? (
              <p>
                {tempContact.email}
                <button
                  className={`${s.verifyBtn} bg-gradient-1 md:ml-4`}
                  onClick={handleOpenVerifyModal}
                  disabled
                >
                  Verify
                </button>
              </p>
            ) : (
              <p>Invalid email address</p>
            )} */}
          </Col>
        </Row>
        <VerifyModal {...props} />
      </div>
    </>
  );
};

export default Contact;
