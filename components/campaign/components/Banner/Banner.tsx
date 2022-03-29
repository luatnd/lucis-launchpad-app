/* eslint-disable @next/next/no-img-element */
import { Button, message, Skeleton } from "antd";
import {
  useDisableNotification,
  useEnableNotification,
} from "hooks/campaign/useEnableNotification";
import React, { useState } from "react";
import { GBoxCampaign } from "src/generated/graphql";
import s from "./Banner.module.sass";

type Props = {
  boxCampaign: GBoxCampaign;
};

const Banner = ({ boxCampaign }: Props) => {
  // TODO: get data from boxCampaign.enable_notify
  const [isEnableNotification, setIsEnableNotification] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const { enableNotification } = useEnableNotification();
  const { disableNotification } = useDisableNotification();

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

  const handleReadMore = () => {
    setIsReadMore(true);
  };

  return (
    <div
      className={`${s.backgroundBanner} ${!boxCampaign && s.blank}`}
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
                {/* {boxCampaign ? (
                <img src={boxCampaign.game.logo ?? ""} alt="" />
              ) : (
                <Skeleton.Image />
              )} */}
                <img src={boxCampaign?.game.logo ?? ""} alt="" />
              </div>

              <div className={s.infTitle}>
                <p className="font-[700]">
                  {boxCampaign?.game.name?.toUpperCase()}
                  {/* {boxCampaign ? (
                  boxCampaign.game.name?.toUpperCase()
                ) : (
                  <Skeleton paragraph={{ rows: 0 }} />
                )} */}
                </p>
                <p className="font-[600]">
                  {boxCampaign?.name?.toUpperCase()}
                  {/* {boxCampaign ? (
                  boxCampaign.name?.toUpperCase()
                ) : (
                  <Skeleton paragraph={{ rows: 4 }} />
                )} */}
                </p>
              </div>

              <div
                className={`${s.infContent} ${isReadMore ? "" : s.readMore}`}
              >
                {boxCampaign?.game.desc}
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

                {!isReadMore && (
                  <div className={s.infSocialRead}>
                    <button onClick={handleReadMore}>
                      Read more &gt;&gt;{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
