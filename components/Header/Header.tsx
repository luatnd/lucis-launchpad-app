import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./Header.module.sass";
import { useWindowSize } from "../../hooks/useWindowSize";

import Image from "../Image";
import { MenuMobile } from "../Menu/MenuMobile";
import AuthBox from "../Auth/components/AuthBox";

import Logo from "assets/icon/logo.png";
import { Badge, Popover } from "antd";
import InfiniteList from "./InfiniteNoti";

type Props = {
  handleMenuOpen: Function;
};

type iconProps = {
  height: string;
  color: string;
};
const NotificationIcon = ({ height, color }: iconProps): any => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={height}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      color={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
};

export default function Header(props: Props) {
  const router = useRouter();
  const [width] = useWindowSize();
  const [isOpenNoti, setIsOpenNoti] = useState(false);

  // if (width > 1024) {
  const openNotification = () => {
    console.log("Open");
    setIsOpenNoti(!isOpenNoti);
  };
  return (
    <div className={`${s.pcMenu} bg-nav`}>
      {width >= 1024 ? (
        <div className={`${s.menu_container}`}>
          <div
            className={`container lucis-container py-20px px-0 flex justify-between items-center relative z-10 `}
          >
            <div className={s.logo}>
              <Link href="/" passHref>
                <a>
                  <Image src={Logo} alt="logo" priority />
                </a>
              </Link>
              {"IS_TESTNET" && <p>Testnet</p>}
            </div>
            <nav>
              <ul className="flex gap-4 justify-between items-center m-0">
                <li style={{ cursor: "pointer" }}>
                  <Popover
                    placement="bottom"
                    content={<InfiniteList />}
                    trigger="click"
                  >
                    <Badge>
                      <NotificationIcon
                        height={"h-[28px] w-[28px]"}
                        color={"white"}
                      />
                    </Badge>
                  </Popover>
                </li>
                {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Home</a></li>*/}
                {/* <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                  }}
                  className="text-white text-24px leading-28px p-15px"
                >
                  Home
                </a>
              </li> */}

                {/* <li className={s.groundSubMenu}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-white text-24px leading-28px p-15px"
                >
                  Guide
                </a>
                <ul className={s.subMenu}>
                  <li>For Game Publisher</li>
                  <li>For Personal Investor</li>
                </ul>
              </li> */}

                {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Roadmap</a></li>*/}
                <li>
                  <AuthBox />
                </li>
                {/* TODO: Notification infinite scroll */}
                {/* <li>
                <Notification />
              </li> */}
              </ul>
            </nav>
          </div>
          {/* <InfiniteList /> */}
        </div>
      ) : (
        <MenuMobile />
      )}
    </div>
  );
}
