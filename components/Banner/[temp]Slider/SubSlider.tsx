import { Skeleton } from "antd";
import Slider from "react-slick";
import { GBoxCampaign } from "src/generated/graphql";
import { slugify } from "utils/String";
import s from "../Banner.module.sass";

type Props = {
  data: GBoxCampaign[];
  slideIndex: number;
  nextSlide: () => void;
  prevSlide: () => void;
  setSlideIndex: (index: number) => void;
  setSubSlider: (i: Slider) => void;
  mainSlider: any;
};

const SubSlider = (props: Props) => {
  const { data, slideIndex, nextSlide, prevSlide, setSlideIndex, setSubSlider, mainSlider } = props;

  const handleClick = (i: number) => {
    setSlideIndex(i);
    console.log(i);
  };

  const settings = {
    className: s.center,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
  };

  return (
    <div className={s.subSliderContainer}>
      <div className={s.coverContainer}>
        {data &&
          data.map((item, index) => {
            return (
              // <div
              //   key={index}
              //   className={`${s.coverImage} ${slideIndex === index ? s.selected : ""}`}
              //   onClick={() => handleClick(index)}
              // >
              <img
                key={index}
                className={`${s.coverImage} ${slideIndex === index ? s.selected : ""}`}
                src={item.cover_img ?? ""}
                alt=""
                onClick={() => handleClick(index)}
              />
              // </div>
            );
          })}
      </div>

      {/* <div className={s.buttonContainer}>
        <button onClick={prevSlide}>PREV</button>
        <button onClick={nextSlide}>NEXT</button>
      </div> */}
    </div>
  );
};

export default SubSlider;

{
  /* <Slider {...settings} asNavFor={mainSlider} ref={(slider: Slider) => setSubSlider(slider)}>
        {data &&
          data.map((e, i) => {
            return (
              <div
                key={i}
                className={`${s.coverImage} ${slideIndex === i ? s.selected : ""}`}
                onClick={() => handleClick(i)}
              >
                <img src={e.cover_img ?? ""} alt="" />
              </div>
            );
          })}
      </Slider> */
}
