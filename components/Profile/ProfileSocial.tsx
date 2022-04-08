import { Col, message, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "hooks/profile/useMutationProfile";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import s from "../../pages/profile/index.module.sass";
import AuthStore from "../Auth/AuthStore";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  facebook: string | undefined;
  twitter: string | undefined;
  tele: string | undefined;
  discord: string | undefined;
};

const validateLink = (url: string) => {
  // Validate url follow https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
  const re =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  return re.test(url);
};

const Social = ({ isEdit, facebook, twitter, tele, discord }: Props) => {
  const { updateProfile } = useMutationProfile();

  const [tempSocial, setTempSocial] = useState({
    facebook: facebook,
    discord: discord,
    twitter: twitter,
    telegram: tele,
  });

  const [isValidSocials, setIsValidSocials] = useState({
    facebook: true,
    discord: true,
    twitter: true,
    telegram: true,
  });

  const handleBlur = (field: string) => {
    //@ts-ignore
    if (isValidSocials[field]) {
      updateProfile({
        variables: {
          data: {
            [field]: {
              //@ts-ignore
              set: tempSocial[field],
            },
          },
        },
      }).catch((err) => {
        message.error(err?.message);
        // console.log(err?.extensions);
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    console.log(e.target.value === "");
    setTempSocial({
      ...tempSocial,
      [field]: e.target.value ?? "",
    });

    if (field === "facebook") {
      validateLink(e.target.value) || e.target.value === ""
        ? setIsValidSocials({ ...isValidSocials, facebook: true })
        : setIsValidSocials({ ...isValidSocials, facebook: false });
    } else if (field === "discord") {
      validateLink(e.target.value) || e.target.value === ""
        ? setIsValidSocials({ ...isValidSocials, discord: true })
        : setIsValidSocials({ ...isValidSocials, discord: false });
    } else if (field === "telegram") {
      validateLink(e.target.value) || e.target.value === ""
        ? setIsValidSocials({ ...isValidSocials, telegram: true })
        : setIsValidSocials({ ...isValidSocials, telegram: false });
    } else {
      validateLink(e.target.value) || e.target.value === ""
        ? setIsValidSocials({ ...isValidSocials, twitter: true })
        : setIsValidSocials({ ...isValidSocials, twitter: false });
    }
  };

  return (
    <>
      <div className={`${s.box} sm:mb-3 md:mb-7`}>
        <Row justify="space-between">
          <Col xs={7} lg={7}>
            <div className={s.title}>
              <img src="/assets/MyProfile/social.svg" alt="" />
              <span className="pl-0 md:pl-3 text-14px sm:text-16px md:text-18px lg:text-24px">
                Social
              </span>
            </div>
          </Col>
          <Col xs={16}>
            <div className={s.social}>
              <div>
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
                    <p className="text-14px sm:text-16px md:text-18px lg:text-24px">
                      {/* {facebook && isValidSocials.facebook
                        ? tempSocial.facebook
                        : !isValidSocials.facebook
                        ? facebook
                        : "Not available"} */}
                      {facebook ? facebook : "Not available"}
                    </p>
                  )}
                </a>
                {!isValidSocials.facebook && isEdit && (
                  <p className={`${s.inValid} pl-[30px] sm:pl-[50px]`}>
                    Invalid facebook URL
                  </p>
                )}
              </div>

              <div className="my-5">
                <a>
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
                    <p className="text-14px sm:text-16px md:text-18px lg:text-24px">
                      {/* {twitter && isValidSocials.twitter
                        ? tempSocial.twitter
                        : !isValidSocials.twitter
                        ? twitter
                        : "Not available"} */}
                      {twitter ? twitter : "Not available"}
                    </p>
                  )}
                </a>
                {!isValidSocials.twitter && isEdit && (
                  <p className={`${s.inValid} pl-[30px] sm:pl-[50px]`}>
                    Invalid twitter URL
                  </p>
                )}
              </div>

              <div className="my-5">
                <a>
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
                    <p className="text-14px sm:text-16px md:text-18px lg:text-24px">
                      {/* {discord && isValidSocials.discord
                        ? tempSocial.discord
                        : !isValidSocials.discord
                        ? discord
                        : "Not available"} */}
                      {discord ? discord : "Not available"}
                    </p>
                  )}
                </a>
                {!isValidSocials.discord && isEdit && (
                  <p className={`${s.inValid} pl-[30px] sm:pl-[50px]`}>
                    Invalid discord URL
                  </p>
                )}
              </div>

              <div>
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
                    <p className="text-14px sm:text-16px md:text-18px lg:text-24px">
                      {/* {tele && isValidSocials.telegram
                        ? tempSocial.telegram
                        : !isValidSocials.telegram
                        ? tele
                        : "Not available"} */}
                      {tele ? tele : "Not available"}
                    </p>
                  )}
                </a>
                {!isValidSocials.telegram && isEdit && (
                  <p className={`${s.inValid} pl-[30px] sm:pl-[50px]`}>
                    Invalid telegram URL
                  </p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Social;
