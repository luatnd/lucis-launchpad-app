import s from "./GotProject.module.sass";

const GotProject = () => {
  return (
    <>
      <p>Got a Project?</p>
      <div className={s.line}></div>
      <p>
        Apply for an INO on Lucis Launchpad, submit your project and get a response within 24 hours
      </p>
      <div className={s.buttonContainer}>
        <button>Apply Now</button>
        <button>Contact Us</button>
      </div>
    </>
  );
};

export default GotProject;
