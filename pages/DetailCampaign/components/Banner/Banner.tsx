/* eslint-disable @next/next/no-img-element */
import React from "react";
import s from "./Banner.module.sass";

const Banner = () => {
  return (
    <div className={s.backgroundDetail}>
      <div className={s.backgroundContain}>
        <div className={s.notification}>
          <img src='/assets/Banner/svg/signout.svg' alt='icon' />
          <p>Enable Notification</p>
        </div>
        <div className={s.info}>
          <div className={s.info_contain}>
            <div className={s.info_logo} />
            <p className={s.info_title}>THETA ARENA</p>
            <p className={s.info_content}>
              Thetan Arena is an esport game based on blockchain technology. You can gather your friends, form a team,
              battle with others and earn money with just your skills.{" "}
            </p>
            <div className={s.info_read}>
              <div className={s.info_button_group}>
                <span>
                  <img src={"/assets/Banner/svg/fb.svg"} alt='icon' />
                </span>
                <span>
                  <img src={"/assets/Banner/svg/dis.svg"} alt='icon' />
                </span>
                <span>
                  <img src={"/assets/Banner/svg/tele.svg"} alt='icon' />
                </span>
                <span>
                  <img src={"/assets/Banner/svg/tw.svg"} alt='icon' />
                </span>
                <span>
                  <img src={"/assets/Banner/svg/win.svg"} alt='icon' />
                </span>
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
