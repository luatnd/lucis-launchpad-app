import { Menu } from "antd";
import { AppEmitter } from "services/emitter";
const { SubMenu } = Menu;
export default function SubMenuItem() {
  const handleClick = () => {
    AppEmitter.emit("setMbMenuVisible", false)
  }
  return (
    <SubMenu key="sub1" title="Guide">
      <Menu.Item key="1" onClick={handleClick}><a href="https://launchpad-lucis.gitbook.io/lucis-lauchpad-docs/" />For Game Publisher</Menu.Item>
      <Menu.Item key="2" onClick={handleClick}><a href="https://launchpad-lucis.gitbook.io/lucis-lauchpad-docs/" />For Personal Investor</Menu.Item>
    </SubMenu>
  );
}
