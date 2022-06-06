import s from "./Banner.module.sass";

const Banner = () => {
  return (
    <div className={s.backgroundBanner}>
      <div className="lucis-container">
        <div className={s.contentBanner}>
          <p className={s.contentTitle}>APPLY FOR INO</p>
          <p className={s.contentDesc}>
            Launch your INO campaign and sell Mystery box easily on Lucis
            Launchpad
          </p>
          <p className={s.contentDesc}>
            Sell your boxes in your own currency or any popular one
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
