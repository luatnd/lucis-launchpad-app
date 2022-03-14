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
  setMainSlider: Dispatch<SetStateAction<null>>;
  subSlider: any;
  loading: boolean;
};

const SimpleSlider = (props: Props) => {
  const { data, slideIndex, setMainSlider, subSlider, loading } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // console.log("Loading in container: ", loading);

  return (
    <div className="simple-slider">
      <Slider {...settings} asNavFor={subSlider} ref={(slider: any) => setMainSlider(slider)}>
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
  );
};

export default SimpleSlider;
