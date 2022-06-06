import { Skeleton } from "antd";
import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import ItemSliderBanner from "components/Home/Slider/SilderBanner";
import React, { useEffect, useState } from "react";
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

const MainSlider = (props: Props) => {
  const { data, loading, sliderRef, setSlideIndex } = props;
  const [listBanner, setListBanner] = useState<GBoxCampaign[]>();

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => {
      setSlideIndex(index);
    },
  };

  useEffect(() => {
    data &&
      setListBanner(
        [...data].sort((a, b) => a.spotlight_position! - b.spotlight_position!)
      );
  }, [data]);

  return (
    <>
      <div className={`${s.mainSlider}`}>
        <Slider {...settings} ref={sliderRef}>
          {listBanner?.map((e, i) => {
            const getCampaignDetailUrl = () => {
              return `/campaign/${e.uid}/${slugify(e.name)}`;
            };

            const status = calculateCampaignStatus(e);

            const timeOpeningCampaign = Math.floor(
              (new Date(e.end).getTime() - new Date().getTime()) / 1000
            );

            const timeUpcomingCampaign = Math.floor(
              (new Date(e.opening_at).getTime() - new Date().getTime()) / 1000
            );

            const timeCountDown =
              status === "OPENING"
                ? timeOpeningCampaign
                : status === "UPCOMING"
                ? timeUpcomingCampaign
                : 0;

            return (
              <ItemSliderBanner
                key={i}
                status={status}
                logo={e.game.logo}
                desc={e.desc}
                href={getCampaignDetailUrl()}
                loading={loading}
                banner={e.cover_img}
                name={e.name}
                facebook={e.game.facebook}
                discord={e.game.discord}
                twitter={e.game.twitter}
                tele={e.game.telegram}
                website={e.game.website}
                timeCountDown={timeCountDown}
              />
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default MainSlider;
