import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import RecentlyBought from "components/campaign/components/RecentlyBought/RecentlyBought";
import Footer from "components/Footer";
import BuyHistory from "components/HistoryTable/BuyHistory";
import { TabPane } from "rc-tabs";
import Banner from "../../components/campaign/components/Banner/Banner";
import Box from "../../components/campaign/components/Box/Box";
import CountDown from "../../components/campaign/components/CountDown/CountDown";
import Team from "../../components/campaign/components/Team/Team";
import Trailer from "../../components/campaign/components/Trailer/Trailer";
import DocHead from "../../components/DocHead";
import s from "./detail.module.sass";
import { useDetailCampaign } from "../../hooks/campaign/useDetailCampaign";
import { useQueryBoxHistories } from "components/Profile/Hooks/useQueryBoxHistories";
import HistoryTable from "components/HistoryTable/HistoryTable";
import SiteMap from "components/campaign/components/SiteMap/SiteMap";

/**
 * Match all route: /campaign/....
 */
function DetailCampaign() {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug?.length ? slug[0] : undefined;
  const [timeCountDown, setTimeCountDown] = useState(0);

  const { data, loading, error, dataOpening } = useDetailCampaign();

  console.log("{DetailCampaign.render} campaign id: ", id);

  return (
    <>
      <DocHead />
      <div className="lucis-container">
        <div className={s.containerApp}>
          <Banner />
          <Tabs defaultActiveKey="1" className={s.tabs}>
            <TabPane tab="TIMELINE" key="1">
              {/* <SiteMap
                rounds={data?.campaignDetail?.rounds}
                start={data?.campaignDetail?.start}
                end={data?.campaignDetail?.end}
                setTimeCountDown={setTimeCountDown}
                isInWhitelist={dataOpening?.isInWhitelist}
              />
              <CountDown timeCountDown={timeCountDown} /> */}
              <Box />
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
