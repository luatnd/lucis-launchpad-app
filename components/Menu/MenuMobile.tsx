import * as React from "react";
import s from "./MenuMobile.module.sass";
import { useRef, useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./useDimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import Image from "../Image";
import Logo from "../../assets/icon/logo.png";
import { AppEmitter } from "../../services/emitter";
import AuthBox from "../Auth/components/AuthBox";
import Link from "next/link";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height + 200}px at 262px 33px)`,
    transition: {
      type: "spring",
      stiffness: 40,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(1px at 262px 33px)",
    transition: {
      delay: 0.5, // delay before hide to wait menu item hidden first
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const nav = {
  open: {
    display: "block",
    transition: {
      staggerChildren: 0.17,
      delayChildren: 0.2,
    },
  },
  closed: {
    display: "none",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};
export const MenuMobile = (props: any) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
  }, [isOpen]);

  useEffect(() => {
    const subscription = AppEmitter.addListener(
      "setMbMenuVisible",
      (visible: boolean) => {
        toggleOpen(visible ? 1 : 0);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <div className="overlay" onClick={() => toggleOpen()} />

      {/* Header bar */}
      <div
        className={`${s.mobileMenu} fixed top-0 left-0 right-0 z-[101] bg-nav backdrop-blur-sm`}
      >
        <div className={`${s.containerMobile} lucis-container`}>
          <div style={{ width: 100, padding: 0 }}>
            <Link href="/" passHref>
              <a>
                <Image
                  src={Logo}
                  width={120}
                  height={42}
                  alt="logo"
                  layout="responsive"
                ></Image>
              </a>
            </Link>
            {"IS_TESTNET" && (
              <p
                style={{
                  fontSize: "10px",
                  color: "#dee0e2",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Testnet
              </p>
            )}
          </div>
          <div className="flex justify-end items-center">
            <div className={s.mobileAuthBox}>
              <AuthBox small={true} />
            </div>

            <motion.div initial={false} animate={"closed"}>
              <MenuToggle toggle={() => toggleOpen()} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* menubar */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        variants={nav}
        className="mobile-nav z-[101]"
      >
        <motion.div className="background" variants={sidebar}>
          <div className="bg-glass w-full h-full opacity-[0.15]" />
        </motion.div>

        <Navigation />

        <MenuToggle toggle={() => toggleOpen()} className={s.mHumber} />
      </motion.nav>
    </>
  );
};
