import { CheckOutlined, CloseOutlined, CopyOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "components/Profile/Hooks/useMutationProfile";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { isClient } from "utils/DOM";
import s from "../../pages/profile/index.module.sass";

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
    <div className="mt-6">
      <Row align="middle" wrap={false} justify="space-between">
        <Col xs={7}>
          <div className={s.avatar}>
            <img src="/assets/MyProfile/defaultAvatar.png" alt="" />
          </div>
        </Col>
        <Col xs={16}>
          <div className={s.info}>
            <div>
              {isEdit ? (
                <Input {...props} placeholder={"Your name"} />
              ) : (
                <p className={s.fullName}>{tempName}</p>
              )}
              <p className={s.id}>{profile ? profile.me.address : ""}</p>
            </div>
            {/* <p>Exit</p> */}
            <button onClick={toggleEdit}>{isEdit ? <CloseOutlined /> : <EditOutlined />}</button>
          </div>

          <div className={s.info}>
            <p className={s.balance}>
              Balance: {profile?.me.balance ? profile.me.balance : "0"} BNB
            </p>
          </div>

          <div className={`${s.info} sm:mt-2 lg:mt-5`}>
            <p className={s.name}>
              Affiliate ID:
              <span ref={affilateIdRef}>{profile?.me.code ? profile.me.code : ""}</span>
              <button onClick={handleCopyAffilateId} disabled={isCopy}>
                {!isCopy ? <img src={"/assets/MyProfile/copy.svg"} /> : <CheckOutlined />}
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
