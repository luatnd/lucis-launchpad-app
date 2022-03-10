import SimpleSlider from "./SliderBanner";
import s from "./Banner.module.sass";
import MainSlider from "./Slider/MainSlider";

import SubSlider from "./Slider/SubSlider";
import { useState } from "react";
import { useSpotlight } from "./useSpotlight";

type Props = {};

export default function Banner(props: Props) {
  const { resultSpotlight } = useSpotlight();
  const [slideIndex, setSlideIndex] = useState(0);

  // console.log(resultSpotlight.spotlightBoxCampaign);

  const handleNextSlide = () => {
    if (slideIndex >= resultSpotlight.spotlightBoxCampaign.length) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    // setSlideIndex(slideIndex - 1);

    if (slideIndex === 0) {
      setSlideIndex(resultSpotlight.spotlightBoxCampaign.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };

  console.log(slideIndex);

  const sliderProps = {
    data: resultSpotlight?.spotlightBoxCampaign,
    slideIndex: slideIndex,
    nextSlide: handleNextSlide,
    prevSlide: handlePrevSlide,
  };

  return (
    <section className={s.containerBanner}>
      <div className="lucis-container">
        <MainSlider {...sliderProps} />

        <div className="flex justify-between items-center">
          <a className={`${s.btnApplyINO}`}>
            <img src="/assets/Banner/ic_apply.svg" alt="" />
            <span>Apply for INO</span>
          </a>
          <SubSlider {...sliderProps} />
        </div>
      </div>
    </section>
  );
}
