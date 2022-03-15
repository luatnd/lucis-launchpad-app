import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./Header.module.sass";
import { useWindowSize } from "../hooks/useWindowSize";

import Image from "./Image";
import { MenuMobile } from "./Menu/MenuMobile";
import AuthBox from "./Auth/components/AuthBox";

import Logo from "../assets/icon/logo.png";


type Props = {
  handleMenuOpen: Function;
};
export default function Header(props: Props) {
  const router = useRouter();
  const [width] = useWindowSize();

  useEffect(() => {
    console.log('{HEADER} run 2time?: ');
  }, [])

  if (width > 1024) {
    return (
    <div className={`${s.pcMenu} bg-nav`}>
        <div className={`container lucis-container py-20px px-0 flex justify-between items-center relative z-10 ${s.menu_container}`}>
          <div className={s.logo}>
            <Link href='/' passHref>
              <a>
                <Image src={Logo} alt='logo' priority />
              </a>
            </Link>
            {"IS_TESTNET" && <p>Testnet</p>}
          </div>
          <nav>
            <ul className='flex justify-between items-center m-0'>
              {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Home</a></li>*/}
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    router.push('/')
                  }}
                  className='text-white text-24px leading-28px p-15px'
                >
                  Home
                </a>
              </li>
              <li className={s.groundSubMenu}>
                <a
                  href='#'
                  onClick={(e) => e.preventDefault()}
                  className='text-white text-24px leading-28px p-15px'
                >
                  Guide
                </a>
                <ul className={s.subMenu}>
                  <li>For Game Publisher</li>
                  <li>For Personal Investor</li>
                </ul>
              </li>
              {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Roadmap</a></li>*/}
              <li>
                <AuthBox />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  } else {

    console.log('{Header} MOBILE: ');
    return <MenuMobile />;
  }
}
