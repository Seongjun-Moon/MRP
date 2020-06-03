import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import UserPage from "./user-page";
import CompanyPage from "./company-page";
import MedicinePage from "./medicine-page";
import MedicineRegister from "./medicine-register";
import DistributionPage from "./distribution-page";
import TempDistributionPage from "./temp-distribution-page";
import CompanyRegister from "./company-register";

function MainContainer(props) {
  return (
    <section className="main">
      {/* 업체 관리자 조회 */}
      <Route exact path="/user">
        {props.user.companyType !== "oversee" ? (
          <Redirect to="/" />
        ) : (
          <UserPage />
        )}
      </Route>

      {/* 업체 조회 */}
      <Route exact path="/company/list">
        {props.user.companyType !== "oversee" ? (
          <Redirect to="/" />
        ) : (
          <CompanyPage />
        )}
      </Route>

      {/* 업체 등록 */}
      <Route exact path="/company/register">
        {props.user.companyType !== "oversee" ? (
          <Redirect to="/" />
        ) : (
          <CompanyRegister />
        )}
      </Route>

      {/* 전문의약품 조회 */}
      <Route exact path="/medicine/list">
        <MedicinePage />
      </Route>

      {/* 전문의약품 등록 */}
      <Route exact path="/medicine/register">
        {props.user.companyType !== "oversee" ? (
          <Redirect to="/" />
        ) : (
          <MedicineRegister />
        )}
      </Route>

      {/* 의약품별 유통 이력 */}
      <Route exact path="/distribution/latest">
        <DistributionPage />
      </Route>

      {/* 바코드별 유통 이력 */}
      <Route exact path="/distribution/history">
        <DistributionPage />
      </Route>

      {/* 임시 유통 이력 */}
      <Route exact path="/distribution/temp">
        {props.user.companyType === "oversee" ? (
          <Redirect to="/" />
        ) : (
          <>
            {props.medicine.mediCode ? (
              <TempDistributionPage requested={true} />
            ) : (
              <TempDistributionPage />
            )}
          </>
        )}
      </Route>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(MainContainer);
