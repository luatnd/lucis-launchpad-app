import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import s from "../UpComingPage/UpcomingCampaign.module.sass";
type Props = {};

const ListCard = [
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "Sale",
    styleBg: false,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
    inTime: 'in 15 mins',
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "Sale",
    styleBg: false,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
    inTime: 'in 15 mins',
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "Sale",
    styleBg: false,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
    inTime: 'in 15 mins',
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "Sale",
    styleBg: false,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
    inTime: 'in 15 mins',
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "Sale",
    styleBg: false,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
    inTime: 'in 15 mins',
  },
  {
    srcGame: "/assets/UpComing/gameAxie.png",
    time: "1d 05h 30m 25s",
    nameGame: "AXIE INFINITY",
    title:
      "Build up a collection and use them across an ever expanding universe of games",
    statusTime: "Sale",
    styleBg: false,
    srcWeb: "#",
    srcFb: "#",
    srcTele: "#",
    srcDiscord: "#",
    srcTwitter: "#",
    inTime: 'in 15 mins',
  },
];

export default function ClosedCampaign(props: Props) {
  return (
    <section className="lucis-container">
      <TitleSection text="Closed campaign" />
      <div className={s.blockCard}>
        {ListCard.map((e, i) => (
          <CardItem
            key={i}
            srcGame={e.srcGame}
            statusTime={e.statusTime}
            time={e.time}
            inTime={e.inTime}
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
