import { Skeleton } from "antd";
import Link from "next/link";
import { useRef, useState } from "react";
import s from "./Banner.module.sass";
import SimpleSlider from "./SliderBanner";
import { useSpotlight } from "./useSpotlight";
import SubSlider from "./SubSlider";
import InputSearch from "components/Home/Search/InputSearch";

export default function Banner() {
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
    <section className={s.containerBanner}>
      <SimpleSlider {...sliderProps} />

      <div className="container md:py-5">
        <div className={s.thumbContainer}>
          <Link href="/ino" passHref>
            <a className={`${s.btnApplyINO}`}>
              <img src="/assets/Banner/ic_apply.svg" alt="" />
              <span>Apply for INO</span>
            </a>
          </Link>
          <SubSlider {...sliderProps} />
        </div>
        {/* <InputSearch /> */}
      </div>
    </section>
  );
}
