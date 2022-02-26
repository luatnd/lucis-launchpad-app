import { CheckOutlined, CloseOutlined, CopyOutlined, EditOutlined } from "@ant-design/icons";
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
  const [isCopy, setIsCopy] = useState(false);

  const affilateIdRef = useRef<any>(null);
  const { updateProfile, loading, error, data } = useMutationProfile();

  const handleCopyAffilateId = () => {
    if (affilateIdRef) {
      if (isClient) {
        setIsCopy(true);
        navigator.clipboard.writeText(
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

  if (isClient) {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "v" && evt.ctrlKey) {
        //@ts-ignore
        window.clipboardData.getData("Text");
      }
    });
  }

  useEffect(() => {
    let timer = setTimeout(() => setIsCopy(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopy]);

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
              <p className={s.id}>{profile ? profile.me.id : ""}</p>
            </div>
            {/* <p>Exit</p> */}
            <button onClick={toggleEdit}>{isEdit ? <CloseOutlined /> : <EditOutlined />}</button>
          </div>

          <div className={s.info}>
            <p className={s.balance}>Balance: {profile ? profile.me.balance : "0"} BNB</p>
          </div>

          <div className={`${s.info} sm:mt-2 lg:mt-5`}>
            <p className={s.name}>
              Affilate ID:
              <span ref={affilateIdRef}>{profile?.me.code ? profile.me.code : ""}</span>
              {!isCopy ? (
                <button onClick={handleCopyAffilateId}>
                  <CopyOutlined title="Copy to clipboard" />
                </button>
              ) : (
                <CheckOutlined />
              )}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Info.defaulProps = {};

export default Info;
