import { Tabs } from "antd";
import SiteMap from "components/campaign/components/SiteMap/SiteMap";
import Footer from "components/Footer/Footer";
import BuyHistory from "components/HistoryTable/BuyHistory";
import { useRouter } from "next/router";
import { TabPane } from "rc-tabs";
import React, { useEffect, useMemo, useState } from "react";
import Banner from "../../components/campaign/components/Banner/Banner";
import BoxCard from "../../components/campaign/components/Box/Box";
import CountDown from "../../components/campaign/components/CountDown/CountDown";
import Team from "../../components/campaign/components/Team/Team";
import DocHead from "../../components/DocHead";
import { useDetailCampaign } from "../../hooks/campaign/useDetailCampaign";
import { useWindowSize } from "../../hooks/useWindowSize";
import s from "./detail.module.sass";
import { isClient } from "utils/DOM";

/**
 * Match all route: /campaign/....
 */
function DetailCampaign() {
  const router = useRouter();

  const campaignUid = useMemo(() => {
    const { slug } = router.query;
    if (slug) {
      return slug[0];
    }
    if (isClient) {
      const paths = router.asPath.split("/").filter((item) => item !== "");
      if (paths.length > 1) {
        return paths[1];
      }
    }
    return "";
  }, [router]);

  const [timeCountDown, setTimeCountDown] = useState(0);
  const [textNow, setTextNow] = useState("");
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [widthScreen, height] = useWindowSize();

  const {
    boxCampaign,
    isInWhitelist,
    purchasedBox,
    whitelistRegistered,
    whitelistRegisteredRecently,
  } = useDetailCampaign({
    box_campaign_uid: campaignUid,
  });

  return (
    <>
      <DocHead />

      <div className="lucis-container">
        <div className={s.containerApp}>
          <Banner boxCampaign={boxCampaign} />
          <Tabs defaultActiveKey="1" className={s.tabs}>
            <TabPane tab="TIMELINE" key="1">
              {boxCampaign?.rounds != null && (
                <SiteMap
                  rounds={boxCampaign?.rounds}
                  start={boxCampaign?.start}
                  end={boxCampaign?.end}
                  setTimeCountDown={setTimeCountDown}
                  setTextNow={setTextNow}
                  boxCampaignUid={campaignUid}
                  tzid={tzid}
                  widthScreen={widthScreen}
                  isInWhitelist={isInWhitelist}
                  whitelistRegistered={whitelistRegistered}
                  whitelistRegisteredRecently={whitelistRegisteredRecently}
                />
              )}

              {textNow.length > 0 && (
                <CountDown timeCountDown={timeCountDown} textNow={textNow} />
              )}

              {!!boxCampaign && (
                <BoxCard
                  boxCampaign={boxCampaign}
                  isInWhitelist={isInWhitelist}
                  purchasedBox={purchasedBox}
                />
              )}

              <div className="container">
                <BuyHistory id={campaignUid} title="recently bought" />
              </div>
            </TabPane>

            <TabPane tab="RULE" key="2">
              <div className="lucis-container mt-[40px!important]">
                {boxCampaign?.rules &&
                boxCampaign?.rules.substring(0, 8) !== "https://" ? (
                  <iframe
                    srcDoc={boxCampaign?.rules}
                    width="100%"
                    height="500px"
                  ></iframe>
                ) : (
                  <iframe
                    src={boxCampaign?.rules}
                    width="100%"
                    height="300px"
                  ></iframe>
                )}
              </div>
            </TabPane>

            <TabPane tab="ABOUT PROJECT" key="3">
              {/* <Trailer game={boxCampaign?.game} /> */}
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
