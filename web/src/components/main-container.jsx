import React from "react";
import { Route } from "react-router-dom";
import UserPage from "../components/user-page";
import CompanyPage from "../components/company-page";
import MedicinePage from "../components/medicine-page";
import CirculationPage from "../components/circulation-page";

function MainContainer(props) {
  return (
    <div className="main">
      <Route exact path="/" component={UserPage}></Route>
      <Route exact path="/company" component={CompanyPage}></Route>
      <Route exact path="/medicine" component={MedicinePage}></Route>
      <Route exact path="/circulation" component={CirculationPage}></Route>
    </div>
  );
}

export default MainContainer;
