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
          console.log(e);
          const soldAmount = e.boxTypes.map((item: GBoxType) => item.sold_amount);
          const totalAmount = e.boxTypes.map((item: GBoxType) => item.total_amount);

          const soldOutResult = soldAmount === totalAmount ? true : false;
          // console.log(
          //   "Sold Amount: ",
          //   soldAmount.reduce((prev: number, curr: number) => prev + curr, 0)
          // );

          // console.log(
          //   "Total amount: ",
          //   totalAmount.reduce((prev: number, curr: number) => prev + curr, 0)
          // );

          return (
            <CardItem
              key={i}
              soldOutResult={soldOutResult}
              srcGame={e.cover_img}
              statusTime={"Opening"}
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
          );
        })}
      </div>
    </section>
  );
}
