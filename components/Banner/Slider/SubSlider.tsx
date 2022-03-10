import { GBoxCampaign } from "src/generated/graphql";
import s from "../Banner.module.sass";

type Props = {
  data: GBoxCampaign[];
  slideIndex: number;
  nextSlide: () => void;
  prevSlide: () => void;
};

const SubSlider = (props: Props) => {
  const { data, slideIndex, nextSlide, prevSlide } = props;

  return (
    <div className={s.subSliderContainer}>
      <div className={s.coverContainer}>
        {data &&
          data.map((item, index) => {
            return (
              <div key={index} className={s.coverImage}>
                <img src={item.cover_img} />
              </div>
            );
          })}
      </div>

      <div className={s.buttonContainer}>
        <button onClick={prevSlide}>PREV</button>
        <button onClick={nextSlide}>NEXT</button>
      </div>
    </div>
  );
};

export default SubSlider;
