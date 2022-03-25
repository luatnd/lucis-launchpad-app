import { Col, message, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "components/Profile/Hooks/useMutationProfile";
import { useMutaionVerifyEmail } from "components/Profile/Hooks/useVerifyEmail";
import { ChangeEvent, useState } from "react";
import s from "../../pages/profile/index.module.sass";
import VerifyModal from "./VerifyModal/VerifyModal";
import { observer } from "mobx-react-lite";
import AuthStore from "../Auth/AuthStore";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
};

// function validateEmail(email?: string) {
//   if (email == null) {
//     return;
//   }
//   var re = /\S+@\S+\.\S+/;
//   return re.test(email.toLowerCase());
// }

const Contact = ({ isEdit, setIsEdit }: Props) => {
  // const [validEmail, setValidEmail] = useState(true);
  const [isVerify, setIsVerify] = useState(false);

  const { phone, email } = AuthStore;

  const [tempContact, setTempContact] = useState({
    phone: phone ?? "",
    email: email ?? "",
  });

  const { updateProfile } = useMutationProfile();
  const { verifyEmail, verifyResult } = useMutaionVerifyEmail();

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
    })
      .then(() => {
        message.success("Update phone success");
      })
      .catch((err) => {
        message.error("Fail!");
        console.log("Error update phone: ", err);
      });
  };

  const handleVerifyEmail = () => {
    verifyEmail({ variables: { email: tempContact.email } })
      .then(() => {
        setIsVerify(false);
        message.success(
          <span>
            Verify email success <br /> Please check your email to confirm.
          </span>
        );
        AuthStore.phone = tempContact.phone;
      })
      .catch((err) => {
        message.error("Fail!");
        console.log("Error verify email: ", err);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setTempContact((prev) => ({ ...prev, [field]: e.target.value }));

    if (field === "email") {
      if (email !== e.target.value) {
        setIsVerify(true);
      } else {
        setIsVerify(false);
      }
    }
  };

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
              <Input
                value={tempContact.phone}
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
            {isEdit ? (
              <div className="flex">
                <Input
                  value={tempContact.email}
                  onChange={(e) => handleChange(e, "email")}
                  placeholder={"your.email@example.com"}
                />

                {isVerify && (
                  <button
                    className={`${s.verifyBtn} bg-gradient-1 md:ml-4 text-16px md:text-24px`}
                    // onClick={handleOpenVerifyModal}
                    onClick={handleVerifyEmail}
                    // disabled
                  >
                    Verify
                  </button>
                )}
              </div>
            ) : (
              <p>
                {!email
                  ? "Not available"
                  : verifyResult
                  ? tempContact.email
                  : email}
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

// verifyResult ? tempContact.email : email
