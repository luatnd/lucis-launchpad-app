import React from "react";
import CountDown from "../../components/campaign/components/CountDown/CountDown";
import SiteMap from "../../components/campaign/components/SiteMap/SiteMap";
import Team from "../../components/campaign/components/Team/Team";
import { Tabs } from "antd";
import { TabPane } from "rc-tabs";
import Trailer from "../../components/campaign/components/Trailer/Trailer";
import Banner from "../../components/campaign/components/Banner/Banner";
import Box from "../../components/campaign/components/Box/Box";

import s from "./detail.module.sass";
import RecentlyBought from "../../components/campaign/components/RecentlyBought/RecentlyBought";
import DocHead from "../../components/DocHead";
import Footer from "components/Footer";


function DetailCampaign() {

  return (
      <>
        <DocHead />
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
            <Footer/>
          </div>
        </div>
      </>

  );

}

export default DetailCampaign;
