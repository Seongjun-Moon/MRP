import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, NavLink } from "react-router-dom";
import Router from "./router";
import { Navbar } from "react-bootstrap";
import "./css/index.css";

const navbarStyle = {
  margin: "0 auto",
};
const navLinkStyle = {
  margin: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/" style={navbarStyle}>
          <span>홈 메뉴</span>
        </Navbar.Brand>
        <div id="memberMenu">로그인/로그아웃</div>
        <NavLink style={navLinkStyle} to="/user">
          사용자
        </NavLink>
        <NavLink style={navLinkStyle} to="/company">
          업체
        </NavLink>
        <NavLink style={navLinkStyle} to="/medicine">
          전문의약품 정보
        </NavLink>
        <NavLink style={navLinkStyle} to="/history">
          유통이력 조회
        </NavLink>
      </Navbar>
      <Router />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
