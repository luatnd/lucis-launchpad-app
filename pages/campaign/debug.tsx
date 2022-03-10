import type { NextPage } from "next";
import DocHead from "../../components/DocHead";
import s from "./detail.module.sass";
import Banner from "../../components/campaign/components/Banner/Banner";
import { Col, Row, Tabs } from "antd";
import { TabPane } from "rc-tabs";
import Footer from "../../components/Footer";
import React from "react";
import BoxTypeCard from "../../components/campaign/components/box_type";
import {
  ChainSymbol,
  GBoxCampaign,
  GBoxType,
  GChain,
  GGame,
} from "../../src/generated/graphql";

/**
 * This has no function in project
 * BUT This is for static site generation
 * To support static generation of: /campaign/index.html
 * Match route: /campaign
 */
const CampaignDebug: NextPage = () => {
  // const chain: Chain = {
  //   // _count: {
  //   //   boxPrices: 0,
  //   //   currencies: 0,
  //   //   nftBox: 0,
  //   // },
  //   name: undefined,
  //   symbol: "",
  //   created_at: undefined,
  //   updated_at: undefined,
  // }
  // @ts-ignore
  const game: GGame = {
    uid: "",
    name: "Thetan Arena",
    created_at: undefined,
    updated_at: undefined,
    // _count: {
    //   boxCampaigns: 0
    // },
  };

  // @ts-ignore
  const campaign: GBoxCampaign = {
    // @ts-ignore
    game: game,
    game_uid: "",
    uid: "cp_12a34f56b89",
    start: new Date(),
    end: new Date(),
    created_at: undefined,
    updated_at: undefined,
    // _count: {
    //   boxTypes: 0,
    //   buyHistory: 0,
    //   whitelists: 0,
    // },
  };

  const box1: GBoxType = {
    // _count: {
    //   prices: 0
    // },
    uid: "box1_123456789",
    name: "Test campaign 1",
    desc: "Common box includes 5 upgradable NFT monsters that can be used in all game modes",
    box_campaign_uid: "cp_12a34f56b89",
    campaign: campaign,
    limit_per_user: 100,
    prices: [
      {
        price: 16.6899634,
        // @ts-ignore
        currency: {
          symbol: "BUSD",
          chain_symbol: ChainSymbol.Bsc,
        },
      },
    ],
    series_content: `
    <table>
      <tr>
          <td>250 rare NFTs</td>
          <td>50%</td>
      </tr>
      <tr>
          <td>150 elite NFTs</td>
          <td>25%</td>
      </tr>
      <tr>
          <td>75 legendary NFTs</td>
          <td>20%</td>
      </tr>
    </table>
    `,
    sold_amount: 380,
    total_amount: 500,
    thumb_img: "/assets/Box/image107.png",
    created_at: undefined,
    updated_at: undefined,
  };
  const box2: GBoxType = {
    ...box1,
    uid: "box1_123456789_2",
    name: "Test campaign 2",
    thumb_img: "/assets/Box/image109.png",
  };
  const box3: GBoxType = {
    ...box1,
    uid: "box1_123456789_3",
    name: "Test campaign 3",
    thumb_img: "/assets/Box/image110.png",
  };

  return (
    <>
      <DocHead title={"Draft Page for campaign"} />
      <div className="lucis-container">
        <div className={s.containerApp} style={{ paddingTop: 150 }}>
          <Row gutter={[24, 50]} className="justify-center">
            <Col>
              <BoxTypeCard boxType={box1} />
            </Col>
            <Col>
              <BoxTypeCard boxType={box2} />
            </Col>
            <Col>
              <BoxTypeCard boxType={box3} />
            </Col>
          </Row>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CampaignDebug;
