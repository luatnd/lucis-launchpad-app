import DocHead from "components/DocHead";
import Footer from "components/Footer";
import { useState } from "react";
import { useQueryProfile } from "../../components/Profile/Hooks/useQueryProfile";
import s from "./index.module.sass";
import Box from "../../components/Profile/ProfileSocial";
import Contact from "../../components/Profile/ProfileContact";
import Info from "../../components/Profile/ProfileInfo";
import { useQueryBoxHistories } from "components/Profile/Hooks/useQueryBoxHistories";
import HistoryTable from "components/HistoryTable/HistoryTable";
import BuyHistory from "components/HistoryTable/BuyHistory";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data, loading, error, refetch } = useQueryProfile();

  if (loading) {
    return <>Loading ...</>;
  }
  if (error) {
    return <>Error...</>;
  }

  const props = { isEdit, setIsEdit, profile: data, refetch };

  return (
    <>
      <DocHead title="My Profile" />
      <div className={s.banner}>
        <img src="/assets/MyProfile/banner.png" alt="" />

        <div className="container">
          <Info {...props} />
          <Contact {...props} />
          <Box {...props} />
          <BuyHistory title="History" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyProfile;
