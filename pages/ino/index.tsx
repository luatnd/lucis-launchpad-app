import DocHead from "components/DocHead";
import Footer from "components/Footer/Footer";
import Banner from "components/Ino/components/Banner/Banner";
import Content from "components/Ino/components/Content/Content";
import GotProject from "components/Ino/components/GotProject/GotProject";
import type { NextPage } from "next";
import s from "./index.module.sass";

const LucisDebugPage: NextPage = () => {
  return (
    <>
      <DocHead title="Apply for INO" />
      <Banner />
      <div className="container">
        <div className={s.containerApp}>
          <GotProject />
          <Content />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LucisDebugPage;
