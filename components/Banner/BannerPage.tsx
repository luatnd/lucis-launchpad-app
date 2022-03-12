import SimpleSlider from "./SliderBanner";
import s from "./Banner.module.sass";
import MainSlider from "./[temp]Slider/MainSlider";

import SubSlider from "./[temp]Slider/SubSlider";
import { useRef, useState } from "react";
import Link from "next/link";
import { useSpotlight } from "./useSpotlight";
import { devNull } from "os";

type Props = {};

export default function Banner(props: Props) {
  const { resultSpotlight } = useSpotlight();
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNextSlide = () => {
    if (slideIndex >= resultSpotlight.spotlightBoxCampaign.length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex === 0) {
      setSlideIndex(resultSpotlight.spotlightBoxCampaign.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };

  const sliderProps = {
    data: resultSpotlight?.spotlightBoxCampaign,
    slideIndex: slideIndex,
    nextSlide: handleNextSlide,
    prevSlide: handlePrevSlide,
    setSlideIndex: setSlideIndex,
  };

  return (
    <section className={s.containerBanner}>
      <SimpleSlider {...sliderProps} />

      <div className="container py-5">
        <div className="flex justify-between items-center">
          <Link href="/ino" passHref>
            <a className={`${s.btnApplyINO}`}>
              <img src="/assets/Banner/ic_apply.svg" alt="" />
              <span>Apply for INO</span>
            </a>
          </Link>
          <SubSlider {...sliderProps} />
        </div>
      </div>
    </section>
  );
}
