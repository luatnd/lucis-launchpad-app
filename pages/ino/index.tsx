import DocHead from "components/DocHead";
import Footer from "components/Footer";
import Banner from "components/Ino/components/Banner/Banner";
import GotProject from "components/Ino/components/GotProject/GotProject";
import type { NextPage } from "next";
import s from "./index.module.sass";

const LucisDebugPage: NextPage = () => {
  return (
    <>
      <DocHead title="My Profile" />
      <Banner />
      <div className="lucis-container">
        <div className={s.containerApp}>
          <GotProject />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LucisDebugPage;
