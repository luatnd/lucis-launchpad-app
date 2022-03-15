import DocHead from "components/DocHead";
import Footer from "components/Footer/Footer";
import BuyHistory from "components/HistoryTable/BuyHistory";
import { useState } from "react";
import { useQueryProfile } from "../../components/Profile/Hooks/useQueryProfile";
import Contact from "../../components/Profile/ProfileContact";
import Info from "../../components/Profile/ProfileInfo";
import Box from "../../components/Profile/ProfileSocial";
import s from "./index.module.sass";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data, loading, error, refetch } = useQueryProfile();

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
