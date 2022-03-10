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

  // console.log(resultOpening.openingBoxCampaign);

  const sliderProps = {
    data: resultSpotlight?.spotlightBoxCampaign,
    slideIndex: slideIndex,
  };

  console.log(resultSpotlight);

  const handleNextSlide = () => setSlideIndex(slideIndex + 1);

  const handlePrevSlide = () => setSlideIndex(slideIndex - 1);

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
