import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import UserPage from "./user-page";
import CompanyPage from "./company-page";
import MedicinePage from "./medicine-page";
import MedicineRegister from "./medicine-register";
import DistributionPage from "./distribution-page";
import CompanyRegister from "./company-register";

function MainContainer(props) {
  return (
    <section className="main">
      <Route exact path="/user">
        {props.companyType !== "oversee" ? <Redirect to="/" /> : <UserPage />}
      </Route>
      <Route exact path="/company/list">
        {props.companyType !== "oversee" ? (
          <Redirect to="/" />
        ) : (
          <CompanyPage />
        )}
      </Route>
      <Route exact path="/company/register">
        {props.companyType !== "oversee" ? (
          <Redirect to="/" />
        ) : (
          <CompanyRegister />
        )}
      </Route>
      <Route exact path="/medicine/list">
        {props.companyType !== "oversee" ? (
          <Redirect to="/dashboard" />
        ) : (
          <MedicinePage />
        )}
      </Route>
      <Route exact path="/medicine/register">
        {props.companyType !== "oversee" ? (
          <Redirect to="/" />
        ) : (
          <MedicineRegister />
        )}
      </Route>
      <Route exact path="/distribution" component={DistributionPage}>
        <DistributionPage />
      </Route>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(MainContainer);
