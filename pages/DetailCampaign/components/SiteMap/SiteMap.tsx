import React, { createRef, useEffect, useRef } from "react";
import Swiper from "swiper";
import s from "./SiteMap.module.sass";
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
  const SwiperRef = useRef<Swiper>();
  useEffect(() => {
    SwiperRef.current = new Swiper(".swiper-container", {
      slidesPerView: 5,
      navigation: {
        prevEl: "prev-slide",
        nextEl: "next-slide",
      },
    });
    console.log(SwiperRef.current.activeIndex);
  }, []);

  return (
    <div className={`flex justify-center relative ${s.SiteMapContainer}`}>
      {/* <button className="prev-slide">Prev</button> */}
      {/* <button className="next-slide">Next</button> */}
      <div className={`${s.SiteMapLineTimeLine}`}></div>
      <div className={`w-10/12`}>
        <div className='swiper-container overflow-hidden'>
          <div className='swiper-wrapper'>
            {ListCard.map((item, key) => {
              return (
                <div className='swiper-slide' key={key}>
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
