import type { NextPage } from "next";
import DocHead from "../../components/DocHead";
import s from "./detail.module.sass";
import Banner from "../../components/campaign/components/Banner/Banner";
import { Col, Row, Tabs } from "antd";
import { TabPane } from "rc-tabs";
import Footer from "../../components/Footer";
import React from "react";
import CampaignBox from "../../components/campaign/components/CampaignBox";

/**
 * This has no function in project
 * BUT This is for static site generation
 * To support static generation of: /campaign/index.html
 * Match route: /campaign
 */
const CampaignDebug: NextPage = () => {
  return (
    <>
      <DocHead title={"Draft Page for campaign"}/>
      <div className='lucis-container'>
        <div className={s.containerApp} style={{paddingTop: 100}}>
          <Row gutter={[24, 50]} className='justify-center'>
            <Col>
              <CampaignBox/>
            </Col>
            <Col>
              <CampaignBox/>
            </Col>
            <Col>
              <CampaignBox/>
            </Col>
          </Row>

          <Footer/>
        </div>
      </div>
    </>
  );
};

export default CampaignDebug
