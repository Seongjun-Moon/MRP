import React from "react";
import { Route } from "react-router-dom";
import UserPage from "./user-page";
import CompanyPage from "./company-page";
import MedicinePage from "./medicine-page";
import MedicineRegister from "./medicine-register";
import CirculationPage from "./circulation-page";
import CompanyRegister from "./company-register";

function MainContainer(props) {
  return (
    <section className="main">
      <Route exact path="/" component={UserPage}></Route>
      <Route exact path="/company/list" component={CompanyPage}></Route>
      <Route exact path="/company/register" component={CompanyRegister}></Route>
      <Route exact path="/medicine/list" component={MedicinePage}></Route>
      <Route
        exact
        path="/medicine/register"
        component={MedicineRegister}
      ></Route>
      <Route exact path="/circulation" component={CirculationPage}></Route>
    </section>
  );
}

export default MainContainer;
