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
import AuthStore from "../Auth/AuthStore";
import Notification from "./Notification";
import { observer } from "mobx-react-lite";

type Props = {
  handleMenuOpen: Function;
};

const Header = (props: Props) => {
  const router = useRouter();
  const [width] = useWindowSize();

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
              {
                // @ts-ignore
                ("IS_TESTNET" === true) && <p>Testnet</p>
              }
            </div>
            <nav>
              <ul className="flex gap-4 justify-between items-center m-0">
                <li className="text-24px">
                  <Popover
                    placement="bottomRight"
                    // trigger={width < 1024 ? "click" : "hover"}
                    trigger="hover"
                    content={
                      <ul className={s.subMenu}>
                        <li>
                          <a
                            href="https://launchpad-lucis.gitbook.io/lucis-lauchpad-docs/"
                            // onClick={(e) => e.preventDefault()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-24px leading-28px "
                          >
                            For Game Publisher
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://launchpad-lucis.gitbook.io/lucis-lauchpad-docs/"
                            // onClick={(e) => e.preventDefault()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-24px leading-28px "
                          >
                            For Personal Investor
                          </a>
                        </li>
                      </ul>
                    }
                  >
                    Guide
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

                {/* {AuthStore.isLoggedIn && (
                  <li style={{ cursor: "pointer" }}>
                    <Notification />
                  </li>
                )} */}

                {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Roadmap</a></li>*/}
                <li>
                  <AuthBox />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <MenuMobile />
      )}
    </div>
  );
};

export default observer(Header);
