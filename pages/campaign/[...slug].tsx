import { Tabs } from "antd";
import RecentlyBought from "components/campaign/components/RecentlyBought/RecentlyBought";
import Footer from "components/Footer";
import BuyHistory from "components/HistoryTable/BuyHistory";
import { useRouter } from "next/router";
import { TabPane } from "rc-tabs";
import React from "react";
import Banner from "../../components/campaign/components/Banner/Banner";
import Box from "../../components/campaign/components/Box/Box";
import CountDown from "../../components/campaign/components/CountDown/CountDown";
import SiteMap from "../../components/campaign/components/SiteMap/SiteMap";
import Team from "../../components/campaign/components/Team/Team";
import Trailer from "../../components/campaign/components/Trailer/Trailer";
import DocHead from "../../components/DocHead";
import s from "./detail.module.sass";

/**
 * Match all route: /campaign/....
 */
function DetailCampaign() {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug?.length ? slug[0] : undefined;

  console.log("{DetailCampaign.render} campaign id: ", id);

  return (
    <>
      <DocHead />
      <div className="lucis-container">
        <div className={s.containerApp}>
          <Banner />
          <Tabs defaultActiveKey="1" className={s.tabs}>
            <TabPane tab="TIMELINE" key="1">
              <SiteMap />
              <CountDown />
              <Box />
              <RecentlyBought />
              <div className="container">
                <BuyHistory id={id} title="recently bought" />
              </div>
            </TabPane>
            <TabPane tab="RULE" key="2">
              hello rule
            </TabPane>
            <TabPane tab="ABOUT PROJECT" key="3">
              <Trailer />
              <Team />
            </TabPane>
          </Tabs>
          <Footer />
        </div>
      </div>
    </>
  );
}

/**
 * For Static site generation
 * We render no file here
 */
// export async function getStaticPaths() {
//   // const paths = [
//   //   {params: {slug: ['index']}},
//   // ]
//
//   return {
//     paths: [],
//     fallback: true,
//   }
// }
//
// export async function getStaticProps({params}: any) {
//   return {
//     props: {},
//   }
// }

export default DetailCampaign;
