import { useRef, useState } from "react";
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

const Info = () => {
  const affilateIdRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleCopyAffilateId = () => {
    if (affilateIdRef) {
      console.log(affilateIdRef.current.innerText);
    }
  };

  const handleEditName = () => {
    setIsEdit(true);
    if (nameRef) {
      nameRef.current.focus();
      console.log(nameRef.current);
    }
  };

  const handleBlur = () => {
    setIsEdit(false);
  };

  return (
    <div className={s.info}>
      <div className={s.avatar}>
        <img src="/assets/MyProfile/defaultAvatar.png" alt="" />
      </div>

      <div>
        <div className={s.fullName}>
          <div className={s.name}>
            <h1
              onBlur={handleBlur}
              ref={nameRef}
              contentEditable={isEdit}
              suppressContentEditableWarning={true}
            >
              {userProfile.fullName}
            </h1>
            <button onClick={handleEditName}>
              <img src="/assets/MyProfile/edit.svg" alt="" />
            </button>
          </div>

          <p>{userProfile.id}</p>
        </div>
        <p className={s.balance}>Balance: {userProfile.balance} BNB</p>
        <div className={s.affilate}>
          <p>
            Affilate ID: <span ref={affilateIdRef}>{userProfile.affilateId}</span>
          </p>
          <button onClick={handleCopyAffilateId}>
            <img src="/assets/MyProfile/copy.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
