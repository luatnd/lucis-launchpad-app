import { GBoxCampaign } from "src/generated/graphql";
import s from "../Banner.module.sass";

type Props = {
  data: GBoxCampaign[];
  slideIndex: number;
};

const SubSlider = (props: Props) => {
  const { data, slideIndex } = props;

  console.log(data);

  return (
    <div className={s.subSliderContainer}>
      <h1>SubSlider</h1>

      <div>
        {data &&
          data.map((item, index) => {
            return <img src={item.cover_img} key={index} />;
          })}
      </div>

      <div className={s.buttonContainer}>
        <button>NEXT</button>
        <button>PREV</button>
      </div>
    </div>
  );
};

export default SubSlider;
