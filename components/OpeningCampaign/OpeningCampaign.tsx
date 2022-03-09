import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import s from "../UpComingPage/UpcomingCampaign.module.sass";
import { useOpening } from "./useOpening";
import { useEffect } from "react";
type Props = {};

export default function Opening(props: Props) {
  const { resultOpening } = useOpening();

  useEffect(() => {
    return resultOpening;
  }, [resultOpening]);
  resultOpening?.openingBoxCampaign.map((e: any, i: any) => {
    const soldAmount = e. boxTypes?.sold_amount
    console.log(soldAmount);
  });

  const handleTest = () => {
  };

  return (
    <section className="lucis-container">
      <TitleSection text="Opening campaign" />
      <div className={s.blockCard}>
        {resultOpening?.openingBoxCampaign.map((e: any, i: number) => (
          <CardItem
            key={i}
            srcGame={e.cover_img}
            statusTime={e.statusTime}
            time={handleTest()}
            inTime={e.inTime}
            nameGame={e?.game?.name}
            styleBg={true}
            title={e?.game?.desc}
            srcWeb={e?.game.website}
            srcFb={e?.game.facebook}
            srcTele={e?.game.telegram}
            srcDiscord={e?.game.discord}
            srcTwitter={e?.game.twitter}
          />
        ))}
      </div>
    </section>
  );
}
