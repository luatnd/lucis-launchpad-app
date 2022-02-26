import { CloseOutlined, CopyOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "hooks/profile/useMutationProfile";
import { ChangeEvent, useRef, useState } from "react";
import { isClient } from "utils/DOM";
import s from "./index.module.sass";

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
  verify: false,
};

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  profile: any;
};

const Info = ({ isEdit, setIsEdit, profile }: Props) => {
  const [tempName, setTempName] = useState(profile?.me.profile.full_name);
  const affilateIdRef = useRef<any>(null);
  const { updateProfile, loading, error, data } = useMutationProfile();

  const handleCopyAffilateId = () => {
    if (affilateIdRef) {
      // console.log(affilateIdRef.current.innerText);
      if (isClient) {
        console.log(
          `${window.location.origin}/?r=${affilateIdRef.current.innerText}`
        );
      }
    }
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

  const handleBlur = () => {
    updateProfile({
      variables: {
        data: {
          full_name: {
            set: tempName,
          },
        },
      },
    });
  };

  const props = {
    value: tempName,
    onChange: handleChangeName,
    onBlur: handleBlur,
    className: s.name,
  };

  return (
    <div className="my-6">
      <Row gutter={[10, 10]} align="middle">
        <Col span={8}>
          <div className={s.avatar}>
            <img src="/assets/MyProfile/defaultAvatar.png" alt="" />
          </div>
        </Col>
        <Col span={16}>
          <div className={s.info}>
            <div>
              {isEdit ? (
                <Input {...props} />
              ) : (
                // <input className={s.name} onChange={handleChangeName} value={tempName} />
                <p className={s.name}>{tempName}</p>
              )}
              <p className={s.id}>{userProfile.id}</p>
            </div>
            <button onClick={toggleEdit}>
              {isEdit ? <CloseOutlined /> : <EditOutlined />}
            </button>
          </div>

          <div className={s.info}>
            <p className={s.balance}>Balance: {userProfile.balance} BNB</p>
          </div>

          <div className={`${s.info} sm:mt-2 lg:mt-5`}>
            <p className={s.name}>
              Affilate ID:
              <span ref={affilateIdRef}>{userProfile.affilateId}</span>
              <button onClick={handleCopyAffilateId}>
                <CopyOutlined />
              </button>
              {/* <img src="/assets/MyProfile/copy.svg" alt="" /> */}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Info.defaulProps = {};

export default Info;
