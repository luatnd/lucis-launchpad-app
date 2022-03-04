import React, { createRef, useEffect, useRef } from "react";
// import Swiper from "swiper";
import "swiper/css/pagination";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import s from "./SiteMap.module.sass";
import {Button, Progress} from "antd";
const ListCard = [
  {
    title: "Upcoming",
    time: "08:00, Feb 18",
    description: "Stay tuned and prepare to APPLY WHITELIST.",
    isActive: false,
  },
  {
    title: "Register whitelist",
    time: "08:00, Feb 18",
    description: "Click the [APPLY WHITELIST] button to register for Register whitelist.",
    isActive: true,
  },
  {
    title: "Whitelist phase",
    time: "08:00, Feb 18",
    description:
      "Whitelist registrants will be given favorable dealings to buy Mystery Boxes in phase 1, on a FCFS basis.",
    isActive: false,
  },
  {
    title: "Buy phase",
    time: "08:00, Feb 18",
    description:
      "The Buy phase will be started right after whitelist phase ends. Remaining boxes left in whitelist phase will be transferred to Buy phase",
    isActive: false,
  },
  {
    title: "Close",
    time: "08:00, Feb 18",
    description: "Thank you.",
    isActive: false,
  },
];

const SiteMap = () => {
  return (
    <div className={`flex justify-center relative ${s.SiteMapContainer}`}>
      <div className={`${s.SiteMapLineTimeLine}`}></div>
      <div className={`w-10/12`}>
        <Swiper
            breakpoints = {{
              360: {
                slidesPerView: 2,
              },
              639: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
              1300: {
                slidesPerView: 5,
              }
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
        >
          {ListCard.map((item, key) => (
              <SwiperSlide key={key}>
                <div className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}>
                  <div className={`h-[250px] flex flex-col justify-end w-full`}>
                    <div
                        className={`text-white font-bold ${s.SiteMapLineCircleTitle} ${
                            item.isActive === true ? s.active : ""
                        }`}
                    >
                      {item.title}
                    </div>
                    <div
                        className={`text-white pb-2 mb-10 ${s.SiteMapLineCircleTime} ${
                            item.isActive === true ? s.active : ""
                        }`}
                    >
                      {item.time}
                    </div>
                  </div>
                  <div className={`${s.SiteMapLineCircle} ${item.isActive === true ? s.active : ""}`}></div>
                  <div className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}>{item.description}</div>
                  {item.title === 'Register whitelist' && (
                      <div className='max-w-[250.91px]'>
                        <button className={`${s.buttom} font-bold text-white`}>Apply whitelist</button>
                        <Progress strokeColor='#0BEBD6' percent={60} showInfo={false}/>
                        <p className='text-right text-white mt-1'>60/100</p>
                      </div>
                  )

                  }
                </div>
              </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SiteMap;
