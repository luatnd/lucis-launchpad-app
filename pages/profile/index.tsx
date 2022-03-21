import DocHead from "components/DocHead";
import Footer from "components/Footer/Footer";
import BuyHistory from "components/HistoryTable/BuyHistory";
import { useEffect, useState } from "react";
import { useQueryProfile } from "../../components/Profile/Hooks/useQueryProfile";
import Contact from "../../components/Profile/ProfileContact";
import Info from "../../components/Profile/ProfileInfo";
import Box from "../../components/Profile/ProfileSocial";
import s from "./index.module.sass";
import AuthStore from "../../components/Auth/AuthStore";
import { observer } from "mobx-react-lite";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const props = { isEdit, setIsEdit };

  return (
    <>
      <DocHead title="My Profile" />
      <div className={s.banner}>
        <img src="/assets/MyProfile/banner.png" alt="" />

        {AuthStore.isLoggedIn ? (
          <div className={`${s.profileContainer} container`}>
            <Info {...props} />
            <Contact {...props} />
            <Box {...props} />
            <BuyHistory title="History" />{" "}
          </div>
        ) : (
          <h1
            className="py-[100px] md:py-[200px] text-24px md:text-36px text-center m-0"
            style={{ color: "white" }}
          >
            Please connect wallet
          </h1>
        )}
        <Footer />
      </div>
    </>
  );
};

export default observer(MyProfile);
