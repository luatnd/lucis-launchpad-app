import React, {createRef, useEffect, useRef, useState} from "react";
// import Swiper from "swiper";
import "swiper/css/pagination";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import s from "./SiteMap.module.sass";
import {Button, Progress} from "antd";
import moment from "moment";
const ListCard = [
  {
      box_limit_per_user: null,
      box_limit_this_phase: 0,
      description: "Whitelist phase",
      end: "2022-03-07 18:29:59",
      id: 1,
      is_whitelist: true,
      name: "Whitelist phase",
      participant_limit: 10,
      require_whitelist: true,
      start: "2022-03-07 18:29:00",
  },
  {
      box_limit_per_user: null,
      box_limit_this_phase: 0,
      description: "Buy whitelist phase",
      end: "2022-03-07 18:30:59",
      id: 1,
      is_whitelist: false,
      name: "Whitelist phase",
      participant_limit: 10,
      require_whitelist: true,
      start: "2022-03-07 18:30:00",
  },
  {
      box_limit_per_user: null,
      box_limit_this_phase: 0,
      description: "Whitelist phase",
      end: "2022-03-07 18:31:59",
      id: 1,
      is_whitelist: false,
      name: "Whitelist phase",
      participant_limit: 10,
      require_whitelist: true,
      start: "2022-03-07 18:31:00",
  },
];
interface IRound {
    rounds:[ {
        id: Number
        name: String
        description: String
        start: any
        end: any
        is_whitelist: Boolean
        require_whitelist: Boolean
        participant_limit: Number
        box_limit_per_user: Number
        box_limit_this_phase: Number
    }]
    start: any
    end: any
    setTimeCountDown: (value: number) => void
    isInWhitelist: boolean
}

const SiteMap = (props:IRound) => {
    const { rounds, start, end, setTimeCountDown, isInWhitelist } = props
    const [listRounds, setListRounds] = useState([] as any);
    const [isActiveUpComing, setIsActiveUpComing] = useState(false);


    const getCurrentRound = () => {
        const dateNow = moment().unix()
        const upcomingStart = moment(start).unix()
        // const firstStart = moment(rounds[0]?.start).unix()
        const firstStart = 0; // TODO: Fix bug above line
        const time = (firstStart - dateNow)*1000
        setIsActiveUpComing(false)
        if (upcomingStart <= dateNow && dateNow <= firstStart) {
            setIsActiveUpComing(true)
            setTimeout(() => {getCurrentRound()},time)
            setTimeCountDown(Math.floor(time/1000))
        }
        const x = rounds?.map((e) => {
            const endDate = moment(e.end).unix()
            const startDate = moment(e.start).unix()
            const timeEnd = (endDate - dateNow)*1000
            if (startDate <= dateNow  && dateNow <= endDate) {
                setTimeout(() => {getCurrentRound()},timeEnd)
                setTimeCountDown(Math.floor(timeEnd/1000))
                return {...e, isActive: true}
            } else {
                return {...e, isActive: false}
            }
        })
        setListRounds(x)
    }

    useEffect(() => {
        getCurrentRound()
    },[start, end, rounds])
    return (
    <div className={`flex justify-center relative ${s.SiteMapContainer}`}>
      <div className={`${s.SiteMapLineTimeLine} w-10/12`}></div>
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
        >
            <SwiperSlide>
                <div className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}>
                    <div className={`${s.hSlide} flex flex-col justify-end w-full`}>
                        <div
                            className={`text-white font-bold ${s.SiteMapLineCircleTitle} ${
                                isActiveUpComing ? s.active : ""
                            }`}
                        >
                            Upcoming
                        </div>
                        <div
                            className={`text-white pb-2 mb-10 ${s.SiteMapLineCircleTime} ${
                                isActiveUpComing ? s.active : ""
                            }`}
                        >
                            {moment(start).format('HH:mm, MMMM DD')}
                        </div>
                    </div>
                    <div className={`${s.SiteMapLineCircle} ${isActiveUpComing ? s.active : ""}`}></div>
                    <div className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}>Stay tuned and prepare to APPLY WHITELIST.</div>
                </div>
            </SwiperSlide>
          {listRounds?.map((item: any, key: number) => (
              <SwiperSlide key={key}>
                <div className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}>
                  <div className={`${s.hSlide} flex flex-col justify-end w-full`}>
                    <div
                        className={`text-white font-bold ${s.SiteMapLineCircleTitle} ${
                            item.isActive === true ? s.active : ""
                        }`}
                    >
                      {item.name}
                    </div>
                    <div
                        className={`text-white pb-2 mb-10 ${s.SiteMapLineCircleTime} ${
                            item.isActive === true ? s.active : ""
                        }`}
                    >
                        {moment(new Date(item.start)).format('HH:mm, MMMM DD')}
                    </div>
                  </div>
                  <div className={`${s.SiteMapLineCircle} ${item.isActive === true ? s.active : ""}`}></div>
                  <div className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}>{item.description}</div>
                  {item.is_whitelist && item.isActive && (
                      <div className='max-w-[250.91px]'>
                        <button disabled={isInWhitelist} className={`${s.buttom} font-bold text-white uppercase`}>{isInWhitelist ? 'Applied' : 'Apply whitelist'}</button>
                        <Progress strokeColor='#0BEBD6' percent={60} showInfo={false}/>
                        <p className='text-right text-white mt-1'>60/100</p>
                      </div>
                  )
                  }
                </div>
              </SwiperSlide>
          ))}
            <SwiperSlide>
                <div className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}>
                    <div className={`${s.hSlide} flex flex-col justify-end w-full`}>
                        <div
                            className={`text-white font-bold ${s.SiteMapLineCircleTitle} ${
                                moment().unix() >= moment(end).unix() ? s.active : ""
                            }`}
                        >
                            Close
                        </div>
                        <div
                            className={`text-white pb-2 mb-10 ${s.SiteMapLineCircleTime} ${
                                moment().unix() >= moment(end).unix() ? s.active : ""
                            }`}
                        >
                            {moment(end).format('HH:mm, MMMM DD')}
                        </div>
                    </div>
                    <div className={`${s.SiteMapLineCircle} ${moment().unix() >= moment(end).unix() ? s.active : ""}`}></div>
                    <div className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}>Thank you.</div>
                </div>
            </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SiteMap;
