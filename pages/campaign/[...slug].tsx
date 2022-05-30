import { Tabs } from "antd";
import RecentlyBought from "components/campaign/components/RecentlyBought/RecentlyBought";
import SiteMap from "components/campaign/components/SiteMap/SiteMap";
import Footer from "components/Footer/Footer";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { TabPane } from "rc-tabs";
import React, { useEffect, useMemo, useState } from "react";
import { isClient } from "utils/DOM";
import AuthStore from "../../components/Auth/AuthStore";
import Banner from "../../components/campaign/components/Banner/Banner";
import BoxCard from "../../components/campaign/components/Box/Box";
import CountDown from "../../components/campaign/components/CountDown/CountDown";
import Team from "../../components/campaign/components/Team/Team";
import DocHead from "../../components/DocHead";
import { useDetailCampaign } from "../../hooks/campaign/useDetailCampaign";
import { useWindowSize } from "../../hooks/useWindowSize";
import s from "./detail.module.sass";
import { isEmpty } from "lodash";

/**
 * Match all route: /campaign/....
 */
function DetailCampaign() {
  const router = useRouter();

  const { token, id } = AuthStore;

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
    recentlyPurchasedBox,
    whitelistRegistered,
    whitelistRegisteredRecently,
    historiesBox,
    boxCampaignDetailSubcription,
    newBoxCampaignRef,

    refetchBoxCampaignDetailSubcription,
    refetchBoxHistory,
    refetchIsInWhiteList,
  } = useDetailCampaign({
    box_campaign_uid: campaignUid,
    user_id: Number(id),
    skip: isEmpty(campaignUid),
  });

  useEffect(() => {
    if (router?.query && router?.query?.r && campaignUid && AuthStore.isLoggedIn) {
      newBoxCampaignRef({
        variables: {
          box_campaign_uid: campaignUid,
          ref: router?.query?.r ? router?.query?.r : "",
        },
        onError: () => {
          console.warn("Ref existed");
        },
      });
    }
  }, [router, campaignUid, AuthStore.isLoggedIn]);

  const clickToAbout = (key: any) => {
    if (key == 3) {
      if (widthScreen >= 1280) {
        window.scrollTo({ top: 750, behavior: "smooth" });
      } else if (widthScreen >= 767) {
        window.scrollTo({ top: 672, behavior: "smooth" });
      } else if (widthScreen >= 540) {
        window.scrollTo({ top: 386, behavior: "smooth" });
      } else if (widthScreen > 0) {
        window.scrollTo({ top: 430, behavior: "smooth" });
      }
    }
  };

  // const temp = JSON.parse(JSON.stringify(historiesBox));
  // // recentlyPurchasedBox && temp.push(recentlyPurchasedBox);
  // console.log(temp.push(recentlyPurchasedBox));

  return (
    <>
      <DocHead />

      <div className="lucis-container">
        <div className={s.containerApp} style={{ scrollBehavior: "smooth" }}>
          <Banner
            boxCampaign={boxCampaign}
            isSubcribed={boxCampaignDetailSubcription}
            refetch={refetchBoxCampaignDetailSubcription}
            token={token}
          />
          {boxCampaign && (
            <div className={s.tabContainer}>
              <Tabs
                defaultActiveKey="1"
                className={s.tabs}
                onTabClick={clickToAbout}
              >
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
                      refetch={refetchIsInWhiteList}
                      token={token}
                    />
                  )}

                  {textNow.length > 0 && (
                    <CountDown
                      timeCountDown={timeCountDown}
                      textNow={textNow}
                    />
                  )}

                  {!!boxCampaign && (
                    <BoxCard
                      boxCampaign={boxCampaign}
                      isInWhitelist={isInWhitelist}
                      purchasedBox={purchasedBox}
                      // recentlyPurchasedBox={recentlyPurchasedBox}
                    />
                  )}

                  {AuthStore.isLoggedIn &&
                    // <div className="container">
                    //   <BuyHistory id={campaignUid} title="recently bought" />
                    // </div>
                    historiesBox && (
                      <RecentlyBought
                        historiesBox={historiesBox}
                        recentlyPurchasedBox={recentlyPurchasedBox}
                        token={token}
                        refetch={refetchBoxHistory}
                      />
                    )}
                </TabPane>

                <TabPane tab="RULE" key="2">
                  <div className="lucis-container mt-[40px]">
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
                        height="200px"
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
          )}
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

export default observer(DetailCampaign);
