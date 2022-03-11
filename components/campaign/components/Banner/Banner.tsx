/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { truncateStr } from "utils/String";
import s from "./Banner.module.sass";

const content =
  "Thetan Arena is an esport game based on blockchain technology. You can gather your friends, form a team, battle with others and earn money with just your skills.";

const Banner = () => {
  const [isEnableNotification, setIsEnableNotification] = useState(false);

  const handleSubscription = () => {
    setIsEnableNotification(!isEnableNotification);
  };

  return (
    <div className={s.backgroundBanner}>
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
              <img src="/assets/logo.png" alt="" />
            </div>

            <div className={s.infTitle}>
              <p>THETA ARENA</p>
              <p>AXIE CAMPAIGN 1</p>
            </div>

            <div className={s.infContent}>{content}</div>

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
