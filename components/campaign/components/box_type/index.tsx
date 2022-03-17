import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputNumber,
  notification,
  Popconfirm,
  Progress,
  Tooltip,
} from "antd";
import s from "../Box/Box.module.sass";
import {
  GBoxType,
  GCurrency,
  GBoxPrice,
  GBoxCampaignRound,
  ChainSymbol,
  PurchasedBoxStatus,
} from "src/generated/graphql";
import { useInput } from "hooks/common/use_input";
import { BuyDisabledReason, useBuyBox } from "hooks/campaign/use_buy_box";
import { handleApolloError } from "utils/apollo_client";
import { observer } from "mobx-react-lite";
import ConnectWalletStore from "../../../Auth/ConnectWalletStore";
import {
  ChainNetwork,
  ChainNetworkAvatar,
  symbol2Network,
} from "../../../../utils/blockchain/BlockChain";
import { correctBoxShadow } from "framer-motion/types/projection";
import { currency } from "../../../../utils/Number";
import { AppEmitter } from "../../../../services/emitter";
import AuthStore from "../../../Auth/AuthStore";
import ApprovalStore from "../../../Auth/Blockchain/ApprovalStore";

type Props = {
  boxType: GBoxType;
  round?: GBoxCampaignRound;
  isInWhitelist?: boolean;
  purchasedBox?: GBoxType;
};

const BoxTypeCard = observer((props: Props) => {
  const { boxType, round, isInWhitelist } = props;
  const purchasedBox =
    props.purchasedBox?.uid == boxType.uid ? props.purchasedBox : null;
  const { chainNetwork } = ConnectWalletStore;
  const { isLoggedIn } = AuthStore;

  // TODO: Fetch refetch whitelist info after logged in status
  // change from false to true
  // use Mobx autorun

  const {
    loading,
    txtAmount,
    isSaleRound,
    buyFormEnabled,
    buyBtnDisabledReason,
    err,
    requireWhitelist,
    boxPrice,

    doBuyBox,
    requestAllowanceForBoxPrice,
    currencyEnabled,
  } = useBuyBox(boxType, round, isInWhitelist, chainNetwork, isLoggedIn);

  const supported_chains_avatars: {
    url: string;
    symbol: ChainSymbol;
  }[] =
    boxType.prices?.map((i) => ({
      url: ChainNetworkAvatar[
        symbol2Network(i.currency.chain_symbol) ?? "undefined"
      ],
      symbol: i.currency.chain_symbol,
    })) ?? [];

  const buyFormDisabledMsg: Record<BuyDisabledReason, string> = {
    [BuyDisabledReason.WalletNotConnected]:
      "you need to connect wallet in order to buy boxes",
    [BuyDisabledReason.SoldOut]: "Sold out",
    [BuyDisabledReason.WhitelistNotRegistered]:
      "This box is for whitelisted user only",
    [BuyDisabledReason.NotSaleRound]: "Please wait the campaign open",
  };

  const showConnectWalletModal = useCallback(() => {
    AppEmitter.emit("showConnectWalletModal");
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <h3
          className="uppercase text-center text-white font-bold text-[24px] lg:text-[36px]"
          style={{ whiteSpace: "nowrap" }}
        >
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
              <p className="text-white text-14px md:text-[16px]">
                {boxType.desc}
              </p>
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
              {supported_chains_avatars.map((i, idx) => (
                <img key={idx} src={i.url} alt="" title={i.symbol} />
              ))}
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
                    <span>Amount: </span>
                    <br />
                    {boxType.limit_per_user != null && (
                      <span className={s.max}>
                        Max: {boxType.limit_per_user}
                      </span>
                    )}
                  </label>
                  <InputNumber
                    controls={false}
                    value={txtAmount.value}
                    onChange={txtAmount.onChange}
                  />
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
                {!buyFormEnabled ? (
                  // if btn is disable, show tooltip
                  <Tooltip
                    placement="top"
                    title={
                      buyBtnDisabledReason !== undefined
                        ? buyFormDisabledMsg[buyBtnDisabledReason]
                        : ""
                    }
                  >
                    <div>
                      <Button className={s.submit} disabled={true}>
                        BUY
                      </Button>
                    </div>
                  </Tooltip>
                ) : !isLoggedIn ? (
                  // if wallet was not connected => popconfirm
                  <Popconfirm
                    title={
                      <span>
                        You need to {chainNetwork ? "verify" : "connect"} wallet
                        <br /> in order to buy this box
                      </span>
                    }
                    onConfirm={showConnectWalletModal}
                    // onCancel={cancel}
                    okText={chainNetwork ? "Verify Wallet" : "Connect Wallet"}
                    cancelText="Close"
                  >
                    <div>
                      <Button className={s.submit} loading={loading}>
                        BUY
                      </Button>
                    </div>
                  </Popconfirm>
                ) : !currencyEnabled ? (
                  <Button
                    className={s.submitApproval}
                    onClick={requestAllowanceForBoxPrice}
                  >
                    Enable {boxPrice?.currency.symbol}
                  </Button>
                ) : (
                  <Button
                    className={s.submit}
                    onClick={doBuyBox}
                    loading={loading}
                  >
                    BUY
                  </Button>
                )}

                {requireWhitelist && (
                  <span style={{ paddingLeft: 20, lineHeight: 1.3 }}>
                    Whitelist only
                  </span>
                )}
              </div>

              {/*{buyBtnDisabledReason === BuyDisabledReason.SoldOut &&*/}
              {/*<p style={{paddingLeft: 20, lineHeight: 1.3}}>Sold out</p>}*/}

              {!!err && (
                <span style={{ color: "red", fontSize: "13px" }}>{err}</span>
              )}
            </Form>
          )}

          <div className="font-bold text-white text-18px mt-[29px]">
            <div className="flex justify-between items-center">
              <span>Price per 1 box:</span>
              <div className="flex items-center justify-end gap-1">
                <img
                  src={
                    boxPrice?.currency.icon ??
                    "/assets/crypto/ico-question-mark.png"
                  }
                  width="40px"
                  height="40px"
                  alt=""
                />
                <span>
                  {currency(boxPrice?.price, 2)} {boxPrice?.currency.symbol}
                </span>
              </div>
            </div>
            <Progress
              percent={Math.floor(
                (boxType.sold_amount / boxType.total_amount) * 100
              )}
              showInfo={false}
              // status="active"
              strokeColor={
                boxType.sold_amount < boxType.total_amount
                  ? "#0BEBD6"
                  : undefined
              }
              strokeWidth={10}
            />
            <div className={s.flexRear}>
              <p>Sold</p>
              <p className="text-right">
                {`${purchasedBox?.sold_amount ?? boxType.sold_amount}/${
                  purchasedBox?.total_amount ?? boxType.total_amount
                }`}{" "}
                boxes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BoxTypeCard;
