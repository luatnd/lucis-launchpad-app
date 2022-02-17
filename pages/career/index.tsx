import { useEffect, useState } from "react";
import type { NextPage } from "next";
import s from "./index.module.sass";
import DocHead from '../../components/DocHead'


const Career: NextPage = () => {
  return (
    <section className="lucis-container">
      <DocHead title="Career"/>

      <div className={`${s.container} section-content`}>
        <h1>Lucis Careers</h1>

        <div className={s.block}>
          <h3>Production</h3>
          <div className={s.content}>
            <ul className={s.jobs}>
              <li><a href="/career/Lucis-JD-BE.html" target="_blank">Backend Engineer</a></li>
              <li><a href="/career/Lucis-JD-FE.html" target="_blank">Frontend Engineer</a></li>
              <li><a href="#">Technical Talent Acquisition & Recruiting Specialist</a></li>
              <li><a href="#">NEAR (Rust) & BSC (Solidity) Developer</a></li>
            </ul>
            <p>Contact Email: <i>huyennp@lucis.network</i></p>
          </div>
        </div>

        <div className={s.block}>
          <h3>Media and Gaming</h3>
          <div className={s.content}>
            <p>Contact Email: <i>linhntt@lucis.network</i></p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Career