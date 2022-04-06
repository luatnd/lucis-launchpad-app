import DocHead from "components/DocHead";
import Footer from "components/Footer/Footer";

const UpdateEmail = () => {
  return (
    <>
      <DocHead />

      <div>
        <img
          className="md:mt-[-50px]"
          style={{ width: "100%" }}
          src="/assets/MyProfile/banner.png"
          alt=""
        />
        <h1 className="text-white text-center text-[24px] md:text-[36px] py-[50px] md:py-[200px]">
          Update email success
        </h1>
        <Footer />
      </div>
    </>
  );
};

export default UpdateEmail;
