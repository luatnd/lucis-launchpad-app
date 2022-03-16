// components/layout.js
import React, {useState} from "react";

import AppHeader from "./Header/Header";
// import AppFooter from "./Footer";
export default class AppLayout extends React.Component {
  
  render() {
    const { children } = this.props;
    return (
      <div className="app-layout">
        <AppHeader />
        <div id="app-main">{children}</div>
         {/*<AppFooter />*/}
      </div>
    );
  }
}
