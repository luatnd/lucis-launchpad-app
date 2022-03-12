import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import { useEffect } from "react";
import s from "../UpComingPage/UpcomingCampaign.module.sass";
import { useCloseCampaign } from "./useCloseCampaign";
type Props = {};

export default function ClosedCampaign(props: Props) {
  const { resultCloseCampaign } = useCloseCampaign();
  const newDate = new Date();

  useEffect(() => {
    return resultCloseCampaign;
  }, [resultCloseCampaign]);

  const arrDate: any = [];
  resultCloseCampaign?.closedBoxCampaign.map((e: any, i: any) => {
    const getTimeCloseCampaign = e.end;
    arrDate.push(getTimeCloseCampaign);
  });
  const curDate = new Date(arrDate);

  const handleTest = () => {
    if (newDate > curDate) {
      return `SALE ENDED`;
    }
  };
  return (
    <section className="lucis-container">
      <TitleSection text="Closed campaign" />
      <div className={s.blockCard}>
        {resultCloseCampaign?.closedBoxCampaign?.map((e: any, i: any) => {
          return (
            <CardItem
              key={i}
              srcGame={e.cover_img}
              statusTime={"SALE"}
              time={handleTest()}
              inTime={""}
              nameGame={e?.game.name}
              styleBg={false}
              title={e?.name}
              description={e?.game.desc}
              srcWeb={e?.game.website}
              srcFb={e?.game.facebook}
              srcTele={e?.game.telegram}
              srcDiscord={e?.game.discord}
              srcTwitter={e?.game.twitter}
              id={e?.uid}
            />
          );
        })}
      </div>
    </section>
  );
}
