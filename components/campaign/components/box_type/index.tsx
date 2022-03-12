import React, { useMemo, useState } from "react";
import {Button, Form, InputNumber, notification, Progress, Tooltip} from "antd";
import s from "../Box/Box.module.sass";
import {
  GBoxType,
  GCurrency,
  GBoxPrice,
  GBoxCampaignRound, ChainSymbol,
} from "src/generated/graphql";
import { useInput } from "hooks/common/use_input";
import {BuyDisabledReason, useBuyBox} from "hooks/campaign/use_buy_box";
import { handleApolloError } from "utils/apollo_client";
import {observer} from "mobx-react-lite";
import ConnectWalletStore from "../../../Auth/ConnectWalletStore";
import {ChainNetwork, ChainNetworkAvatar, symbol2Network} from "../../../../utils/blockchain/BlockChain";
import {correctBoxShadow} from "framer-motion/types/projection";
import {currency} from "../../../../utils/Number";

type Props = {
  boxType: GBoxType;
  round?: GBoxCampaignRound;
  isInWhitelist?: boolean;
  onBuyBox?: () => void;
};

const BoxTypeCard = observer((props: Props) => {
  const { boxType, round, isInWhitelist } = props;
  const { chainNetwork } = ConnectWalletStore;
  const {
    loading,
    txtAmount,
    isSaleRound,
    buyFormEnabled,
    buyFormDisabledReason,
    err,
    onBuyBox,
    requireWhitelist,
    boxPrice,
  } = useBuyBox(boxType, round, isInWhitelist, chainNetwork);

  const supported_chains_avatars: {
    url: string,
    symbol: ChainSymbol,
  }[] = boxType.prices?.map(i => ({
    url: ChainNetworkAvatar[symbol2Network(i.currency.chain_symbol) ?? 'undefined'],
    symbol: i.currency.chain_symbol,
  })) ?? [];

  const buyFormDisabledMsg = {
    [BuyDisabledReason.NoBoxLeft]: 'Sold out',
    [BuyDisabledReason.WhitelistNotRegistered]: 'This box is for whitelisted user only',
  }

  return (
    <div>
      <div className="flex justify-center">
        <h3 className="uppercase text-center text-white font-bold text-[24px] md:text-[36px]">
          {boxType.name}
        </h3>
      </div>

      <div className={`mt-5 ${s.boxDetail}`}>
        <div className={`${s.bgImage}`}>
          <img
            src={boxType.thumb_img ?? ""}
            width="340px"
            height="273px"
            className="mx-auto"
            alt=""
          />
        </div>

        <div className={`mx-auto ${s.boxMain}`}>
          {boxType.desc && (
            <div className="flex gap-3 py-[15px]">
              <div>
                <div className={s.boxDes} />
              </div>
              <p className="text-white text-14px md:text-[16px]">{boxType.desc}</p>
            </div>
          )}

          {/*
          box.series_content must be html table in the database
          */}
          <div
            className={s.seriesContent}
            dangerouslySetInnerHTML={{ __html: boxType.series_content ?? "" }}
          />

          <div className="flex justify-between text-white font-bold text-24px mb-2">
            <span>Chain</span>
            <div className={s.chainIcoC}>
              {supported_chains_avatars
                .map(i => <img src={i.url} alt="" title={i.symbol} />)
              }
            </div>
          </div>

          {/*
          - Show buy form when sale open
          - Form was disabled if user have not meet buy condition
          */}
          {isSaleRound && (
            <Form className={s.buyForm}>
              <div className={`text-white font-bold text-24px mb-2`}>
                <Form.Item className={s.inputRow}>
                  <label className={s.label}>
                    <span>Amount: </span><br/>
                    {boxType.limit_per_user != null &&
                      <span className={s.max}>Max: {boxType.limit_per_user}</span>
                    }
                  </label>
                  <InputNumber value={txtAmount.value} onChange={txtAmount.onChange} />
                </Form.Item>
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
              <div className="flex justify-between text-white items-center font-bold text-24px mb-2 mt-5">
                <Tooltip placement="top" title={buyFormDisabledReason ? buyFormDisabledMsg[buyFormDisabledReason] : ''}>
                  <Button
                    className={s.submit} onClick={onBuyBox}
                    disabled={!buyFormEnabled}
                  >
                    BUY
                  </Button>
                </Tooltip>
                {requireWhitelist && <span style={{paddingLeft: 20, lineHeight: 1.3}}>Whitelist only</span>}
              </div>

              {!!err && <span style={{ color: "red", fontSize: "13px" }}>{err}</span>}
            </Form>
          )}

          <div className="font-bold text-white text-18px mt-[29px]">
            <div className="flex justify-between items-center">
              <span>Price per 1 box:</span>
              <div className="flex items-center justify-end gap-1">
                <img
                  src={boxPrice?.currency.icon ?? "/assets/crypto/ico-question-mark.png"}
                  width="40px" height="40px" alt=""
                />
                <span>
                  {currency(boxPrice?.price, 2)} {boxPrice?.currency.symbol}
                </span>
              </div>
            </div>
            <Progress
              percent={Math.floor((boxType.sold_amount / boxType.total_amount) * 100)}
              showInfo={false}
              // status="active"
            />
            <p className="text-right">{`${boxType.sold_amount}/${boxType.total_amount}`} boxes</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BoxTypeCard;
