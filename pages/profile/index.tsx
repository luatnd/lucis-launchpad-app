import DocHead from "components/DocHead";
import Footer from "components/Footer";
import { useState } from "react";
import { useQueryProfile } from "../../components/Profile/Hooks/useQueryProfile";
import s from "./index.module.sass";
import Box from "../../components/Profile/ProfileSocial";
import Contact from "../../components/Profile/ProfileContact";
import Info from "../../components/Profile/ProfileInfo";
import History from "components/Profile/History/History";
import TestHistoryTable from "components/TestHistoryTable/TestHistoryTable";
import { useQueryBoxHistories } from "components/Profile/Hooks/useQueryBoxHistories";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data, loading, error, refetch } = useQueryProfile();
  const {
    data: dataBoxHistories,
    loading: loadingBoxHistories,
    error: errorBoxHistories,
  } = useQueryBoxHistories({
    include: { boxTypes: true, game: true },
  });

  if (loading || loadingBoxHistories) {
    return <>Loading ...</>;
  }
  if (error || errorBoxHistories) {
    return <>Error...</>;
  }

  const props = { isEdit, setIsEdit, profile: data, refetch };
  const propsTable = {
    data: dataBoxHistories?.boxCampaignBuyHistories,
    loading: loadingBoxHistories,
    error: errorBoxHistories,
    title: "History",
  };

  return (
    <>
      <DocHead title="My Profile" />
      <div className={s.banner}>
        <img src="/assets/MyProfile/banner.png" alt="" />

        <div className="container">
          <Info {...props} />
          <Contact {...props} />
          <Box {...props} />
          <TestHistoryTable {...propsTable} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyProfile;
