/* eslint-disable @next/next/no-img-element */
import { Button, message, Skeleton } from "antd";
import useNotification from "hooks/campaign/useEnableNotification";
import { useWindowSize } from "hooks/useWindowSize";
import React, { useEffect, useRef, useState } from "react";
import { GBoxCampaign } from "src/generated/graphql";
import s from "./Banner.module.sass";

type Props = {
  boxCampaign: GBoxCampaign;
};

const Banner = ({ boxCampaign }: Props) => {
  const [isEnableNotification, setIsEnableNotification] = useState(false);
  // const [isReadMore, setIsReadMore] = useState(false);
  // const [widthScreen, height] = useWindowSize();
  const descRef = useRef<any>(null);

  const { enableNotification, disableNotification } = useNotification();

  const handleSubscription = () => {
    // console.log(typeof Notification !== "undefined");
    // Notification.requestPermission().then(function (permission) {
    //   console.log(permission !== "granted");
    // });

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

  // const handleReadMore = () => {
  //   setIsReadMore(true);
  // };

  // Handle read more button follow width screen
  // - Dectect height
  // console.log(descRef);

  // useEffect(() => {
  //   // const descEle = document.querySelector("#desc");
  //   console.log(descRef);

  //   if (widthScreen >= 1280) {
  //     console.log("1280px");
  //   } else if (widthScreen >= 768) {
  //     console.log("768px");
  //   } else if (widthScreen >= 540) {
  //     console.log("540px");
  //   } else if (widthScreen >= 0) {
  //     console.log("0px");
  //   } else {
  //     console.log("End");
  //   }
  // }, [widthScreen, descRef]);

  return (
    <div
      // ${!boxCampaign && s.blank}
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

              <div className={`${s.infContent}`} id="desc" ref={descRef}>
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
