import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem, MenuItemType } from "./MenuItem";
import { useEffect, useState } from "react";

import { AppEmitter } from "../../services/emitter";
import { useRouter } from "next/router";

import SubMenu from "./SubMenu"

import AuthService from "../Auth/AuthService";
import ConnectWalletStore, {
  nonReactive as ConnectWalletStore_NonReactiveData,
} from "../Auth/ConnectWalletStore";
import { Button } from "antd/lib/radio";
import AuthStore from "../Auth/AuthStore";
import { trim_middle } from "utils/String";


const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
export const Navigation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { address, network: connected_network } = ConnectWalletStore;

  const onClickProfile = () => {
    router.push("/profile");
    setIsVisible(false);
  };
  const disconnectWallet = React.useCallback(async () => {
    const authService = new AuthService();
    authService.logout();

    AppEmitter.emit("onWalletDisconnect");
  }, []);

  const menuItems: MenuItemType[] = [
    {
      color: "#FF008C",
      text: "Home",
      scrollTarget: "#Home",
      statusMenu: false,
    },
    {
      color: "#FF008C",
      text: "Upcoming Campaign",
      scrollTarget: "#Upcoming",
      statusMenu: false,
    },
    {
      color: "#FF008C",
      text: "Opening Campaign",
      scrollTarget: "#Opening",
      statusMenu: false,
    },

    {
      color: "#FF008C",
      text: "Closed Campaign",
      scrollTarget: "#Closed",
      statusMenu: false,
    },
    {
      color: "#FF008C",
      text: (
        <SubMenu />
      ),
      statusMenu: true,
    },
    {
      color: "#FF008C",
      text: (
        <div onClick={onClickProfile}>
          My Profile
        </div>
      ),
      statusMenu: false,
    },
    {
      color: "#FF008C",
      text: (
        <div>
          {
            !AuthStore.isLoggedIn 
            ? <div>
                <p>{trim_middle(address ?? "", 7, 8)}</p>
                <div onClick={disconnectWallet}>
                  Disconnect
                </div> 
            </div>
            : ''
          }
        </div>
      ),
      statusMenu: false,
    },
  ];

  useEffect(() => {
    const subscription = AppEmitter.addListener(
      "setJoinUsVisible",
      (visible: boolean) => {
        setIsModalVisible(visible);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <div>
      <motion.ul className="nav-list" variants={variants}>
        {menuItems.map((i, idx) => (
          <MenuItem item={i} key={idx} />
        ))}
      </motion.ul>
    </div>
  );
};
