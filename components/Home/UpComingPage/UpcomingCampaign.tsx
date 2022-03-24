import { Col, message, Row } from "antd";
import BlankState from "components/BlankState/BlankState";
import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import moment from "moment";
import { useEffect, useState } from "react";
import { GBoxCampaign } from "src/generated/graphql";
import s from "./UpcomingCampaign.module.sass";
import { useUpComing } from "./useUpComing";

type Props = {};

export default function UpComing(props: Props) {
  const { resultUpComing } = useUpComing();
  // console.log(resultUpComing);

  return (
    <section className="lucis-container">
      <TitleSection text="Upcoming campaign" />
      {resultUpComing?.upcomingBoxCampaign.length > 0 ? (
        <Row gutter={[30, 30]}>
          {resultUpComing?.upcomingBoxCampaign.map(
            (e: GBoxCampaign, index: number) => {
              const statusTime = calculateCampaignStatus(e);
              // console.log(statusTime);

              return (
                <Col key={index} xs={24} md={12} lg={8}>
                  <CardItem
                    key={index}
                    srcGame={e.cover_img}
                    statusTime={statusTime}
                    time={e.opening_at}
                    // inTime={e.inTime}
                    nameGame={e?.game.name}
                    styleBg={true}
                    title={e?.name}
                    description={e?.game.desc}
                    srcWeb={e?.game.website}
                    srcFb={e?.game.facebook}
                    srcTele={e?.game.telegram}
                    srcDiscord={e?.game.discord}
                    srcTwitter={e?.game.twitter}
                    id={e?.uid}
                    highlight={e?.highlight}
                    chains={e?.chains}
                  />
                </Col>
              );
            }
          )}
        </Row>
      ) : (
        <BlankState title={"upcoming"} />
      )}
    </section>
  );
}
