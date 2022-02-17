import Image from './Image';
import Link from 'next/link';
import s from './Header.module.sass'
import Logo from '../assets/icon/Logo.svg';
import GradientButton from './Button/GradientButton';
import { useWindowSize } from '../hooks/useWindowSize';
import { MenuMobile } from './Menu/MenuMobile';
import { useCallback, useEffect, useState } from "react";
import {scrollToSection} from "../utils/DOM";

import { Modal, Button } from 'antd';
import { AppEmitter } from "../services/emitter";
type Props = {
  handleMenuOpen: Function,
};
export default function Header(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [width, height] = useWindowSize();

  const scrollAndCloseMenu = useCallback((selector: string) => {
    scrollToSection(selector ?? '', true, -90)
  }, [])

  useEffect(() => {
    const subscription = AppEmitter.addListener('setJoinUsVisible', (visible: boolean) => {
      setIsModalVisible(visible)
    });
    return () => {
      subscription.remove();
    }
  }, [])

  if (width > 1024) {
    return (
      <div className={`${s.pcMenu} bg-nav`}>
        <div className="container py-20px flex justify-between items-center relative z-10`">
          <div className={s.logo}>
            <Link href="/">
              <Image src={Logo} alt='logo' priority />
            </Link>
          </div>
          <nav>
            <ul className="flex justify-between items-center m-0">
              {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Home</a></li>*/}
              <li><a href="#" onClick={() => scrollAndCloseMenu('#EcoSystem')} className='text-white text-24px leading-28px p-15px'>Homepage</a></li>
              <li className={s.groundSubMenu}>
                <a href="#" onClick={() => scrollAndCloseMenu('#Investors')} className='text-white text-24px leading-28px p-15px'>Guide</a>
                <ul className={s.subMenu}>
                  <li>For Game Publisher</li>
                  <li>For Personal Investor</li>
                </ul>
              </li>
              {/*<li><a href="#" className='text-white text-24px leading-28px p-15px'>Roadmap</a></li>*/}
              <li> <GradientButton onClick={showModal} type={1} className="text-white text-24px leading-28px px-40px py-15px ml-15px" style={{whiteSpace: 'nowrap',fontWeight: '600'}}>Connect wallet</GradientButton> </li>
            </ul>
          </nav>


        </div>
      </div>
    );
  } else {
    return (
        <MenuMobile />
    )
  }
}
