import s from './SilderBanner.module.sass'
type Props = {

}

export default function ItemSliderBanner(props: Props) {
  return(
    <div className={s.contentItemSilder}>
      <div className={s.contentDetail}>
      <div className={s.bgItemSlider}></div>
        <div className={s.headingItem}>
          <div className={s.contentItemTop}>
            <div className={s.statusGame}>UpComing</div>
            <div className={s.Time}>2d 05h 30m 25s</div>
          </div>
          {/* status game */}
          <div className={s.logoGame}>
            <img src="/assets/Banner/LogoTheTan.png" alt="" />
          </div>
          {/* logo game */}
          <p>Thetan Arena is an esport game based on blockchain technology. You can gather your friends, form a team, battle with others and earn money with just your skills</p>
          {/* text */}
          <div className={s.contentItemBottom}>
            <div className={s.groupLink}>
              <a href="#"><img src="" alt="" /></a>
              <a href="#"><img src="" alt="" /></a>
              <a href="#"><img src="" alt="" /></a>
              <a href="#"><img src="" alt="" /></a>
              <a href="#"><img src="" alt="" /></a>
            </div>
            <div className={s.btnMore}>
              More detail
            </div>
          </div>

        </div>
        <div className={s.imGame}>
          <img src="/assets/Banner/im_Thetan.png" alt="" />
        </div>
      </div>
      <div className={s.btnApplyINO}>
        <img src="/assets/Banner/ic_apply.svg" alt="" />
        <span>Apply for INO</span>
      </div>
    </div>
  )
}