/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { GBoxCampaign } from "src/generated/graphql";
import s from "./Banner.module.sass";

type Props = {
  boxCampaign: GBoxCampaign;
};

const Banner = ({ boxCampaign }: Props) => {
  const [isEnableNotification, setIsEnableNotification] = useState(false);

  const handleSubscription = () => {
    setIsEnableNotification(!isEnableNotification);
  };

  return (
    <div
      className={s.backgroundBanner}
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

        <div className={s.inf}>
          <div className={s.infContainer}>
            <div className={s.infLogo}>
              <img src={boxCampaign?.game.logo ?? ""} alt="" />
            </div>

            <div className={s.infTitle}>
              <p>{boxCampaign?.game.name}</p>
              <p>{boxCampaign?.name}</p>
            </div>

            <div className={s.infContent}>{boxCampaign?.game.desc}</div>

            <div className={s.infSocial}>
              <div className={s.infSocialIcons}>
                <a
                  href="https://www.facebook.com/lucistv.news"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={"/assets/Campaign/Banner/svg/fb.svg"} alt="icon" />
                </a>
                <a
                  href="https://discord.com/channels/911921072830574603/926398655093702666"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={"/assets/Campaign/Banner/svg/dis.svg"} alt="icon" />
                </a>
                <a href="https://t.me/sankeonft" target="_blank" rel="noopener noreferrer">
                  <img src={"/assets/Campaign/Banner/svg/tele.svg"} alt="icon" />
                </a>
                <a href="https://twitter.com/Lucis_TV" target="_blank" rel="noopener noreferrer">
                  <img src={"/assets/Campaign/Banner/svg/tw.svg"} alt="icon" />
                </a>
                <a href="https://lucis.network" target="_blank" rel="noopener noreferrer">
                  <img src={"/assets/Campaign/Banner/svg/win.svg"} alt="icon" />
                </a>
              </div>

              {/* <div className={s.infSocialRead}>
                <a href="#">Read more &gt;&gt; </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
