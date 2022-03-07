import React from 'react';
import { Button, Form, Input, InputNumber, Progress } from "antd";
import s from '../Box/Box.module.sass'


const CampaignBox = () => {
  const e = {
    name: 'LEGENDARY BOX',
    image: '/assets/Box/image110.png',
    description: '',
    d1: [
      {name: '250 rare NFTs', number: '50%'},
      {name: '150 elite NFTs', number: '20%'},
      {name: '75 legendary NFTs', number: '25%'},
      {name: 'Network', number: 'BSC'}
    ]
  }

  return (
    <div>
      <div className='flex justify-center'>
        <h3 className='uppercase text-center text-white font-bold text-[24px] md:text-[36px]'>{e.name}</h3>
      </div>
      <div className={`mt-5 h-[798px] ${s.boxDetail} relative`}>
        <div className={`${s.bgImage}`}>
          <img src={e.image} width='340px' height='273px' className='mx-auto block pt-[60px]' alt="" />
        </div>
        <div className={`max-w-[340px] mx-auto absolute ${s.boxMain}`}>
          {e.description && <div className='flex gap-2'>
            <div>
              <div className={s.boxDes}></div>
            </div>
            <p className='text-white text-18px'>{e.description}</p>
          </div>}
          {e.d1.map((f, index) => (
            <div key={index} className='flex justify-between text-white font-bold text-24px mb-2'>
              <span>{f.name}</span>
              <span>{f.number}</span>
            </div>
          ))}
          {!e.description &&
          <Form>
            <div className='flex justify-between text-white font-bold text-24px mb-2'>
              <Form.Item>
                <label className={s.label}>Amount: </label>
                <InputNumber />
              </Form.Item>
              <span>Max:100</span>
            </div>
            <div className='flex justify-between text-white items-center font-bold text-24px mb-2'>
              <Button className={s.submit}>BUY</Button>
              <span>Whitelist only</span>
            </div>
          </Form>

          }
          <div className='font-bold text-white text-18px mt-[29px]'>
            <div className='flex justify-between items-center'>
              <span>Price per 1 box:</span>
              <div className='flex items-center gap-1'>
                <img src="/assets/Box/image125.png" width="40px" height="40px" alt="" />
                <span>16.79 BUSD</span>
              </div>
            </div>
            <Progress showInfo={false} />
            <p className='text-right'>0/100boxes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBox;
