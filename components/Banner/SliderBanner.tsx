import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import ItemSliderBanner from "components/Home/Slider/SilderBanner";
import React, { Component, useRef } from "react";
import Slider from "react-slick";
import { GBoxCampaign } from "src/generated/graphql";
import { slugify } from "utils/String";

type Props = {
  data: GBoxCampaign[];
  slideIndex: number;
};

const SimpleSlider = (props: Props) => {
  const { data, slideIndex } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="simple-slider">
      <Slider {...settings}>
        {data &&
          data.map((e, i) => {
            const getCampaignDetailUrl = () => {
              return `/campaign/${e.uid}/${slugify(e.name)}`;
            };

            const status = calculateCampaignStatus(e);

            return (
              <ItemSliderBanner
                key="i"
                status={status}
                time={e.end}
                logo={e.game.logo}
                desc={e.desc}
                href={getCampaignDetailUrl()}
              />
            );
          })}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
