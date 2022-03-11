import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import { TabPane } from "rc-tabs";

import DocHead from "../../components/DocHead";
import Footer from "components/Footer";
import BuyHistory from "components/HistoryTable/BuyHistory";
import Banner from "../../components/campaign/components/Banner/Banner";
import Box from "../../components/campaign/components/Box/Box";
import CountDown from "../../components/campaign/components/CountDown/CountDown";
import Team from "../../components/campaign/components/Team/Team";
import Trailer from "../../components/campaign/components/Trailer/Trailer";

import s from "./detail.module.sass";
import { useDetailCampaign } from "../../hooks/campaign/useDetailCampaign";
import BoxCard from "../../components/campaign/components/Box/Box";
import SiteMap from "components/campaign/components/SiteMap/SiteMap";

/**
 * Match all route: /campaign/....
 */
function DetailCampaign() {
  const router = useRouter();
  const { slug } = router.query;
  // const id = slug?.length ? slug[0] : undefined;
  const box_campaign_uid = "cl02lx5or0000doo018d7n2zz"; // TODO: ifx demo id
  const [timeCountDown, setTimeCountDown] = useState(0);
  const [textNow, setTextNow] = useState("");
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { boxCampaign, loading, error, isInWhitelist } = useDetailCampaign({ box_campaign_uid });

  return (
    <>
      <DocHead />
      <div className="lucis-container">
        <div className={s.containerApp}>
          <Banner />
          <Tabs defaultActiveKey="1" className={s.tabs}>
            <TabPane tab="TIMELINE" key="1">
              {boxCampaign?.rounds != null && (
                <SiteMap
                  rounds={boxCampaign?.rounds}
                  start={boxCampaign?.start}
                  end={boxCampaign?.end}
                  setTimeCountDown={setTimeCountDown}
                  isInWhitelist={isInWhitelist}
                  setTextNow={setTextNow}
                  boxCampaignUid={box_campaign_uid}
                  tzid={tzid}
                />
              )}
              {textNow.length > 0 && <CountDown timeCountDown={timeCountDown} textNow={textNow} />}
              {!!boxCampaign && <BoxCard boxCampaign={boxCampaign} isInWhitelist={isInWhitelist} />}
              <div className="container">
                <BuyHistory id={"cl02lx5or0000doo018d7n2zz"} title="recently bought" />
              </div>
            </TabPane>
            <TabPane tab="RULE" key="2">
              <div className="lucis-container mt-[168px]">
                <div
                  dangerouslySetInnerHTML={{ __html: boxCampaign?.rules }}
                  className={`${s.textSize} text-white mt-10 text-justify indent-8`}
                ></div>
              </div>
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
