import * as React from "react";
import { ReactElement, useCallback } from "react";

import { motion } from "framer-motion";
import { Menu } from "antd";
const { SubMenu } = Menu;
import { scrollToSection } from "../../utils/DOM";
import { AppEmitter } from "../../services/emitter";
import { useRouter } from "next/router";
import Link from "next/link";

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
  color: string;
  text: string | ReactElement;
  scrollTarget?: string; // CSS selector of target scroll
  statusMenu?: boolean;
  onClick?: () => void;
  href?: string;
  id?: number;
};

export const MenuItem = (props: { item: MenuItemType }) => {
  const click = useCallback(() => {
    if (props.item.statusMenu == false) {
      setTimeout(() => {
        if (props.item.scrollTarget) {
          scrollToSection(props.item.scrollTarget ?? "", true, -90);
        }
        if (props.item.onClick) {
          props.item.onClick();
        }
      }, 50);
      AppEmitter.emit("setMbMenuVisible", false);
    }
  }, []);

  return (
    <div
      style={
        props.item.id === 6
          ? { position: "absolute", top: "65%" }
          : props.item.id === 7
          ? { position: "absolute", top: "72%", pointerEvents: 'none' }
          : props.item.id === 8
          ? { position: "absolute", top: "76%" }
          : {}
      }
    >
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.95 }}
        onClick={click}
      >
        {
          <div className="text-placeholder font-saira text-white text-20px leading-28px py-15px">
            <Link href={props.item.href ?? "/"}>{props.item.text}</Link>
          </div>
        }
      </motion.li>
    </div>
  );
};
