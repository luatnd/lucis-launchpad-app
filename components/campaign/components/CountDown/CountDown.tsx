import React, { useEffect, useState } from "react";
import s from "./CountDown.module.sass";

const CountDown = () => {
  const [totalTime, setTotalTime] = useState(20000);
  const [timer, setTimer] = useState<{ [name: string]: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimer((item) => ({
      ...item,
      days: Math.floor(totalTime / (60 * 60 * 24)),
      hours: Math.floor((totalTime / (60 * 60)) % 24),
      minutes: Math.floor((totalTime / 60) % 60),
      seconds: Math.floor(totalTime % 60),
    }));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timer;
    interval = setInterval(() => {
      if (totalTime < 0) {
        clearInterval(interval);
      } else {
        countTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [totalTime]);

  const countTime = () => {
    if (
      totalTime > 0 &&
      (timer.days !== 0 || timer.hours !== 0 || timer.minutes !== 0 || timer.seconds !== 0)
    ) {
      setTimer((item) => ({ ...item, seconds: item.seconds - 1 }));
      if (timer.minutes >= 0 && timer.seconds - 1 < 0) {
        setTimer((item) => ({ ...item, seconds: 59 }));
        setTimer((item) => ({ ...item, minutes: item.minutes - 1 }));
        if (timer.hours >= 0 && timer.minutes - 1 < 0) {
          setTimer((item) => ({ ...item, minutes: 59 }));
          setTimer((item) => ({ ...item, hours: item.hours - 1 }));
          if (timer.days >= 0 && timer.hours - 1 < 0) {
            setTimer((item) => ({ ...item, hours: 23 }));
            if (timer.days - 1 > 0) {
              setTimer((item) => ({ ...item, days: item.days - 1 }));
            }
          }
        }
      }
    }
    setTotalTime((totalTime) => totalTime - 1);
  };

  return (
    <div className={`lucis-container ${s.countDown}`}>
      <div className="text-white text-center text-36px font-bold">
        End to apply for the Whitelist in
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
              <div className={`${s.dateText} mt-3 uppercase font-bold text-center`}>{item}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountDown;
