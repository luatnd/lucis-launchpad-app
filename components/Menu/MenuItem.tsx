import * as React from "react";
import { ReactElement, useCallback } from "react";

import { motion } from "framer-motion";
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
import { scrollToSection } from "../../utils/DOM";
import { AppEmitter } from "../../services/emitter";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export type MenuItemType = {
  color: string,
  text: string | ReactElement,
  scrollTarget?: string, // CSS selector of target scroll
  statusMenu: boolean;
  onClick?: () => void,
}

export const MenuItem = (props: { item: MenuItemType }) => {
  const click = useCallback(() => {
    if (props.item.statusMenu == false) {
      if (props.item.scrollTarget) {
        scrollToSection(props.item.scrollTarget ?? '', true, -90)
      }
      if (props.item.onClick) {
        props.item.onClick()
      }
  
      AppEmitter.emit("setMbMenuVisible", false)
    }
    }, [])

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={click}
    >
      {/* <div className="icon-placeholder" style={style} /> */}
      {
      props.item.statusMenu == true?
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" title="Guide">
          <Menu.Item key="1">For Game Publisher</Menu.Item>
          <Menu.Item key="2">For Personal Investor</Menu.Item>
        </SubMenu>
      </Menu>
      :<div className="text-placeholder font-saira text-white text-20px leading-28px py-15px">
        {props.item.text}
      </div>
      }
    </motion.li>
  );
};
