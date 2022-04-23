import { useState } from "react";
import { AppEmitter } from "services/emitter";
import s from "./MenuMobile.module.sass";

export default function SubMenu() {
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [height, setHeight] = useState(0);

  const click = () => {
    setIsSubMenu(!isSubMenu)
    if (isSubMenu) {
      setHeight(0)
    }else{
      setHeight(100)
    }
  }
  const transformImg = isSubMenu ? s.addRotate: s.removeRotate
  const handleClick = () => {
    AppEmitter.emit("setMbMenuVisible", false);
  };
  return (
    <div className={s.submenu} onClick={click}>
      Guide
      <img src="/assets/Banner/svg/ic_down.svg" alt="" className={transformImg} />
      <ul className={`${s.contentSubMenu}`} style={{height: height}}>
        <li onClick={handleClick}>
          <a
            href="https://launchpad-lucis.gitbook.io/lucis-lauchpad-docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            For Game Publisher
          </a>
        </li>
        <li onClick={handleClick}>
          <a
            href="https://launchpad-lucis.gitbook.io/lucis-lauchpad-docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            For Personal Investor
          </a>
        </li>
      </ul>
    </div>
  );
}
