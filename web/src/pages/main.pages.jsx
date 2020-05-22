import React from "react";
import SidebarContainer from "../components/sidebar-container";
import MainContainer from "../components/main-container";
import { HashRouter } from "react-router-dom";

import { ReactComponent as Medicine } from "../assets/medicine.svg";

import "../scss/styles.scss";

class Main extends React.Component {
  render() {
    return (
      <>
        <div className="mainpage-header">
          <h1>
            <Medicine />
            MRP
          </h1>
        </div>
        <HashRouter>
          <div className="mainpage-container">
            <SidebarContainer />
            <MainContainer />
          </div>
        </HashRouter>
      </>
    );
  }
}

export default Main;
