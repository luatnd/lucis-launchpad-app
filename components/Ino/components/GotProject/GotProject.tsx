import s from "./GotProject.module.sass";

const GotProject = () => {
  return (
    <div className={s.projectContainer}>
      <p className="text-center text-[16px] md:text-[26px] lg:text-[36px] font-[600]">
        Got a Project?
      </p>
      <div className={s.line}></div>
      <p className="text-center text-[14px] md:text-[16px]">
        Apply for an INO on Lucis Launchpad, submit your project and get a response within 24 hours
      </p>
      <div className={`${s.buttonContainer}`}>
        <button className={s.applyBtn}>Apply Now</button>
        <button className={s.contactBtn}>Contact Us</button>
      </div>
    </div>
  );
};

export default GotProject;
