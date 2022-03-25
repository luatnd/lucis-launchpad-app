import React, { useEffect, useState } from "react";
import { useCountDown } from "utils/Time";
import s from "./CountDown.module.sass";

interface ICountDown {
  timeCountDown: number;
  textNow: string;
}

const CountDown = (props: ICountDown) => {
  const { timeCountDown, textNow } = props;
  const timer = useCountDown(timeCountDown);

  return (
    <div className={`lucis-container ${s.countDown}`}>
      <div className="text-white text-center sm:text-12px md:text-24px lg:text-36px font-bold">
        {textNow.toUpperCase()}
      </div>
      <div className="flex text-white  md:gap-10 justify-between md:justify-center  mt-8">
        {Object.keys(timer).map((item, key) => {
          return (
            <div className="flex flex-col" key={key}>
              <div className={s.timeElement}>
                <div className={s.helperBar}></div>
                <div className={s.helperLeft}></div>
                <div className={s.helperRight}></div>
                <div className={s.topBack}>
                  {timer[item] < 10 ? `0${timer[item]}` : `${timer[item]}`}
                </div>
              </div>
              <div
                className={`${s.dateText} mt-3 uppercase font-bold text-center`}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountDown;
