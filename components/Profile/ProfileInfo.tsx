import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Col, message, Row } from "antd";
import Input from "components/Input/Input";
import { useMutationProfile } from "hooks/profile/useMutationProfile";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getCurrencyFromChainId } from "utils/blockchain/BlockChain";
import { chainProfilesIndexed } from "utils/blockchain/ChainConfig";
import { isClient } from "utils/DOM";
import s from "../../pages/profile/index.module.sass";
import AuthStore from "../Auth/AuthStore";
import ConnectWalletStore from "../Auth/ConnectWalletStore";

type Props = {
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  name: string | undefined;
  address: string | undefined;
  code: string | undefined;
  balance: string | undefined;
};

export default function Info(props: Props) {
  const { isEdit, setIsEdit, name, balance, code, address } = props;

  const [tempName, setTempName] = useState(name);
  const [field, setField] = useState("");
  const [isCopy, setIsCopy] = useState(false);

  const affilateIdRef = useRef<any>(null);
  const { updateProfile } = useMutationProfile();

  const chainId = ConnectWalletStore?.network?.chainId;
  const currency = chainId && getCurrencyFromChainId(chainId);

  const handleCopyAffilateId = () => {
    if (affilateIdRef) {
      if (isClient) {
        setIsCopy(true);
        message.success("Copied to clipboard");
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
    setField(e.target.name);
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
    })
      .then(() => {
        AuthStore.name = tempName;
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const inputProps = {
    value: tempName ?? "",
    onChange: handleChangeName,
    onBlur: handleBlur,
    className: s.name,
    setField: setField,
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
                <Input
                  {...inputProps}
                  placeholder={"Your name"}
                  name="full_name"
                  maxLength={45}
                />
              ) : (
                <p
                  className={`${s.fullName} text-[18px] md:text-[28px] lg:text-[36px] font-[500]`}
                >
                  {name}
                </p>
              )}
              <p
                className={`${s.id} text-[12px] sm:text-[14px] md:text-[18px]`}
              >
                {address}
              </p>
            </div>
            {/* <p>Exit</p> */}
            <button onClick={toggleEdit}>
              {isEdit ? <CloseOutlined /> : <EditOutlined />}
            </button>
          </div>

          {/* TODO: Need get balance from wallet  */}
          <div className={s.info}>
            <p
              className={`font-[300] text-[12px] sm:text-[14px] md:text-[18px]`}
            >
              {/* Balance: {profile?.me.balance ? profile.me.balance : "0"} BNB */}
              Balance: {Number(balance).toFixed(2)} {currency}
            </p>
          </div>

          <div className={`${s.info} sm:mt-2 lg:mt-5 `}>
            <p
              className={`${s.name} font-[400] text-[14px] sm:text-[18px] md:text-[24px]`}
            >
              Affiliate ID:
              <span ref={affilateIdRef}>{code}</span>
              <button onClick={handleCopyAffilateId} disabled={isCopy}>
                {!isCopy ? (
                  <img src={"/assets/MyProfile/copy.svg"} alt="" />
                ) : (
                  <CheckOutlined />
                )}
              </button>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
