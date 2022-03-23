import { Col, Row } from "antd";
import BlankState from "components/BlankState/BlankState";
import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import { useEffect } from "react";
import { GBoxCampaign } from "src/generated/graphql";
import s from "../UpComingPage/UpcomingCampaign.module.sass";
import { useCloseCampaign } from "./useCloseCampaign";
type Props = {};

export default function ClosedCampaign(props: Props) {
  const { resultCloseCampaign } = useCloseCampaign();
  const newDate = new Date();

  // useEffect(() => {
  //   return resultCloseCampaign;
  // }, [resultCloseCampaign]);

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
      {/* {resultCloseCampaign?.closedBoxCampaign.length > 0 ? (
        <Row gutter={[30, 30]}>
          {resultCloseCampaign?.closedBoxCampaign?.map(
            (e: GBoxCampaign, index: number) => {
              const statusTime = calculateCampaignStatus(e);

              return (
                <Col key={index} xs={24} md={12} lg={8}>
                  <CardItem
                    srcGame={e.cover_img}
                    statusTime={statusTime}
                    time={handleTest()}
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
                    highlight={e?.highlight}
                    chains={e?.chains}
                  />
                </Col>
              );
            }
          )}
        </Row>6
      ) : (
        <BlankState title={"closed"} />
      )} */}

      <BlankState title={"closed"} />
    </section>
  );
}
