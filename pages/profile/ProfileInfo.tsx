import { CloseOutlined, CopyOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "hooks/profile/useMutationProfile";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { isClient } from "utils/DOM";
import s from "./index.module.sass";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  profile: any;
};

const Info = ({ isEdit, setIsEdit, profile }: Props) => {
  const [tempName, setTempName] = useState(profile?.me.profile.full_name);
  const affilateIdRef = useRef<any>(null);

  const { updateProfile, loading, error, data } = useMutationProfile();

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

  const handleCopyAffilateId = () => {
    if (affilateIdRef) {
      // console.log(affilateIdRef.current.innerText);
      if (isClient) {
        navigator.clipboard.writeText(
          `${window.location.origin}/?r=${affilateIdRef.current.innerText}`
        );
      }
    }
  };

  // document.addEventListener("keydown", (evt) => {
  //   if (evt.key === "v" && evt.ctrlKey) {
  //     if (isClient) {
  //       //@ts-ignore
  //       window.clipboardData.getData("Text");
  //     }
  //   }
  // });
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
              {isEdit ? <Input {...props} /> : <p className={s.name}>{tempName}</p>}
              <p className={s.id}>{profile.me.id}</p>
            </div>
            <button onClick={toggleEdit}>{isEdit ? <CloseOutlined /> : <EditOutlined />}</button>
          </div>

          <div className={s.info}>
            <p className={s.balance}>
              Balance: {profile.me.balance ? profile.me.balance : "0"} BNB
            </p>
          </div>

          <div className={`${s.info} sm:mt-2 lg:mt-5`}>
            <p className={s.name}>
              Affilate ID:<span ref={affilateIdRef}>{profile.me.code}</span>
              <button onClick={handleCopyAffilateId}>
                <CopyOutlined />
              </button>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Info.defaulProps = {};

export default Info;
