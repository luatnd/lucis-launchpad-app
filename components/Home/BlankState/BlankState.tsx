import s from "./Blankstate.module.sass";

type Props = {
  title: string;
};
const BlankState = (props: Props) => {
  const { title } = props;
  return (
    <div style={{ position: "relative", zIndex:'0' }}>
      <img
        className={`${s.circleTopLeft} `}
        src="/assets/BlankState/Ellipse3.svg"
        alt=""
      />
      <img
        className={`${s.circleTopRight}`}
        src="/assets/BlankState/Ellipse4.svg"
        alt=""
      />
      <img
        className={`${s.squareBottomRight} `}
        src="/assets/BlankState/Group4.svg"
        alt=""
      />
      <img
        className={`${s.trapoidTopRight} `}
        src="/assets/BlankState/trapoid1.svg"
        alt=""
      />

      <img
        className={`${s.circleBottomLeft}`}
        src="/assets/BlankState/Ellipse4.svg"
        alt=""
      />

      <div
        className={`${s.blankContainer} text-center px-30px py-40px  mb-220px text-18px md:text-24px lg:text-28px`}
      >
        <p
          style={{
            color: "#0BEBD6",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          No {title} campaigns
        </p>
        <p
          className="m-0"
          style={{
            color: "#0BEBD6",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          Contact us now if you want to INO your project!
        </p>
      </div>
    </div>
  );
};

export default BlankState;
