import React from "react";
import SidebarContainer from "../components/sidebar-container";
import MainContainer from "../components/main-container";
import { HashRouter } from "react-router-dom";

class Main extends React.Component {
  render() {
    return (
      <>
        <div>메인 페이지</div>
        <HashRouter>
          <div>
            <SidebarContainer />
            <MainContainer />
          </div>
        </HashRouter>
      </>
    );
  }
}

export default Main;
