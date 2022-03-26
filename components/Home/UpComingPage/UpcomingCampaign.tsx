import { Col, Row } from "antd";
import BlankState from "components/Home/BlankState/BlankState";
import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import CardItem from "components/Home/Card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import { GBoxCampaign } from "src/generated/graphql";
import { useUpComing } from "./useUpComing";

type Props = {};

export default function UpComing(props: Props) {
  const { resultUpComing } = useUpComing();

  return (
    <section className="lucis-container">
      <TitleSection text="Upcoming campaign" />
      {resultUpComing?.upcomingBoxCampaign.length > 0 ? (
        <Row gutter={[30, 30]}>
          {resultUpComing?.upcomingBoxCampaign.map(
            (e: GBoxCampaign, index: number) => {
              const campaignStatus = calculateCampaignStatus(e);

              const timeCountDown = Math.floor(
                (new Date(e.opening_at).getTime() - new Date().getTime()) / 1000
              );

              return (
                <Col key={index} xs={24} md={12} lg={8}>
                  <CardItem
                    key={index}
                    srcGame={e.cover_img}
                    campaignStatus={campaignStatus}
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
                    timeCountDown={timeCountDown}
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
