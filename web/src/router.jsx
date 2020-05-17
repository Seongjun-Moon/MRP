import React from "react";
import { Route } from "react-router-dom";
import Main from "./main";
import User from "./user";
import Company from "./company";
import Medicine from "./medicine";
import History from "./history";

const Router = () => {
  return (
    <>
      <Route exact path="/" component={Main} />
      <Route path="/user" component={User} />
      <Route path="/company" component={Company} />
      <Route path="/medicine" component={Medicine} />
      <Route path="/history" component={History} />
    </>
  );
};

export default Router;
