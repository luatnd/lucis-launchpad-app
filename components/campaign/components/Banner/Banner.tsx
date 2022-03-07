/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import s from "./Banner.module.sass";

const Banner = () => {
  const [isEnableNotification, setIsEnableNotification] = useState(false);

  const handleSubscription = () => {
    setIsEnableNotification(!isEnableNotification);
  };

  return (
    <div className={s.backgroundDetail}>
      <div className={`lucis-container ${s.backgroundContain}`}>
        <button className={s.notification} onClick={handleSubscription}>
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
        <div className={s.info}>
          <div className={s.info_contain}>
            <div className={s.info_logo} />
            <p className={s.info_title}>THETA ARENA</p>
            {/* <p className={s.info_event}>AXIE CAMPAIGN 1</p> */}
            <p className={s.info_content}>
              Thetan Arena is an esport game based on blockchain technology. You can gather your
              friends, form a team, battle with others and earn money with just your skills.{" "}
            </p>
            <div className={s.info_read}>
              <div className={s.info_button_group}>
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
              <span>{"read more >>"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
