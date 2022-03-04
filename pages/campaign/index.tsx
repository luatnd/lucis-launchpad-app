import React from "react";
import CountDown from "./components/CountDown/CountDown";
import SiteMap from "./components/SiteMap/SiteMap";
import Team from "./components/Team/Team";
import { Tabs } from "antd";
import { TabPane } from "rc-tabs";
import Trailer from "./components/Trailer/Trailer";
import Banner from "./components/Banner/Banner";
import Box from "./components/Box/Box";

import s from "./detail.module.sass";
import RecentlyBought from "./components/RecentlyBought/RecentlyBought";

function DetailCampaign() {
  return (
    <div className='lucis-container'>
      <div className={s.containerApp}>
        <Banner />
        <Tabs defaultActiveKey='1' className={s.tabs}>
          <TabPane tab='TIMELINE' key='1'>
            <SiteMap />
            <CountDown />
            <Box />
            {/*<RecentlyBought />*/}
          </TabPane>
          <TabPane tab='RULE' key='2'>
            hello rule
          </TabPane>
          <TabPane tab='ABOUT PROJECT' key='3'>
            <Trailer />
            <Team />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );

}

export default DetailCampaign;
