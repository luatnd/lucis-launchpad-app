import React from 'react';
import CountDown from './components/CountDown/CountDown';
import SiteMap from './components/SiteMap/SiteMap'
import Team from "./components/Team/Team";
import {Tabs} from "antd";
import {TabPane} from "rc-tabs";
import Trailer from "./components/Trailer/Trailer";
import Banner from "./components/Banner/Banner";

function DetailCampaign() {
    return (
        <div className='lucis-container'>
            <Banner />
            <Tabs defaultActiveKey="1">
                <TabPane tab="TIMELINE" key="1">
                    <SiteMap />
                    <CountDown />
                </TabPane>
                <TabPane tab="RULE" key="2">
                    hello rule
                </TabPane>
                <TabPane tab="ABOUT PROJECT" key="3">
                    <Trailer />
                    <Team />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default DetailCampaign;
