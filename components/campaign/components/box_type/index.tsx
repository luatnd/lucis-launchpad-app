import React, { useMemo, useState } from "react";
import { Button, Form, InputNumber, notification, Progress } from "antd";
import s from "../Box/Box.module.sass";
import {
  GBoxType,
  GCurrency,
  GBoxPrice,
  GBoxCampaignRound,
} from "src/generated/graphql";
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
  const {
    loading,
    txtAmount,
    canBuyBox,
    err,
    onBuyBox,
    requireWhitelist,
    boxPrice,
  } = useBuyBox(boxType, round, isInWhitelist);

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="uppercase text-center text-white font-bold text-[24px] md:text-[36px]">
          {boxType.name}
        </h3>
      </div>

      <div className={`mt-5 h-[798px] ${s.boxDetail} relative`}>
        <div className={`${s.bgImage}`}>
          <img
            src={boxType.thumb_img ?? ""}
            width="340px"
            height="273px"
            className="mx-auto block pt-[60px]"
            alt=""
          />
        </div>

        <div className={`mx-auto absolute ${s.boxMain}`}>
          {
            <div className="flex gap-2">
              <div>
                <div className={s.boxDes} />
              </div>
              <p className="text-white text-18px">{boxType.desc}</p>
            </div>
          }

          {/*
          box.series_content must be html table in the database
          */}
          <div
            className={s.seriesContent}
            dangerouslySetInnerHTML={{ __html: boxType.series_content ?? "" }}
          />

          {canBuyBox && (
            <Form className={s.buyForm}>
              <div className="flex justify-between text-white font-bold text-24px mb-2">
                <Form.Item>
                  <label className={s.label}>Amount: </label>
                  <InputNumber
                    value={txtAmount.value}
                    onChange={txtAmount.onChange}
                  />
                </Form.Item>

                {boxType.limit_per_user != null && (
                  <span>Max: {boxType.limit_per_user}</span>
                )}
              </div>
              {!!txtAmount.err && (
                <span
                  style={{
                    color: "red",
                    fontSize: "13px",
                    marginBottom: "16px",
                  }}
                >
                  {txtAmount.err}
                </span>
              )}
              <div className="flex justify-between text-white items-center font-bold text-24px mb-2">
                <Button className={s.submit} onClick={onBuyBox}>
                  BUY
                </Button>
                {requireWhitelist && <span>Whitelist only</span>}
              </div>

              {!!err && (
                <span style={{ color: "red", fontSize: "13px" }}>{err}</span>
              )}
            </Form>
          )}

          <div className="font-bold text-white text-18px mt-[29px]">
            <div className="flex justify-between items-center">
              <span>Price per 1 box:</span>
              <div className="flex items-center gap-1">
                <img
                  src={boxPrice?.currency.icon ?? ""}
                  width="40px"
                  height="40px"
                  alt=""
                />
                <span>
                  {boxPrice?.price} {boxPrice?.currency.symbol}
                </span>
              </div>
            </div>
            <Progress
              percent={Math.floor(
                (boxType.sold_amount / boxType.total_amount) * 100
              )}
              showInfo={false}
              // status="active"
            />
            <p className="text-right">
              {`${boxType.sold_amount}/${boxType.total_amount}`} boxes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxTypeCard;
