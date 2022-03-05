import { Col, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "components/Profile/Hooks/useMutationProfile";
import { ChangeEvent, useState } from "react";
import s from "../../pages/profile/index.module.sass";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  profile: any;
};

const Social = ({ isEdit, setIsEdit, profile }: Props) => {
  const { updateProfile, loading, error, data } = useMutationProfile();

  const [tempSocial, setTempSocial] = useState({
    facebook: profile?.me.profile.facebook,
    discord: profile?.me.profile.discord,
    twitter: profile?.me.profile.twitter,
    telegram: profile?.me.profile.telegram,
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
      <div className={`${s.box} sm:mb-3 md:mb-7`}>
        <Row justify="space-between">
          <Col xs={7} lg={7}>
            <div className={s.title}>
              <img src="/assets/MyProfile/social.svg" alt="" />
              <span className="pl-0 md:pl-3">Social</span>
            </div>
          </Col>
          <Col xs={16}>
            <div className={s.social}>
              <a>
                <img src="/assets/footer/fb.svg" alt="" />
                {isEdit ? (
                  <Input
                    value={tempSocial.facebook ? tempSocial.facebook : ""}
                    onChange={(e) => handleChange(e, "facebook")}
                    onBlur={() => handleBlur("facebook")}
                    placeholder={"Facebook address"}
                  />
                ) : (
                  <p>{tempSocial.facebook ? tempSocial.facebook : "Not available"}</p>
                )}
              </a>

              <a className="my-5">
                <img src="/assets/footer/tw.svg" alt="" />
                {isEdit ? (
                  <Input
                    value={tempSocial.twitter ? tempSocial.twitter : ""}
                    onChange={(e) => handleChange(e, "twitter")}
                    onBlur={() => handleBlur("twitter")}
                    placeholder={"Twitter address"}
                  />
                ) : (
                  <p>{tempSocial.twitter ? tempSocial.twitter : "Not available"}</p>
                )}
              </a>

              <a className="my-5">
                <img src="/assets/footer/dis.svg" alt="" />
                {isEdit ? (
                  <Input
                    value={tempSocial.discord ? tempSocial.discord : ""}
                    onChange={(e) => handleChange(e, "discord")}
                    onBlur={() => handleBlur("discord")}
                    placeholder={"Discord address"}
                  />
                ) : (
                  <p>{tempSocial.discord ? tempSocial.discord : "Not available"}</p>
                )}
              </a>

              <a>
                <img src="/assets/footer/tele.svg" alt="" />
                {isEdit ? (
                  <Input
                    value={tempSocial.telegram ? tempSocial.telegram : ""}
                    onChange={(e) => handleChange(e, "telegram")}
                    onBlur={() => handleBlur("telegram")}
                    placeholder={"Telegram address"}
                  />
                ) : (
                  <p>{tempSocial.telegram ? tempSocial.telegram : "Not available"}</p>
                )}
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Social;
