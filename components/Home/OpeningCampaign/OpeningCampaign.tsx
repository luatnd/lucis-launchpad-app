import CardItem from "components/card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import s from "../UpComingPage/UpcomingCampaign.module.sass";
import { useOpening } from "./useOpening";
import { useEffect } from "react";
import { GBoxCampaign, GBoxType } from "../../../src/generated/graphql";
import { Col, Row } from "antd";
import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import BlankState from "components/BlankState/BlankState";
type Props = {};

export default function Opening(props: Props) {
  const { resultOpening } = useOpening();

  // useEffect(() => {
  //   return resultOpening;
  // }, [resultOpening]);
  // console.log(resultOpening);

  return (
    <section className="lucis-container">
      <TitleSection text="Opening campaign" />
      {resultOpening?.openingBoxCampaign.length > 0 ? (
        <Row gutter={[30, 30]}>
          {resultOpening?.openingBoxCampaign.map(
            (e: GBoxCampaign, index: number) => {
              const statusTime = calculateCampaignStatus(e);

              const soldAmount =
                e.boxTypes &&
                e.boxTypes
                  .map((item: GBoxType) => item.sold_amount)
                  .reduce((prev: number, curr: number) => prev + curr, 0);

              const totalAmount =
                e.boxTypes &&
                e.boxTypes
                  .map((item: GBoxType) => item.total_amount)
                  .reduce((prev: number, curr: number) => prev + curr, 0);

              const soldOutResult = soldAmount === totalAmount ? true : false;

              const timeCountDown = Math.floor(
                (new Date(e.end).getTime() - new Date().getTime()) / 1000
              );

              return (
                <Col key={index} xs={24} md={12} lg={8}>
                  <CardItem
                    soldOutResult={soldOutResult}
                    srcGame={e.cover_img}
                    statusTime={statusTime}
                    time={e.end}
                    nameGame={e?.game?.name}
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
                    timeCountDown={timeCountDown}
                  />
                </Col>
              );
            }
          )}
        </Row>
      ) : (
        <BlankState title={"opening"} />
      )}

      {/* <div className={s.blockCard}>
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
              nameGame={e?.game?.name}
              styleBg={true}
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
      </div> */}
    </section>
  );
}
