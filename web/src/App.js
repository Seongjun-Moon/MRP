import React from "react";
import { connect } from "react-redux";

import store from "../src/redux/store";
import signin from "../src/redux/user/user.action";

import Welcome from "../src/pages/welcome.pages";
import Main from "./pages/main.pages";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App(props) {
  React.useEffect(() => {
    if (cookies.get("loggedIn")) {
      store.dispatch(
        signin({
          isLoggedIn: true,
          companyType: cookies.get("userCompanyType"),
        })
      );
    } else {
      store.dispatch(
        signin({
          isLoggedIn: false,
        })
      );
    }
  }, []);

  return <div>{props.isLoggedIn ? <Main /> : <Welcome />}</div>;
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(App);
