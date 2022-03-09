import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import s from "../UpComingPage/UpcomingCampaign.module.sass";
import { useOpening } from "./useOpening";
import { useEffect } from "react";
import { GBoxType } from "../../src/generated/graphql";
type Props = {};

export default function Opening(props: Props) {
  const { resultOpening } = useOpening();

  useEffect(() => {
    return resultOpening;
  }, [resultOpening]);

  resultOpening?.openingBoxCampaign.map((e: any, i: any) => {
    const soldAmount = e.boxTypes?.sold_amount;
    console.log(soldAmount);
  });

  const handleTest = () => {};

  return (
    <section className="lucis-container">
      <TitleSection text="Opening campaign" />
      <div className={s.blockCard}>
        {resultOpening?.openingBoxCampaign.map((e: any, i: number) => {
          const soldAmount = e.boxTypes
            .map((item: GBoxType) => item.sold_amount)
            .reduce((prev: number, curr: number) => prev + curr, 0);

          const totalAmount = e.boxTypes
            .map((item: GBoxType) => item.total_amount)
            .reduce((prev: number, curr: number) => prev + curr, 0);

          const soldOutResult = soldAmount === totalAmount ? true : false;

          return (
            <CardItem
              key={i}
              soldOutResult={soldOutResult}
              srcGame={e.cover_img}
              statusTime={"Opening"}
              time={e.end}
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
          );
        })}
      </div>
    </section>
  );
}
