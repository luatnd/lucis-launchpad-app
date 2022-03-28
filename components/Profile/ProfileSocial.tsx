import { Col, message, Row } from "antd";
import Input from "components/Input/Input";
import { ChangeEvent, useState } from "react";
import s from "../../pages/profile/index.module.sass";
import AuthStore from "../Auth/AuthStore";
import { observer } from "mobx-react-lite";
import { useMutationProfile } from "hooks/profile/useMutationProfile";
import { vi2en } from "utils/String";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
};

const Social = ({ isEdit, setIsEdit }: Props) => {
  const { updateProfile, loading, error, data } = useMutationProfile();
  // console.log(error);

  const { facebook, twitter, tele, discord } = AuthStore;

  const [tempSocial, setTempSocial] = useState({
    facebook: facebook,
    discord: discord,
    twitter: twitter,
    telegram: tele,
  });

  const handleBlur = (field: string) => {
    updateProfile({
      variables: {
        data: {
          [field]: {
            //@ts-ignore
            set: vi2en(tempSocial[field]),
          },
        },
      },
    })
      // .then(() => message.success("Update success"))
      .catch((err) => {
        message.error("Failed!");
        console.log(err);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    // console.log(e.target.value);
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
                    name="facebook"
                  />
                ) : (
                  <p>
                    {tempSocial.facebook
                      ? tempSocial.facebook
                      : "Not available"}
                  </p>
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
                    name="twitter"
                  />
                ) : (
                  <p>
                    {tempSocial.twitter ? tempSocial.twitter : "Not available"}
                  </p>
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
                    name="discord"
                  />
                ) : (
                  <p>
                    {tempSocial.discord ? tempSocial.discord : "Not available"}
                  </p>
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
                    name="telegram"
                  />
                ) : (
                  <p>
                    {tempSocial.telegram
                      ? tempSocial.telegram
                      : "Not available"}
                  </p>
                )}
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default observer(Social);
