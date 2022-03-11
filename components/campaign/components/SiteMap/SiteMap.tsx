import { Progress, Modal, Popconfirm, Button } from "antd";
import moment from "moment";
import timeMoment from "moment-timezone";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./SiteMap.module.sass";
import {useDetailCampaign} from "../../../../hooks/campaign/useDetailCampaign";
import ConnectWalletBtn from "../../../Auth/components/ConnectWalletBtn";
import {useMutationRegisterWhiteList} from "../../../../hooks/campaign/useRegisterWhiteList";
import AuthStore from "components/Auth/AuthStore";
import {observer} from "mobx-react";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import { CheckOutlined } from "@ant-design/icons";

interface IRound {
  rounds: [
    {
      id: Number;
      name: String;
      description: String;
      start: any;
      end: any;
      is_whitelist: Boolean;
      require_whitelist: Boolean;
      participant_limit: Number;
      box_limit_per_user: Number;
      box_limit_this_phase: Number;
    }
  ];
  start: any;
  end: any;
  setTimeCountDown: (value: number) => void;
  setTextNow: (value: string) => void;
  boxCampaignUid: string;
  tzid: string;
}


export default observer(function SiteMap(props: IRound) {
// const SiteMap = (props: IRound) => {
  const { rounds, start, end, setTimeCountDown, setTextNow, boxCampaignUid, tzid } = props;
  const [listRounds, setListRounds] = useState([] as any);
  const [isActiveUpComing, setIsActiveUpComing] = useState(false);
  const {registerWhitelist, error, loading, data} = useMutationRegisterWhiteList()
  const [width, height] = useWindowSize();

  const {dataWhiteListRegistered, isInWhitelist} = useDetailCampaign({ box_campaign_uid: boxCampaignUid })

  const isWhitelisted = isInWhitelist || data?.registerWhitelist;
  // console.log('{isWhitelisted.SiteMap} isWhitelisted: ', isWhitelisted);

  const getCurrentRound = () => {
    const dateNow = timeMoment().tz(tzid).unix();
    const upcomingStart = timeMoment(start).tz(tzid).unix();
    const closeEnd = timeMoment(end).tz(tzid).unix();
    const firstStart = timeMoment(rounds[0]?.start).tz(tzid).unix()
    // const firstStart = 0; // TODO: Fix bug above line
    const time = (firstStart - dateNow) * 1000;
    setIsActiveUpComing(false);
    if (upcomingStart <= dateNow && dateNow <= firstStart) {
      setTextNow(`${rounds[0]?.name} will start in`)
      setIsActiveUpComing(true);
      setTimeout(() => {
        getCurrentRound();
      }, time);
      setTimeCountDown(Math.floor(time / 1000));
    }
    const lastStart = timeMoment(rounds[rounds?.length-1]?.start).tz(tzid).unix()
    const timeLast = (closeEnd - dateNow)*1000
    if (lastStart <= dateNow && dateNow <= closeEnd) {
      setTextNow('The campaign will end in')
      setTimeout(() => {
        getCurrentRound();
      }, timeLast);
      setTimeCountDown(Math.floor(timeLast / 1000));
    }
    if (dateNow > closeEnd) {
      setTextNow('')
    }
    const x = rounds?.map((e) => {
      const endDate = timeMoment(e.end).tz(tzid).unix();
      const startDate = timeMoment(e.start).tz(tzid).unix();
      const timeEnd = (endDate - dateNow) * 1000;
      if (startDate <= dateNow && dateNow <= endDate) {
        if (rounds[rounds.length-1]?.id !== e?.id) {
          setTextNow(`${e?.name} will end in`)
          setTimeout(() => {
            getCurrentRound();
          }, timeEnd);
          setTimeCountDown(Math.floor(timeEnd / 1000));
        }
        return { ...e, isActive: true };
      } else {
        return { ...e, isActive: false };
      }
    });
    setListRounds(x);
  };
  
  const handleApplyWhiteList = async () => {
    await registerWhitelist({
      variables: {
        box_campaign_uid: boxCampaignUid
      },
    })
  }

  useEffect(() => {
    getCurrentRound();
  }, [start, end, rounds]);

  return (
    <div className={`flex justify-center relative ${s.SiteMapContainer}`}>
      {/* <div className={`${s.SiteMapLineTimeLine} w-10/12`}></div> */}
      <div className={`w-11/12`}>
        <Swiper
          breakpoints={{
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
            },
          }}
        >
          <SwiperSlide>
            <div
              className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}
            >
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
                  {timeMoment(start).tz(tzid).format("HH:mm, MMMM DD")}
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div className={`${s.SiteMapLineCircle} ${isActiveUpComing ? s.active : ""}`}/>
                <div className={s.line}/>
              </div>

              <div className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}>
                Stay tuned and prepare.
              </div>
            </div>
          </SwiperSlide>
          {listRounds?.map((item: any, key: number) => (
            <SwiperSlide key={key}>
              <div
                className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}
              >
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
                    {timeMoment(new Date(item.start)).tz(tzid).format("HH:mm, MMMM DD")}
                  </div>
                </div>

                <div style={{ width: "100%" }}>
                  <div
                    className={`${s.SiteMapLineCircle} ${item.isActive === true ? s.active : ""}`}
                  />
                  <div className={s.line}></div>
                </div>

                <div className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}>
                  {item.description}
                </div>

                {item.is_whitelist && item.isActive &&
                (
                  <>
                    {AuthStore.isLoggedIn ? (
                        <div className="max-w-[250.91px]">
                          <Popconfirm
                              placement="top"
                              title={"You're going to be whitelisted"}
                              onConfirm={handleApplyWhiteList}
                              okText="Yes"
                              cancelText="No"
                              disabled={isWhitelisted || dataWhiteListRegistered?.registeredWhitelist?.registered === dataWhiteListRegistered?.registeredWhitelist?.limit}
                          >
                            <button
                                disabled={isWhitelisted || dataWhiteListRegistered?.registeredWhitelist?.registered === dataWhiteListRegistered?.registeredWhitelist?.limit}
                                className={`${s.button} ${isWhitelisted || dataWhiteListRegistered?.registeredWhitelist?.registered === dataWhiteListRegistered?.registeredWhitelist?.limit ? s.disabledBtn : ''} font-bold text-white text-center uppercase`}
                            >
                              <CheckOutlined className="my-auto"/>
                              {isWhitelisted ? "Whitelisted" : "Apply Whitelist"}
                            </button>
                          </Popconfirm>
                          <Progress strokeColor="#0BEBD6" percent={(dataWhiteListRegistered?.registeredWhitelist?.registered/dataWhiteListRegistered?.registeredWhitelist?.limit)*100} showInfo={false} />
                          <p className="text-right text-white mt-1">{`${dataWhiteListRegistered?.registeredWhitelist?.registered}/${dataWhiteListRegistered?.registeredWhitelist?.limit}`}</p>
                        </div>
                      ) : (
                         <div className={`mt-3 ${s.btnConnect}`}>
                           <ConnectWalletBtn small={width <= 1024}/>
                         </div>
                    )
                    }

                  </>

                )}
              </div>
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <div
              className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}
            >
              <div className={`${s.hSlide} flex flex-col justify-end w-full`}>
                <div
                  className={`text-white font-bold ${s.SiteMapLineCircleTitle} ${
                      timeMoment().tz(tzid).unix() >= timeMoment(end).tz(tzid).unix() ? s.active : ""
                  }`}
                >
                  Close
                </div>

                <div
                  className={`text-white pb-2 mb-10 ${s.SiteMapLineCircleTime} ${
                      timeMoment().tz(tzid).unix() >= timeMoment(end).tz(tzid).unix() ? s.active : ""
                  }`}
                >
                  {timeMoment(end).tz(tzid).format("HH:mm, MMMM DD")}
                </div>
              </div>
              <div
                className={`${s.SiteMapLineCircle} ${timeMoment().tz(tzid).unix() >= timeMoment(end).tz(tzid).unix() ? s.active : ""}`}
              ></div>
              <div className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}>
                Thank you for watching.
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
});

// export default SiteMap;
