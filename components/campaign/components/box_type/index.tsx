import React, { useMemo, useState } from "react";
import { Button, Form, InputNumber, Progress } from "antd";
import s from "../Box/Box.module.sass";
import { GChain, GBoxType, GCurrency, GBoxPrice, GBoxCampaignRound } from "src/generated/graphql";
import { useInput } from "hooks/common/use_input";
import { useBuyBox } from "hooks/campaign/use_buy_box";
import { handleApolloError } from "utils/apollo_client";

type Props = {
  boxType: GBoxType;
  round?: GBoxCampaignRound;
  isInWhitelist?: boolean;
  onBuyBox?: () => void;
};

const BoxTypeCard = (props: Props) => {
  const { boxType, round, isInWhitelist } = props;
  const { loading, txtAmount, canBuyBox, err, onBuyBox, requireWhitelist, boxPrice } = useBuyBox(
    boxType,
    round,
    isInWhitelist
  );

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="uppercase text-center text-white font-bold text-[24px] md:text-[36px]">
          {boxType.name}
        </h3>
      </div>

      <div className={s.boxContainer}>
        <div className={s.boxImage}>
          <img src={boxType.thumb_img ?? ""} className="mx-auto block pt-[60px]" alt="" />

          <div className={s.boxContent}>
            {boxType.desc && (
              <div className="flex gap-2">
                <div>
                  <div className={s.dotBlue}></div>
                </div>
                <p className="text-white text-14px">{boxType.desc}</p>
              </div>
            )}

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
                    <InputNumber min={0} style={{ background: "none", color: "white" }} />
                    <label>Max 100</label>
                  </div>
                </div>
              </Form.Item>
              <div className="flex justify-between text-white items-center font-bold text-24px mb-2">
                <button className={`${s.buyBtn} bg-gradient-1`}>BUY</button>
                <span>Whitelist only</span>
              </div>
            </Form>

            <div className="font-bold text-white mt-[29px]">
              <div className="flex justify-between items-center">
                <span className="text-16px">Price per 1 box:</span>
                <div className={`${s.priceContainer} flex items-center gap-1`}>
                  <img src="/assets/Box/image125.png" width="40px" height="40px" alt="" />
                  <span>16.79 BUSD</span>
                </div>
              </div>
              <Progress showInfo={false} />
              <p className="text-right">0/100boxes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxTypeCard;
