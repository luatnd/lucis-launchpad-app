import React from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import { TabPane } from "rc-tabs";

import CountDown from "../../components/campaign/components/CountDown/CountDown";
import SiteMap from "../../components/campaign/components/SiteMap/SiteMap";
import Team from "../../components/campaign/components/Team/Team";
import Trailer from "../../components/campaign/components/Trailer/Trailer";
import Banner from "../../components/campaign/components/Banner/Banner";
import Box from "../../components/campaign/components/Box/Box";

import s from "./detail.module.sass";
import RecentlyBought from "../../components/campaign/components/RecentlyBought/RecentlyBought";
import DocHead from "../../components/DocHead";
import Footer from "components/Footer";
import { useQueryBoxHistories } from "components/Profile/Hooks/useQueryBoxHistories";
import HistoryTable from "components/HistoryTable/HistoryTable";

/**
 * Match all route: /campaign/....
 */
function DetailCampaign() {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug?.length ? slug[0] : undefined;

  console.log("{DetailCampaign.render} campaign id: ", id);

  // TODO: Filter history box follow id
  const {
    data: dataBoxHistories,
    loading: loadingBoxHistories,
    error: errorBoxHistories,
  } = useQueryBoxHistories({
    include: { boxTypes: true, game: true },
  });
  if (loadingBoxHistories) {
    return <>Loading ...</>;
  }
  if (errorBoxHistories) {
    return <>Error...</>;
  }

  const propsTable = {
    data: dataBoxHistories?.boxCampaignBuyHistories,
    loading: loadingBoxHistories,
    error: errorBoxHistories,
    title: "RECENTLY BOUGHT",
  };

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
              {/*<RecentlyBought />*/}
              <div className="container">
                <HistoryTable {...propsTable} />
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
