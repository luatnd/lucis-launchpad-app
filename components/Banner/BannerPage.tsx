import SimpleSlider from "./SliderBanner";
import s from './Banner.module.sass'

type Props = {

}

export default function Banner(props: Props) {
  return(
    <section className={s.containerBanner}>
      <div className={s.bgItemSlider}></div>
      <SimpleSlider />
    </section>
  )
}
