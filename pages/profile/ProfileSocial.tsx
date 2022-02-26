import s from "./index.module.sass";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { Col, Modal, Row } from "antd";
import InputCode from "./VerifyModal/InputCode";
import VerifyModal from "./VerifyModal/VerifyModal";
import Input from "components/Input/Input";
import { useMutationProfile } from "hooks/profile/useMutationProfile";

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
  profile: any;
};

const Social = ({ isEdit, setIsEdit, profile }: Props) => {
  const { updateProfile, loading, error, data } = useMutationProfile();

  const [tempSocial, setTempSocial] = useState({
    facebook: profile.me?.profile.facebook,
    discord: profile.me?.profile.discord,
    twitter: profile.me?.profile.twitter,
    telegram: profile.me?.profile.telegram,
  });

  const handleBlur = (field: string) => {
    console.log(field);
    updateProfile({
      variables: {
        data: {
          [field]: {
            //@ts-ignore
            set: tempSocial[field],
          },
        },
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    console.log(e.target.value);
    setTempSocial({
      ...tempSocial,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <div className={`${s.box} sm:my-3 md:my-7`}>
        <div className={s.wrapper}>
          <Row>
            <Col span={8}>
              <div className={s.title}>
                {/* <img src={} alt="" /> */}
                <img src="/assets/MyProfile/social.svg" alt="" />
                <span className="pl-3">Social</span>
              </div>
            </Col>
            <Col span={16}>
              <div className={s.social}>
                <a>
                  <img src="/assets/MyProfile/fb.svg" alt="" />
                  {isEdit ? (
                    <Input
                      value={tempSocial.facebook ? tempSocial.facebook : ""}
                      onChange={(e) => handleChange(e, "facebook")}
                      onBlur={() => handleBlur("facebook")}
                    />
                  ) : (
                    <p>{tempSocial.facebook ? tempSocial.facebook : "Not available"}</p>
                  )}
                </a>

                <a className="my-5">
                  <img src="/assets/MyProfile/tw.svg" alt="" />
                  {isEdit ? (
                    <Input
                      value={tempSocial.twitter ? tempSocial.twitter : ""}
                      onChange={(e) => handleChange(e, "twitter")}
                      onBlur={() => handleBlur("twitter")}
                    />
                  ) : (
                    <p>{tempSocial.twitter ? tempSocial.twitter : "Not available"}</p>
                  )}
                </a>

                <a className="my-5">
                  <img src="/assets/MyProfile/dis.svg" alt="" />
                  {isEdit ? (
                    <Input
                      value={tempSocial.discord ? tempSocial.discord : ""}
                      onChange={(e) => handleChange(e, "discord")}
                      onBlur={() => handleBlur("discord")}
                    />
                  ) : (
                    <p>{tempSocial.discord ? tempSocial.discord : "Not available"}</p>
                  )}
                </a>

                <a>
                  <img src="/assets/MyProfile/tele.svg" alt="" />
                  {isEdit ? (
                    <Input
                      value={tempSocial.telegram ? tempSocial.telegram : ""}
                      onChange={(e) => handleChange(e, "telegram")}
                      onBlur={() => handleBlur("telegram")}
                    />
                  ) : (
                    <p>{tempSocial.telegram ? tempSocial.telegram : "Not available"}</p>
                  )}
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Social;
