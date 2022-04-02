import { Col, Row } from "antd";
import { getOriginCurrentCampaignRound } from "components/campaign/CampaignHelper";
import React from "react";
import {
  GBoxCampaign,
  GBoxCampaignBuyHistory,
  GBoxType,
} from "src/generated/graphql";
import BoxTypeCard from "../box_type";

type BoxCardProps = {
  boxCampaign: GBoxCampaign;
  isInWhitelist?: boolean;
  purchasedBox?: GBoxType;
  recentlyPurchasedBox?: GBoxCampaignBuyHistory;
};

export default function BoxCard(props: BoxCardProps) {
  const boxTypes = props.boxCampaign.boxTypes ?? [];
  const chains = props.boxCampaign.chains ?? [];

  const currentRound = getOriginCurrentCampaignRound(props.boxCampaign);
  // console.log(props.recentlyPurchasedBox);

  return (
    <div className="lucis-container mt-[60px] md:mt-[100px]">
      <Row gutter={[24, 50]} className="justify-center">
        {boxTypes.map((e, index) => {
          // console.log(e);
          // const chainSymbol = e.

          return (
            <Col key={index} xs={24} md={12} lg={8}>
              <BoxTypeCard
                boxType={e}
                chains={chains}
                round={currentRound}
                isInWhitelist={props.isInWhitelist}
                purchasedBox={props.purchasedBox}
                recentlyPurchasedBox={props.recentlyPurchasedBox}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
