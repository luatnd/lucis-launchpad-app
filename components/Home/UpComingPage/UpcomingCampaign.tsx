import { message } from "antd";
import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import moment from "moment";
import { useEffect, useState } from "react";
import s from "./UpcomingCampaign.module.sass";
import { useUpComing } from "./useUpComing";

type Props = {};

export default function UpComing(props: Props) {
  const { resultUpComing, loading, error } = useUpComing();

  return (
    <section className="lucis-container">
      <TitleSection text="Upcoming campaign" />
      <div className={s.blockCard}>
        {resultUpComing?.upcomingBoxCampaign.map((e: any, i: any) => {
          console.log("Upcom: ", e.name);
          return (
            <CardItem
              key={i}
              srcGame={e.cover_img}
              statusTime={"UpComing"}
              time={e.opening_at}
              inTime={e.inTime}
              nameGame={e?.game.name}
              styleBg={true}
              title={e?.name}
              description={e?.game.desc}
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
