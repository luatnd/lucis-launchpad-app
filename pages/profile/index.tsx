import DocHead from "components/DocHead";
import s from './index.module.sass'
import Footer from "components/Footer";
import Info from "./ProfileInfo";
import Box from "./ProfileBox";
import Modal from "antd/lib/modal/Modal";

const userProfile = {
  fullName: "Nguyen Thi Kieu Oanh",
  id: "0x948d6D28D396Eae2F8c3459b092a85268B1bD96B",
  balance: 135,
  affilateId: "01234567989svfdv",
  phone: "0912345678",
  email: "anhcbt@lucis.network",
  facebook: "Lucis network",
  twitter: "Lucis network",
  discord: "Lucis channel",
  tele: "Lucis9999",
  verify: false
}

const MyProfile = () => {
  return (
    <>
      <DocHead title="My Profile"/>
      <div className={s.banner}>
        <img src="/assets/MyProfile/banner.png" alt="" />

        <div className={`container ${s.content}`}>
          <Info />
          <Box />
        </div>
      <Footer />
      </div>

    </>


  );
};

export default MyProfile;
