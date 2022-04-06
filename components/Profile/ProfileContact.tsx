import { Col, message, Row } from "antd";
import Input, { PhoneInput } from "components/Input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import s from "../../pages/profile/index.module.sass";
import VerifyModal from "./VerifyModal/VerifyModal";
import { observer } from "mobx-react-lite";
import AuthStore from "../Auth/AuthStore";
import { useMutaionVerifyEmail } from "hooks/profile/useVerifyEmail";
import { useMutationProfile } from "hooks/profile/useMutationProfile";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/material.css";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
};

function validateEmail(email?: string) {
  if (email == null) {
    return;
  }
  const re = /\S+@\S+\.\S+/;
  return re.test(email.toLowerCase());
}

// function validatePhone(phone?: string) {
//   if (phone == null) {
//     return;
//   }
//   const re = /^\d{10}$/;
//   return re.test(phone);
// }

const Contact = ({ isEdit, setIsEdit }: Props) => {
  const [isValidInfo, setIsValidInfo] = useState({
    phone: true,
    email: true,
  });
  // const [isUpdatePhoneSuccess, setIsUpdatePhoneSuccess] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [disableVerify, setDisableVerify] = useState(false);
  const { phone, email } = AuthStore;
  const [countryCode, setCountryCode] = useState("");

  const [tempContact, setTempContact] = useState({
    phone: phone ?? "",
    email: email ?? "",
  });

  const { updateProfile } = useMutationProfile();
  const { verifyEmail, verifyResult } = useMutaionVerifyEmail();

  const handleUpdate = (field: string) => {
    //@ts-ignore
    if (isValidInfo[field]) {
      updateProfile({
        variables: {
          data: {
            [field]: {
              //@ts-ignore
              set: tempContact[field],
            },
          },
        },
      }).catch((err) => {
        message.error(err.message);
      });
    }
  };

  const handleVerifyEmail = () => {
    verifyEmail({ variables: { email: tempContact.email } })
      .then(() => {
        setDisableVerify(true);
        setTimeout(() => setDisableVerify(false), 300000);
        message.success(<span>Please check your email to confirm.</span>);
        AuthStore.email = tempContact.email;
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setTempContact({ ...tempContact, email: e.target.value });

    email !== e.target.value ? setIsVerify(true) : setIsVerify(false);

    validateEmail(e.target.value)
      ? setIsValidInfo({ ...isValidInfo, email: true })
      : setIsValidInfo({ ...isValidInfo, email: false });

    // if (email !== e.target.value) {
    //   setIsVerify(true);
    // } else {
    //   setIsVerify(false);
    // }

    // if (field === "email") {
    //   validateEmail(e.target.value)
    //     ? setIsValidInfo({ ...isValidInfo, email: true })
    //     : setIsValidInfo({ ...isValidInfo, email: false });
    // }
  };

  const handleChangePhone = (e: string) => {
    setTempContact({
      ...tempContact,
      phone: e,
    });
  };

  useEffect(() => {
    fetch("http://ip-api.com/json")
      .then((res) => res.json())
      .then((data) => setCountryCode(data.countryCode));
  }, []);

  return (
    <>
      <div className={`${s.contactContainer}`}>
        <Row
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
          justify="space-between"
        >
          <Col xs={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/phone.svg" alt="" />
              <span className="pl-0 md:pl-3">Phone</span>
            </div>
          </Col>
          <Col xs={16}>
            {isEdit ? (
              <>
                {/* <Input
                  value={tempContact.phone}
                  onChange={(e) => handleChange(e, "phone")}
                  onBlur={() => handleBlur("phone")}
                  placeholder={"091xxx0909"}
                  name="phone"
                /> */}
                <PhoneInput
                  countryCode={countryCode}
                  value={tempContact.phone}
                  onChange={handleChangePhone}
                  onBlur={() => handleUpdate("phone")}
                  placeholder={"091xxx0909"}
                  name="phone"
                />

                {!isValidInfo.phone && (
                  <p className={`${s.invalid}`}>Invalid phone number</p>
                )}
              </>
            ) : (
              // <p>{tempContact.phone ? tempContact.phone : "Not available"}</p>
              <p>
                {/* {isUpdatePhoneSuccess
                  ? tempContact.phone
                  : tempContact.phone
                  ? phone
                  : "Not available"} */}
              </p>
            )}
          </Col>

          <Col span={8}>
            <div className={s.title}>
              <img src="/assets/MyProfile/mail.svg" alt="" />
              <span className="pl-0 md:pl-3 ">Email</span>
            </div>
          </Col>
          <Col span={16}>
            {isEdit ? (
              <>
                <div className="flex items-center">
                  <Input
                    value={tempContact.email}
                    onChange={handleChangeEmail}
                    placeholder={"your.email@example.com"}
                    name="email"
                    // onChange={(e) => handleChangeEmail(e, "email")}
                    // onBlur={() => handleBlur("phone")}
                    // valid={isValidEmail}
                  />

                  {isVerify && (
                    <button
                      className={`${s.verifyBtn} bg-gradient-1 md:ml-4 text-16px md:text-24px`}
                      onClick={handleVerifyEmail}
                      disabled={disableVerify}
                      // onClick={handleOpenVerifyModal}
                      // disabled={!isValidInfo.email}
                    >
                      Verify
                    </button>
                  )}
                </div>
                {!isValidInfo.email && (
                  <p className={s.invalid}>Invalid Email</p>
                )}
              </>
            ) : (
              <p>
                {tempContact.email && isValidInfo.email
                  ? tempContact.email
                  : !isValidInfo.email
                  ? email
                  : "Not available"}
              </p>
            )}
          </Col>
        </Row>
        {/* <VerifyModal {...props} /> */}
      </div>
    </>
  );
};

export default observer(Contact);
