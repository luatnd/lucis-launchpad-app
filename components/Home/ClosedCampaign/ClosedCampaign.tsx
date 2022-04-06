import { Col, Row } from "antd";
import BlankState from "components/Home/BlankState/BlankState";
import { calculateCampaignStatus } from "components/campaign/CampaignHelper";
import CardItem from "components/Home/Card/ContainerCard";
import TitleSection from "components/TitleNameSection";
import { GBoxCampaign } from "src/generated/graphql";
import { useCloseCampaign } from "./useCloseCampaign";
type Props = {};

export default function ClosedCampaign(props: Props) {
  const { resultCloseCampaign } = useCloseCampaign();

  return (
    <section className="lucis-container mt-[80px] lg:mt-[150px]" id="Closed">
      <TitleSection text="Closed campaign" />
      {resultCloseCampaign?.closedBoxCampaign.length > 0 ? (
        <Row gutter={[30, 30]}>
          {resultCloseCampaign?.closedBoxCampaign?.map(
            (e: GBoxCampaign, index: number) => {
              const campaignStatus = calculateCampaignStatus(e);

              return (
                <Col key={index} xs={24} md={12} lg={8}>
                  <CardItem
                    srcGame={e.cover_img}
                    campaignStatus={campaignStatus}
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
                    timeCountDown={0}
                  />
                </Col>
              );
            }
          )}
        </Row>
      ) : (
        <BlankState title={"closed"} />
      )}
    </section>
  );
}
