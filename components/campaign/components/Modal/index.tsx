import { message, Modal } from "antd";
import s from "./index.module.sass";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import React, { useEffect, useRef, useState } from "react";
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
  const [urlLinkShare, setUrlLinkShare] = useState("");

  const { code } = AuthStore;

  const handleCopyLink = () => {
    if (code) {
      if (isClient) {
        setIsCopy(true);
        message.success("Copied to clipboard");
        
        navigator.clipboard.writeText(urlLinkShare);
      }
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => setIsCopy(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopy]);

  useEffect(() => {
    const url = `${window.location.origin}${router.asPath}?r=${code}`;
    const linkShare = `${window.location.origin}/c/${router.query?.slug?.[0]}?r=${code}`;
    setUrlLinkShare(linkShare);
    setUrlAffilate(url);  
  }, [code, router]);

  return (
    <Modal
      visible={status}
      centered
      className={s.content_modal}
      footer={null}
      title="Share this campaign"
      onCancel={closeModalShare}
    >
      <div className={s.infSocial}>
        <div className={s.title}>
          <h2>Refer friend and get commission up to 5%</h2>
        </div>
        <div className={s.infSocialIcons}>
          <FacebookShareButton url={`https://lucis-lp.koolab.io${router.asPath}?r=${code}`}>
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
            url={`https://lucis-lp.koolab.io${router.asPath}?r=${code}`}
            appId={"1023048308650581"}
          >
            <a target="_blank" rel="noopener noreferrer">
              <img src={"/assets/Campaign/Banner/svg/win.svg"} alt="icon" />
            </a>
          </FacebookMessengerShareButton>
        </div>
        {/*{code && (*/}
        {/*  <div className={`${s.info} sm:mt-2 lg:mt-5 `}>*/}
        {/*    <div*/}
        {/*      className={`${s.name} font-[400] text-[14px] sm:text-[18px] md:text-[24px]`}*/}
        {/*    >*/}
        {/*      Affiliate ID:*/}
        {/*      <span> {code} </span>*/}
        {/*      <button onClick={handleCopyAffilateId} disabled={isCopy}>*/}
        {/*        {!isCopy ? (*/}
        {/*          <img src={"/assets/MyProfile/copy.svg"} alt="" />*/}
        {/*        ) : (*/}
        {/*          <CheckOutlined />*/}
        {/*        )}*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}

        <div className={s.urlLink}>
          <input
            title={urlLinkShare}
            readOnly
            value={urlLinkShare}
            className={s.inputUrl}
          ></input>
          <button onClick={handleCopyLink} disabled={isCopy}>
            {!isCopy ? (
              <div style={{padding: "0px 8px"}}>
                <img src={"/assets/MyProfile/copy.svg"} alt="" />
              </div>

            ) : (
              <div style={{padding: "0px 8px"}}>
                <CheckOutlined />
              </div>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShare;
