import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";
// import HotGame from "components/Games";
import useScroll from 'hooks/useScroll';
import UpComing from "./UpComingPage/UpcomingCampaign";
import Opening from "./OpeningCampaign/OpeningCampaign";
import ClosedCampaign from "./ClosedCampaign/ClosedCampaign";
import Footer from "components/Footer";
import DocHead from "../components/DocHead";

const Home: NextPage = () => {
  // useScroll()
  // const [showButton, setShowButton] = useState(false);
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (window.pageYOffset > 300) {
  //       setShowButton(true);
  //     } else {
  //       setShowButton(false);
  //     }
  //   });
  // }, []);
  //
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  return (
    <div className={styles.pageContainer}>
      <DocHead/>

      <UpComing />
      <Opening />
      <ClosedCampaign />
      <Footer />
      {/*{showButton && (*/}
      {/*  <button onClick={scrollToTop} className="btn-scrollTop">*/}
      {/*    &#8679;*/}
      {/*  </button>*/}
      {/*)}*/}
    </div>
  );
};

export default Home;
