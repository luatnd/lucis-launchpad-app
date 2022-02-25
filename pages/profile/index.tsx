import DocHead from "components/DocHead";
import Footer from "components/Footer";
import { useState } from "react";
import { useQueryProfile } from "../../hooks/profile/useQueryProfile";
import s from "./index.module.sass";
import Box from "./ProfileSocial";
import Contact from "./ProfileContact";
import Info from "./ProfileInfo";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data, loading, error } = useQueryProfile();
  const props = { isEdit, setIsEdit, profile: data };

  if (loading) {
    return <>Loading ...</>;
  }
  if (error) {
    return <>Error...</>;
  }

  return (
    <>
      <DocHead title="My Profile" />
      <div className={s.banner}>
        <img src="/assets/MyProfile/banner.png" alt="" />

        <div className="container">
          <Info {...props} />
          <Contact {...props} />
          <Box {...props} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyProfile;
