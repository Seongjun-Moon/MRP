import React from "react";
import SidebarContainer from "../components/sidebar-container";
import MainContainer from "../components/main-container";
import { HashRouter } from "react-router-dom";

import { ReactComponent as Medicine } from "../assets/medicine.svg";

import "../scss/styles.scss";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="main-header">
          <header>
            {/* <Medicine /> */}
            <h1>MRP System</h1>
          </header>
        </div>
        <HashRouter>
          <section className="main-container">
            <SidebarContainer />
            <MainContainer />
          </section>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
