import DocHead from "components/DocHead";
import Footer from "components/Footer";
import { useState } from "react";
import { useQueryProfile } from "../../hooks/profile/useQueryProfile";
import s from "./index.module.sass";
import Box from "../../components/profile/ProfileSocial";
import Contact from "../../components/profile/ProfileContact";
import Info from "../../components/profile/ProfileInfo";
import History from "components/profile/History/History";

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

  console.log(data);

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
