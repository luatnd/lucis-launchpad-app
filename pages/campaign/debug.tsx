import type { NextPage } from "next";
import DocHead from "../../components/DocHead";
import s from "./detail.module.sass";
import Banner from "../../components/campaign/components/Banner/Banner";
import { Col, Row, Tabs } from "antd";
import { TabPane } from "rc-tabs";
import Footer from "../../components/Footer/Footer";
import React from "react";
import BoxTypeCard from "../../components/campaign/components/box_type";
import { ChainSymbol, GBoxCampaign, GBoxPrice, GBoxType, GGame } from "../../src/generated/graphql";

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
  };

  // @ts-ignore
  const campaign: GBoxCampaign = {
    // @ts-ignore
    game: game,
    game_uid: "",
    uid: "cl02lx5or0000doo018d7n2aa",
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

  const boxPrice: GBoxPrice = {
    uid: "cl02lyn3o00r2doh032gy1l3y",
    price: 16.6899634,
    // @ts-ignore
    currency: {
      symbol: "BUSD",
      chain_symbol: ChainSymbol.Bsc,
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png",
    },
  };

  const box1: GBoxType = {
    // _count: {
    //   prices: 0
    // },
    "uid": "cl02lx5os0005doo0qmjbsdgsy",
    // "game_uid": "cl02lx5os0001doo0f3oiu144",
    name: "Axie box 1",
    desc: "Wide variety of game modes: MOBA & Battle Royale, coming with monthly updates and attractive rewards.",
    box_campaign_uid: "cp_12a34f56b89",
    // campaign: campaign,
    limit_per_user: 100,
    prices: [boxPrice],
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
    uid: "cl02lx5os0005doo0qmjbsdysh",
    name: "Test box 2",
    thumb_img: "/assets/Box/image109.png",
    sold_amount: 500,
    total_amount: 500,
  };
  const box3: GBoxType = {
    ...box1,
    uid: "cl02lx5os0005doo0qmjbsjgki",
    name: "Test box 3",
    thumb_img: "/assets/Box/image110.png",
    sold_amount: 300,
    total_amount: 500,
  };

  return (
    <>
      <DocHead title={"Draft Page for campaign"} />

      <div className="lucis-container mt-[116px]">
        <Row gutter={[24, 50]} className="justify-center">
          <Col xs={24} md={12} lg={8}>
            <BoxTypeCard
              boxType={box1}
              round={{
                id: 1,
                name: "",
                start: new Date().toISOString(),
                end: new Date().toISOString(),
                is_whitelist: false,
                require_whitelist: false,
              }}
              isInWhitelist={false}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <BoxTypeCard
              boxType={box2}
              round={{
                id: 1,
                name: "",
                start: new Date().toISOString(),
                end: new Date().toISOString(),
                is_whitelist: false,
                require_whitelist: false,
              }}
              isInWhitelist={true}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <BoxTypeCard
              boxType={box3}
              round={{
                id: 1,
                name: "",
                start: new Date().toISOString(),
                end: new Date().toISOString(),
                is_whitelist: false,
                require_whitelist: true,
              }}
              isInWhitelist={false}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <BoxTypeCard
              boxType={box3}
              round={{
                id: 1,
                name: "",
                start: new Date().toISOString(),
                end: new Date().toISOString(),
                is_whitelist: false,
                require_whitelist: true,
              }}
              isInWhitelist={true}
            />
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  );
};

export default CampaignDebug;
