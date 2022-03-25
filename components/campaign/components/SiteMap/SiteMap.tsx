import { Progress, Modal, Popconfirm, Button, Tooltip } from "antd";
import moment from "moment";
import timeMoment from "moment-timezone";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./SiteMap.module.sass";
import { useDetailCampaign } from "../../../../hooks/campaign/useDetailCampaign";
import ConnectWalletBtn from "../../../Auth/components/ConnectWalletBtn";
import { useMutationRegisterWhiteList } from "../../../../hooks/campaign/useRegisterWhiteList";
import AuthStore from "components/Auth/AuthStore";
import { observer } from "mobx-react";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import { CheckOutlined } from "@ant-design/icons";
import { GBoxCampaignRound, WhitelistStatus } from "src/generated/graphql";

interface IRound {
  rounds: GBoxCampaignRound[];
  start: any;
  end: any;
  setTimeCountDown: (value: number) => void;
  setTextNow: (value: string) => void;
  boxCampaignUid: string;
  tzid: string;
  widthScreen: number;
  isInWhitelist: boolean;
  whitelistRegistered: WhitelistStatus;
  whitelistRegisteredRecently: WhitelistStatus;
}

export default observer(function SiteMap(props: IRound) {
  const {
    rounds,
    start,
    setTimeCountDown,
    end,
    setTextNow,
    boxCampaignUid,
    tzid,
    widthScreen,
    isInWhitelist,
    whitelistRegistered,
    whitelistRegisteredRecently,
  } = props;
  const [listRounds, setListRounds] = useState([] as any);
  const [isActiveUpComing, setIsActiveUpComing] = useState(false);
  const { registerWhitelist, error, loading, data } =
    useMutationRegisterWhiteList();
  const [keyActiveSlide, setKeyActiveSlide] = useState(0);
  const isWhitelisted = isInWhitelist || data?.registerWhitelist;

  const getCurrentRound = () => {
    const dateNow = timeMoment().tz(tzid).unix();
    const upcomingStart = timeMoment(start).tz(tzid).unix();
    const closeEnd = timeMoment(end).tz(tzid).unix();
    const firstStart = timeMoment(rounds[0]?.start).tz(tzid).unix();
    console.log(firstStart);
    // const firstStart = 0; // TODO: Fix bug above line
    const time = (firstStart - dateNow) * 1000;
    setIsActiveUpComing(false);
    if (upcomingStart <= dateNow && dateNow <= firstStart) {
      setTextNow(`${rounds[0]?.name} will start in`);
      setIsActiveUpComing(true);
      setKeyActiveSlide(0);
      setTimeout(() => {
        getCurrentRound();
      }, time);
      setTimeCountDown(Math.floor(time / 1000));
    }
    const lastStart = timeMoment(rounds[rounds?.length - 1]?.start)
      .tz(tzid)
      .unix();
    const timeLast = (closeEnd - dateNow) * 1000;
    if (lastStart <= dateNow && dateNow <= closeEnd) {
      setTextNow("The campaign will end in");
      setTimeout(() => {
        getCurrentRound();
      }, timeLast);
      setTimeCountDown(Math.floor(timeLast / 1000));
    }
    if (dateNow > closeEnd) {
      setKeyActiveSlide(rounds.length + 1);
      setTextNow("");
    }
    const x = rounds?.map((e, index) => {
      const endDate = timeMoment(e.end).tz(tzid).unix();
      const startDate = timeMoment(e.start).tz(tzid).unix();
      const timeEnd = (endDate - dateNow) * 1000;
      if (startDate <= dateNow && dateNow <= endDate) {
        if (rounds[rounds.length - 1]?.id !== e?.id) {
          setTextNow(`${e?.name} will end in`);
          setTimeout(() => {
            getCurrentRound();
          }, timeEnd);
          setTimeCountDown(Math.floor(timeEnd / 1000));
        }
        if (widthScreen >= 639) setKeyActiveSlide(index);
        else setKeyActiveSlide(index + 1);
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
        box_campaign_uid: boxCampaignUid,
      },
    });
  };

  useEffect(() => {
    getCurrentRound();
  }, [start, end, rounds]);

  const swiperRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    swiperRef.current?.swiper.slideTo(keyActiveSlide);
    console.log("keyActiveSlide", keyActiveSlide);
  }, [keyActiveSlide]);

  const whitelistDataSource =
    whitelistRegisteredRecently ?? whitelistRegistered;
  const whitelist_total_registered = whitelistDataSource?.registered ?? 0;
  const whitelist_total_limit = whitelistDataSource?.limit ?? 0;
  const whitelistHaSlotLeft =
    whitelist_total_registered < whitelist_total_limit;
  const disableClickWhitelist = isWhitelisted || !whitelistHaSlotLeft;

  return (
    <div className={`flex justify-center relative ${s.SiteMapContainer}`}>
      {/* <div className={`${s.SiteMapLineTimeLine} w-10/12`}></div> */}
      <div className={`w-11/12`}>
        <Swiper
          // @ts-ignore
          ref={swiperRef}
          hashNavigation={{
            watchState: true,
          }}
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
          <SwiperSlide data-hash="slide-1">
            <div
              className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}
            >
              <div className={`${s.hSlide} flex flex-col justify-end w-full`}>
                <div
                  className={`text-white font-bold ${
                    s.SiteMapLineCircleTitle
                  } ${isActiveUpComing ? s.active : ""}`}
                >
                  Upcoming
                </div>

                <div
                  className={`text-white pb-2 mb-10 ${
                    s.SiteMapLineCircleTime
                  } ${isActiveUpComing ? s.active : ""}`}
                >
                  {timeMoment(start).tz(tzid).format("HH:mm, MMMM DD")}
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <div
                  className={`${s.SiteMapLineCircle} ${
                    isActiveUpComing ? s.active : ""
                  }`}
                />
                <div className={s.line} />
              </div>

              <div
                className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}
              >
                Stay tuned and prepare.
              </div>
            </div>
          </SwiperSlide>
          {listRounds?.map((item: any, key: number) => (
            <SwiperSlide key={key} data-hash={`slide-${key + 2}`}>
              <div
                className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}
              >
                <div className={`${s.hSlide} flex flex-col justify-end w-full`}>
                  <div
                    className={`text-white font-bold ${
                      s.SiteMapLineCircleTitle
                    } ${item.isActive === true ? s.active : ""}`}
                  >
                    {item.name}
                  </div>
                  <div
                    className={`text-white pb-2 mb-10 ${
                      s.SiteMapLineCircleTime
                    } ${item.isActive === true ? s.active : ""}`}
                  >
                    {timeMoment(new Date(item.start))
                      .tz(tzid)
                      .format("HH:mm, MMMM DD")}
                  </div>
                </div>

                <div style={{ width: "100%" }}>
                  <div
                    className={`${s.SiteMapLineCircle} ${
                      item.isActive === true ? s.active : ""
                    }`}
                  />
                  <div className={s.line}></div>
                </div>

                <div
                  className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}
                >
                  {item.description}
                </div>

                {item.is_whitelist && item.isActive && (
                  <>
                    {AuthStore.isLoggedIn ? (
                      <div className="max-w-[250.91px]">
                        {!disableClickWhitelist ? (
                          <Popconfirm
                            placement="top"
                            title={"You're going to be whitelisted"}
                            onConfirm={handleApplyWhiteList}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              className={`
                                    ${s.button} 
                                    ${
                                      !whitelistHaSlotLeft ? s.disabledBtn : ""
                                    } 
                                    ${isWhitelisted ? s.whitelisted : ""} 
                                    font-bold text-white text-center uppercase
                                  `}
                              style={{ fontWeight: "600" }}
                            >
                              APPLY WHITELIST
                            </button>
                          </Popconfirm>
                        ) : (
                          <Tooltip
                            placement="top"
                            title={
                              isWhitelisted
                                ? `You've already in the whitelist`
                                : !whitelistHaSlotLeft
                                ? `No whitelist slot left, you cannot register anymore`
                                : ""
                            }
                          >
                            <button
                              disabled={disableClickWhitelist}
                              className={`
                                  ${s.button} 
                                  ${!whitelistHaSlotLeft ? s.disabledBtn : ""} 
                                  ${isWhitelisted ? s.whitelisted : ""} 
                                  font-bold text-white text-center uppercase
                                `}
                            >
                              {isWhitelisted ? (
                                <>
                                  <img
                                    src="/assets/UpComing/tick-done-2.svg"
                                    alt=""
                                    style={{
                                      width: 24,
                                      padding: "0 0 3px 0",
                                      fontWeight: "600",
                                    }}
                                  />
                                  WHITELISTED
                                </>
                              ) : !whitelistHaSlotLeft ? (
                                `NO SLOT LEFT`
                              ) : (
                                ""
                              )}
                            </button>
                          </Tooltip>
                        )}

                        <Progress
                          strokeColor="#0BEBD6"
                          percent={
                            whitelist_total_limit
                              ? (whitelist_total_registered /
                                  whitelist_total_limit) *
                                100
                              : 0
                          }
                          showInfo={false}
                        />
                        <p className="text-right text-white mt-1">{`${whitelist_total_registered} / ${whitelist_total_limit}`}</p>
                      </div>
                    ) : (
                      <div className={`mt-3 ${s.btnConnect}`}>
                        <ConnectWalletBtn small={widthScreen <= 1024} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}

          <SwiperSlide data-hash={`slide-${listRounds.length + 2}`}>
            <div
              className={`flex flex-col justify-center select-none px-2 ${s.SiteMapLineCircleTitleBox}`}
            >
              <div className={`${s.hSlide} flex flex-col justify-end w-full`}>
                <div
                  className={`text-white font-bold ${
                    s.SiteMapLineCircleTitle
                  } ${
                    timeMoment().tz(tzid).unix() >=
                    timeMoment(end).tz(tzid).unix()
                      ? s.active
                      : ""
                  }`}
                >
                  Closed
                </div>

                <div
                  className={`text-white pb-2 mb-10 ${
                    s.SiteMapLineCircleTime
                  } ${
                    timeMoment().tz(tzid).unix() >=
                    timeMoment(end).tz(tzid).unix()
                      ? s.active
                      : ""
                  }`}
                >
                  {timeMoment(end).tz(tzid).format("HH:mm, MMMM DD")}
                </div>
              </div>
              <div
                className={`${s.SiteMapLineCircle} ${
                  timeMoment().tz(tzid).unix() >=
                  timeMoment(end).tz(tzid).unix()
                    ? s.active
                    : ""
                }`}
              ></div>
              <div
                className={`text-white mt-10 w-full ${s.SiteMapLineCircleContent}`}
              >
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
