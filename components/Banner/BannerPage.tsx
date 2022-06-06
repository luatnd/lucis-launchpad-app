import InputSearch from "components/Home/Search/InputSearch";
import s from "./Banner.module.sass";
import SliderContainer from "./SliderContainer";

export default function Banner() {
  return (
    <section
      className={`${s.containerBanner} pt-[80px] md:pt-[70px] lg:pt-[0px]`}
    >
      <InputSearch />
      <SliderContainer />
      {/* <InputSearch /> */}
    </section>
  );
}
