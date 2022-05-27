import { message, Modal } from "antd";
import s from "./index.module.sass";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import { useEffect, useRef, useState } from "react";
import { isClient } from "utils/DOM";
import { CheckOutlined } from "@ant-design/icons";
import AuthStore from "components/Auth/AuthStore";
import { useRouter } from "next/router";

type Props = {
  closeModalShare: () => void;
  status?: boolean;
};

const ModalShare = (props: Props) => {
  const { closeModalShare, status } = props;
  const [isCopy, setIsCopy] = useState(false);
  const router = useRouter();
  const [urlAffilate, setUrlAffilate] = useState("");

  const { code } = AuthStore;

  const handleCopyAffilateId = () => {
    if (code) {
      if (isClient) {
        setIsCopy(true);
        message.success("Copied to clipboard");
        navigator.clipboard.writeText(
          `${window.location.origin}${router.asPath}?r=${code}`
        );
      }
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => setIsCopy(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopy]);

  useEffect(() => {
    const url = `${window.location.origin}${router.asPath}?r=${code}`;
    setUrlAffilate(url);
  }, [code]);

  return (
    <Modal
      visible={status}
      centered
      className={s.content_modal}
      footer={null}
      title="Share to"
      onCancel={closeModalShare}
    >
      <div className={s.infSocial}>
        <div className={s.infSocialIcons}>
          <FacebookShareButton url={`urlAffilate`}>
            <a target="_blank" rel="noopener noreferrer">
              <img src={"/assets/Campaign/Banner/svg/fb.svg"} alt="icon" />
            </a>
          </FacebookShareButton>
          <TelegramShareButton url={urlAffilate}>
            <a target="_blank" rel="noopener noreferrer">
              <img src={"/assets/Campaign/Banner/svg/tele.svg"} alt="icon" />
            </a>
          </TelegramShareButton>
          <TwitterShareButton url={urlAffilate}>
            <a target="_blank" rel="noopener noreferrer">
              <img src={"/assets/Campaign/Banner/svg/tw.svg"} alt="icon" />
            </a>
          </TwitterShareButton>
          <FacebookMessengerShareButton
            url={urlAffilate}
            appId={"1023048308650581"}
          >
            <a target="_blank" rel="noopener noreferrer">
              <img src={"/assets/Campaign/Banner/svg/win.svg"} alt="icon" />
            </a>
          </FacebookMessengerShareButton>
        </div>
        {code && (
          <div className={`${s.info} sm:mt-2 lg:mt-5 `}>
            <div
              className={`${s.name} font-[400] text-[14px] sm:text-[18px] md:text-[24px]`}
            >
              Affiliate ID:
              <span>{code}</span>
              <button onClick={handleCopyAffilateId} disabled={isCopy}>
                {!isCopy ? (
                  <img src={"/assets/MyProfile/copy.svg"} alt="" />
                ) : (
                  <CheckOutlined />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalShare;
