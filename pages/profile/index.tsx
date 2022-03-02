import DocHead from "components/DocHead";
import Footer from "components/Footer";
import { useState } from "react";
import { useQueryProfile } from "../../hooks/profile/useQueryProfile";
import s from "./index.module.sass";
import Box from "./ProfileSocial";
import Contact from "./ProfileContact";
import Info from "./ProfileInfo";
import History from "./History/History";

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
          <History />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyProfile;
