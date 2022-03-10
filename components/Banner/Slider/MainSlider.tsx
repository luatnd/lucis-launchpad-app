import s from "../Banner.module.sass";
import { GBoxCampaign } from "src/generated/graphql";

type Props = {
  data: GBoxCampaign[];
  slideIndex: number;
};

const MainSlider = (props: Props) => {
  const { data, slideIndex } = props;
  console.log(data);

  return (
    <>
      <h1>Main Slider</h1>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <div className={s.contentContainer}></div>
              <img src={item.cover_img} alt="" />
            </div>
          );
        })}
    </>
  );
};

export default MainSlider;
