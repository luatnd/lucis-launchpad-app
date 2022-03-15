import { Skeleton } from "antd";
import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import ItemSliderBanner from "components/Home/Slider/SilderBanner";
import React, { Component, Dispatch, SetStateAction, useRef } from "react";
import Slider from "react-slick";
import { GBoxCampaign } from "src/generated/graphql";
import { slugify } from "utils/String";
import s from "../Home/Slider/SilderBanner.module.sass";

type Props = {
  data: GBoxCampaign[];
  slideIndex: number;
  sliderRef: any;
  loading: boolean;
  setSlideIndex: any;
};

const SimpleSlider = (props: Props) => {
  const { data, loading, sliderRef, setSlideIndex } = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => {
      setSlideIndex(index);
    },
  };

  return (
    <>
      {loading ? (
        <div className="lucis-container">
          <div className={s.skeContainer}>
            <Skeleton.Image />
            <Skeleton paragraph={{ rows: 5 }} />
          </div>
        </div>
      ) : (
        <div className="simple-slider">
          <Slider {...settings} ref={sliderRef}>
            {data?.map((e, i) => {
              const getCampaignDetailUrl = () => {
                return `/campaign/${e.uid}/${slugify(e.name)}`;
              };

              const status = calculateCampaignStatus(e);

              return (
                <ItemSliderBanner
                  key={i}
                  status={status}
                  time={e.end}
                  logo={e.game.logo}
                  desc={e.desc}
                  href={getCampaignDetailUrl()}
                  loading={loading}
                  banner={e.cover_img}
                />
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
};

export default SimpleSlider;
