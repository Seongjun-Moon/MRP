import React from "react";
import SidebarContainer from "../components/sidebar-container";
import MainContainer from "../components/main-container";

import "../scss/styles.scss";
import Footer from "../components/footer";

class Main extends React.Component {
  render() {
    return (
      <section className="mainpage">
        <header className="mainpage-header">
          <h1>MRP System</h1>
        </header>

        <section className="mainpage-container">
          <SidebarContainer />
          <MainContainer />
        </section>

        <Footer />
      </section>
    );
  }
}

export default Main;
