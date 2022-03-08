import React from 'react';
import { Button, Form, Input, InputNumber, Progress } from "antd";

import s from '../Box/Box.module.sass'
import { BoxType } from "src/generated/graphql";
import { getCurrentCampaignRound } from "../../CampaignHelper";
import { CurrencyAvatar } from "utils/blockchain/BlockChain";

type Props = {
  box: BoxType,
}
const CampaignBox = (props: Props) => {
  const {box} = props;

  const currentRound = getCurrentCampaignRound(box.campaign);
  const requireWhitelist = currentRound.require_whitelist;

  /**
   * In the future, we'll support selling box in multi currency (multi-chain) for 1 campaign
   * This is phase 1: We support selling box in 1 currency only in 1 campaign
   */
  const firstBoxPrice = box.prices![0];

  // TODO: from socket
  const sold_amount = box.sold_amount;
  const total_amount = box.total_amount;

  const userIsWhitelisted = true; // TODO:
  const userCanBuy = (requireWhitelist ? userIsWhitelisted : true)
    && (sold_amount < total_amount)
  ; // whitelist(if needed) && has not sold out
  const firstBoxPrice_CurrencyIcon = CurrencyAvatar[firstBoxPrice.currency.symbol] ?? CurrencyAvatar['undefined'];

  return (
    <div>
      <div className='flex justify-center'>
        <h3 className='uppercase text-center text-white font-bold text-[24px] md:text-[36px]'>{box.name}</h3>
      </div>
      <div className={`mt-5 h-[798px] ${s.boxDetail} relative`}>
        <div className={`${s.bgImage}`}>
          <img src={box.thumb_img ?? ''} width='340px' height='273px' className='mx-auto block pt-[60px]' alt="" />
        </div>
        <div className={`max-w-[340px] mx-auto absolute ${s.boxMain}`}>
          {<div className='flex gap-2'>
            <div>
              <div className={s.boxDes}/>
            </div>
            <p className='text-white text-18px'>{box.desc}</p>
          </div>}

          {/*
          box.series_content must be html table in the database
          */}
          <div className={s.seriesContent} dangerouslySetInnerHTML={{__html: box.series_content ?? ''}} />


          {userCanBuy && <Form className={s.buyForm}>
            <div className='flex justify-between text-white font-bold text-24px mb-2'>
              <Form.Item>
                <label className={s.label}>Amount: </label>
                <InputNumber />
              </Form.Item>
              <span>Max: {box.limit_per_user}</span>
            </div>
            <div className='flex justify-between text-white items-center font-bold text-24px mb-2'>
              <Button className={s.submit}>BUY</Button>
              {requireWhitelist && <span>Whitelist only</span>}
            </div>
          </Form>}

          <div className='font-bold text-white text-18px mt-[29px]'>
            <div className='flex justify-between items-center'>
              <span>Price per 1 box:</span>
              <div className='flex items-center gap-1'>
                <img src={firstBoxPrice_CurrencyIcon} width="40px" height="40px" alt="" />
                <span>{firstBoxPrice.price} {firstBoxPrice.currency.symbol}</span>
              </div>
            </div>
            <Progress
              percent={Math.floor(sold_amount / total_amount * 100)}
              showInfo={false}
              // status="active"
            />
            <p className='text-right'>{`${sold_amount}/${total_amount}`} boxes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBox;
