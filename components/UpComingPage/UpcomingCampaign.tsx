import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import s from "./UpcomingCampaign.module.sass";

type Props = {};

const ListCard = [
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "UpComing",
    styleBg: true,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "SoldOut",
    styleBg: true,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "sale",
    styleBg: true,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "UpComing",
    styleBg: true,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "UpComing",
    styleBg: true,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "UpComing",
    styleBg: true,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
  },
];

export default function UpComing(props: Props) {
  return (
    <section className="lucis-container">
      <TitleSection text="Upcoming campaign" />
      <div className={s.blockCard}>
        {ListCard.map((e, i) => (
          <CardItem
            key={i}
            srcGame={e.srcGame}
            statusTime={e.statusTime}
            time={e.time}
            nameGame={e.nameGame}
            styleBg={e.styleBg}
            title={e.title}
            srcWeb={e.srcWeb}
            srcFb={e.srcFb}
            srcTele={e.srcTele}
            srcDiscord={e.srcDiscord}
            srcTwitter={e.srcTwitter}
          />
        ))}
      </div>
    </section>
  );
}
