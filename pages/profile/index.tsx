import { Tabs } from "antd";
import AffiliateTable from "components/AffiliateTable/AffiliateTable";
import DocHead from "components/DocHead";
import Footer from "components/Footer/Footer";
import BuyHistory from "components/HistoryTable/BuyHistory";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import AuthStore from "../../components/Auth/AuthStore";
import Contact from "../../components/Profile/ProfileContact";
import Info from "../../components/Profile/ProfileInfo";
import Social from "../../components/Profile/ProfileSocial";
import s from "./index.module.sass";

const { TabPane } = Tabs;

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const {
    name,
    address,
    balance,
    phone,
    email,
    discord,
    facebook,
    twitter,
    tele,
    code,
    token,
  } = AuthStore;

  const props = {
    isEdit,
    setIsEdit,
    name,
    address,
    balance,
    code,
    phone,
    email,
    discord,
    facebook,
    twitter,
    tele,
    token,
  };

  // console.log("Page", AuthStore);

  return (
    <>
      <DocHead title="My Profile" />
      <div className={s.banner}>
        <img src="/assets/MyProfile/banner.png" alt="" />

        {AuthStore.isLoggedIn ? (
          <div className={`${s.profileContainer} container`}>
            <Info {...props} />
            <Contact {...props} />
            <Social {...props} />
            <Tabs defaultActiveKey="1" className={`${s.tabProfile}`}>
              <TabPane tab="History" key="1">
                <BuyHistory title="History" {...props} />
              </TabPane>
              <TabPane tab="Refer" key="2">
                <AffiliateTable title="Refer history"/>
              </TabPane>
            </Tabs>
          </div>
        ) : (
          <h1
            className="py-[100px] md:py-[200px] text-24px md:text-36px text-center m-0"
            style={{ color: "white" }}
          >
            Please connect your wallet
          </h1>
        )}
      </div>

      <Footer />
    </>
  );
};

export default observer(MyProfile);
