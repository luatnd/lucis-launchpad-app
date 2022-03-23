import { useState } from "react";
import s from "./GotProject.module.sass";
import ModalContact from "./ModalContact";

const GotProject = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpen = () => {
    setIsModalVisible(true);
  };
  const modalProps = { handleOk, handleCancel, isModalVisible };

  return (
    <div className={s.projectContainer}>
      <p className="text-center text-[16px] md:text-[26px] lg:text-[36px] font-[600]">
        Got a Project?
      </p>
      <div className={s.line}></div>
      <p className="text-center text-[14px] md:text-[16px]">
        Apply for an INO on Lucis Launchpad, submit your project and get a
        response within 24 hours
      </p>

      <div className={`${s.buttonContainer}`}>
        <a
          href="https://forms.gle/GyCuu9543vQuHMV78"
          target="_blank"
          rel="noopener noreferrer"
          className={s.applyBtn}
        >
          Apply Now
        </a>
        <button className={s.contactBtn} onClick={handleOpen}>
          Contact Us
        </button>
      </div>

      <p className="text-center text-[14px] md:text-[16px]">
        Follow our official telegram channel below. Please double check if you
        receive any emails
      </p>
      <div className={`${s.buttonContainer}`}>
        <a
          className={`${s.teleBtn}`}
          href="https://t.me/lucislaunchpad_support"
          target="_blank"
          rel="noreferrer"
        >
          <img className="mr-[4px]" src="/assets/UpComing/tele.svg" alt="" />{" "}
          t.me/openware
        </a>
        {/* <img src="/assets/MyProfile/teleChat.svg" alt="" /> */}
      </div>
      <ModalContact {...modalProps} />
    </div>
  );
};

export default GotProject;
