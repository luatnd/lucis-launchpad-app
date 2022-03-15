import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import { TabPane } from "rc-tabs";

import DocHead from "../../components/DocHead";
import Footer from "components/Footer/Footer";
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
import { useWindowSize } from "../../hooks/useWindowSize";

/**
 * Match all route: /campaign/....
 */
function DetailCampaign() {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug?.length ? slug[0] : undefined;

  const [timeCountDown, setTimeCountDown] = useState(0);
  const [textNow, setTextNow] = useState("");
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [widthScreen, height] = useWindowSize();

  const { boxCampaign, isInWhitelist } = useDetailCampaign({ box_campaign_uid: id });

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
                  setTextNow={setTextNow}
                  boxCampaignUid={id ?? ""}
                  tzid={tzid}
                  widthScreen={widthScreen}
                />
              )}
              {textNow.length > 0 && <CountDown timeCountDown={timeCountDown} textNow={textNow} />}
              {!!boxCampaign && <BoxCard boxCampaign={boxCampaign} isInWhitelist={isInWhitelist} />}
              <div className="container">
                <BuyHistory id={id} title="recently bought" />
              </div>
            </TabPane>
            <TabPane tab="RULE" key="2">
              <div className="lucis-container mt-[40px!important]">
                {boxCampaign?.rules && boxCampaign?.rules.substring(0, 8) !== "https://" ? (
                  <iframe srcDoc={boxCampaign?.rules} width="100%"></iframe>
                ) : (
                  <iframe src={boxCampaign?.rules} width="100%"></iframe>
                )}
              </div>
            </TabPane>
            <TabPane tab="ABOUT PROJECT" key="3">
              <Trailer game={boxCampaign?.game} />
              <Team game={boxCampaign?.game} />
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
