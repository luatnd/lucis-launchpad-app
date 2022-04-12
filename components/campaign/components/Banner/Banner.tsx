/* eslint-disable @next/next/no-img-element */
import { message } from "antd";
import useNotification from "hooks/campaign/useEnableNotification";
import React, { useEffect, useState } from "react";
import { GBoxCampaign } from "src/generated/graphql";
import s from "./Banner.module.sass";

type Props = {
  boxCampaign: GBoxCampaign;
  isSubcribed: boolean;
  token: string | undefined;
  refetch: any;
};

const Banner = ({ boxCampaign, isSubcribed, token, refetch }: Props) => {
  const [isEnableNotification, setIsEnableNotification] = useState(isSubcribed);
  const { enableNotification, disableNotification } = useNotification();

  const handleSubscription = () => {
    !isEnableNotification
      ? enableNotification({ variables: { box_campaign_uid: boxCampaign.uid } })
          .then(() => setIsEnableNotification(true))
          .catch((err) => message.error(err.message))
      : disableNotification({
          variables: { box_campaign_uid: boxCampaign.uid },
        })
          .then(() => setIsEnableNotification(false))
          .catch((err) => message.error(err.message));
  };

  // useEffect(() => {
  //   setIsEnableNotification(isSubcribed);
  // }, [isSubcribed]);

  useEffect(() => {
    // console.log(isSubcribed);

    refetch();
    setIsEnableNotification(isSubcribed);
  }, [token]);

  return (
    <div
      className={`${s.backgroundBanner}`}
      style={{ backgroundImage: `url(${boxCampaign?.banner_img ?? ""})` }}
    >
      <div className="container">
        <button className={s.noti} onClick={handleSubscription}>
          <img
            src={
              isEnableNotification
                ? "/assets/Campaign/Banner/svg/subcribed.svg"
                : "/assets/Campaign/Banner/svg/Sign_in_circle.svg"
            }
            alt="icon"
          />
          <p>{isEnableNotification ? "Subscribed" : "Enable Notification"}</p>
        </button>

        {boxCampaign && (
          <div className={`${s.inf}`}>
            <div className={`${s.infContainer}`}>
              <div className={s.infLogo}>
                <img src={boxCampaign?.game.logo ?? ""} alt="" />
              </div>

              <div className={s.infTitle}>
                <p className="font-[700]">
                  {boxCampaign?.game.name?.toUpperCase()}
                </p>
                <p className="font-[600]">{boxCampaign?.name?.toUpperCase()}</p>
              </div>

              <div className={`${s.infContent}`} id="desc">
                {boxCampaign?.desc}
              </div>

              <div className={s.infSocial}>
                <div className={s.infSocialIcons}>
                  {boxCampaign?.game.facebook && (
                    <a
                      href={boxCampaign?.game.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={"/assets/Campaign/Banner/svg/fb.svg"}
                        alt="icon"
                      />
                    </a>
                  )}

                  {boxCampaign?.game.discord && (
                    <a
                      href={boxCampaign?.game.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={"/assets/Campaign/Banner/svg/dis.svg"}
                        alt="icon"
                      />
                    </a>
                  )}

                  {boxCampaign?.game.telegram && (
                    <a
                      href={boxCampaign?.game.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={"/assets/Campaign/Banner/svg/tele.svg"}
                        alt="icon"
                      />
                    </a>
                  )}

                  {boxCampaign?.game.twitter && (
                    <a
                      href={boxCampaign?.game.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={"/assets/Campaign/Banner/svg/tw.svg"}
                        alt="icon"
                      />
                    </a>
                  )}

                  {boxCampaign?.game.website && (
                    <a
                      href={boxCampaign?.game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={"/assets/Campaign/Banner/svg/win.svg"}
                        alt="icon"
                      />
                    </a>
                  )}
                </div>

                {/* {isReadMore && (
                  <div className={s.infSocialRead}>
                    <button onClick={() => setIsReadMore(true)}>
                      read more &gt;&gt;{" "}
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
