import Link from "next/link";
import { useRef, useState } from "react";
import MainSlider from "./MainSlider";
import SubSlider from "./SubSlider";
import { useSpotlight } from "./useSpotlight";
import s from "./Banner.module.sass";

const SliderContainer = () => {
  const { resultSpotlight, loading, error } = useSpotlight();
  const sliderRef = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderProps = {
    data: resultSpotlight?.spotlightBoxCampaign,
    slideIndex: slideIndex,
    setSlideIndex: setSlideIndex,
    loading: loading,
    sliderRef: sliderRef,
  };

  return (
    <>
      <MainSlider {...sliderProps} />
      <div className="lucis-container sm:mt-[30px] lg:mt-[50px]">
        <div className={s.thumbContainer}>
          <Link href="/ino" passHref>
            <a className={`${s.btnApplyINO}`}>
              <img src="/assets/Banner/ic_apply.svg" alt="" />
              <span>Apply for INO</span>
            </a>
          </Link>
          <SubSlider {...sliderProps} />
        </div>
      </div>
    </>
  );
};

export default SliderContainer;
