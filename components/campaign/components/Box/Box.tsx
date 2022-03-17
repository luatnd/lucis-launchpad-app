import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Progress,
} from "antd";

import s from "./Box.module.sass";
import {
  GBoxCampaign,
  GBoxType,
  PurchasedBoxStatus,
} from "src/generated/graphql";
import BoxTypeCard from "../box_type";
import { getOriginCurrentCampaignRound } from "components/campaign/CampaignHelper";

export const Box = () => {
  const listBox = [
    {
      name: "COMMON BOX",
      image: "/assets/Box/image107.png",
      description:
        "Common box includes 5 upgradable NFT monsters that can be used in all game modes",
      d1: [
        { name: "250 rare NFTs", number: "50%" },
        { name: "150 elite NFTs", number: "20%" },
        { name: "75 legendary NFTs", number: "25%" },
        { name: "Network", number: "BSC" },
      ],
    },
    {
      name: "EPIC BOX",
      image: "/assets/Box/image109.png",
      description:
        "Common box includes 5 upgradable NFT monsters that can be used in all game modes",
      d1: [
        { name: "250 rare NFTs", number: "50%" },
        { name: "150 elite NFTs", number: "20%" },
        { name: "75 legendary NFTs", number: "25%" },
        { name: "Network", number: "BSC" },
      ],
    },
    {
      name: "LEGENDARY BOX",
      image: "/assets/Box/image110.png",
      description: "",
      d1: [
        { name: "250 rare NFTs", number: "50%" },
        { name: "150 elite NFTs", number: "20%" },
        { name: "75 legendary NFTs", number: "25%" },
        { name: "Network", number: "BSC" },
      ],
    },
  ];
  return (
    <div className="lucis-container mt-[116px]">
      <Row gutter={[24, 50]} className="justify-center">
        {listBox.map((e, index) => (
          <Col key={index} xs={24} md={12} lg={8}>
            <div className="flex justify-center">
              <h3 className="uppercase text-center text-white font-bold text-[24px]">
                {e.name}
              </h3>
            </div>

            <div className={s.boxContainer}>
              <div className={s.boxImage}>
                <img src={e.image} className="mx-auto block pt-[60px]" alt="" />

                <div className={s.boxContent}>
                  {e.description && (
                    <div className="flex gap-2">
                      <div>
                        <div className={s.dotBlue}></div>
                      </div>
                      <p className="text-white text-14px">{e.description}</p>
                    </div>
                  )}

                  {e.d1.map((f, index) => (
                    <div
                      key={index}
                      className={`${
                        index === 3 ? "mt-6 mb-2" : "mb-2"
                      } flex justify-between text-white font-bold text-18px md:text-[24px]`}
                    >
                      <span>{f.name}</span>
                      <span>{f.number}</span>
                    </div>
                  ))}

                  {!e.description && (
                    <Form>
                      <Form.Item>
                        <div className="flex justify-between text-white font-bold text-24px mb-2">
                          <span>Amount: </span>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                            }}
                          >
                            <InputNumber
                              min={0}
                              style={{ background: "none", color: "white" }}
                            />
                            <label>Max 100</label>
                          </div>
                          {/* <span>Max:100</span> */}
                        </div>
                      </Form.Item>
                      <div className="flex justify-between text-white items-center font-bold text-24px mb-2">
                        <button className={`${s.buyBtn} bg-gradient-1`}>
                          BUY
                        </button>
                        <span>Whitelist only</span>
                      </div>
                    </Form>
                  )}

                  <div className="font-bold text-white mt-[29px]">
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-16px">Price per 1 box:</span>
                      <div
                        className={`${s.priceContainer} flex items-center gap-1`}
                      >
                        <img
                          src="/assets/Box/image125.png"
                          width="40px"
                          height="40px"
                          alt=""
                        />
                        <span>16.79 BUSD</span>
                      </div>
                    </div>
                    <Progress showInfo={false} />
                    <p className="text-right">0/100boxes</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

type BoxCardProps = {
  boxCampaign: GBoxCampaign;
  isInWhitelist?: boolean;
  purchasedBox?: GBoxType;
};

export default function BoxCard(props: BoxCardProps) {
  const boxTypes = props.boxCampaign.boxTypes ?? [];
  const currentRound = getOriginCurrentCampaignRound(props.boxCampaign);

  return (
    <div className="lucis-container mt-[116px]">
      <Row gutter={[24, 50]} className="justify-center">
        {boxTypes.map((e, index) => (
          <Col key={index} xs={24} md={12} lg={8}>
            <BoxTypeCard
              boxType={e}
              round={currentRound}
              isInWhitelist={props.isInWhitelist}
              purchasedBox={props.purchasedBox}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
