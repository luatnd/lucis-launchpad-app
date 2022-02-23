import s from './SilderBanner.module.sass'
type Props = {
  setStatusGame: string;
  setTimeGame: string;
  setLogoGame: string;
  setTextGame: string;
  setSrcMore: string;
  setSrcApply: string
}

export default function ItemSliderBanner(props: Props) {
  return(
    <div className={s.contentItemSilder}>
      <div className={s.contentDetail}>
      <div className={s.bgItemSlider}></div>
        <div className={s.headingItem}>
          <div className={s.contentItemTop}>
            <div className={s.statusGame}>{props.setStatusGame}</div>
            <div className={s.Time}>{props.setTimeGame}</div>
          </div>
          {/* status game */}
          <div className={s.logoGame}>
            <img src={props.setLogoGame} alt="" />
          </div>
          {/* logo game */}
          <p>{props.setTextGame}</p>
          {/* text */}
          <div className={s.contentItemBottom}>
            <div className={s.groupLink}>
              <a href="#"><img src="/assets/Banner/svg/fb.svg" alt="" /></a>
              <a href="#"><img src="/assets/Banner/svg/dis.svg" alt="" /></a>
              <a href="#"><img src="/assets/Banner/svg/tele.svg" alt="" /></a>
              <a href="#"><img src="/assets/Banner/svg/tw.svg" alt="" /></a>
              <a href="#"><img src="/assets/Banner/svg/win.svg" alt="" /></a>
            </div>
            <a href={props.setSrcMore} className={s.btnMore}>
              More detail
            </a>
          </div>

        </div>
        <div className={s.imGame}>
          <img src="/assets/Banner/im_Thetan.png" alt="" />
        </div>
      </div>
      <a href={props.setSrcApply} className={s.btnApplyINO}>
        <img src="/assets/Banner/ic_apply.svg" alt="" />
        <span>Apply for INO</span>
      </a>
    </div>
  )
}