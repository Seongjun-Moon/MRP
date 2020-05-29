import React from "react";
import { NavLink } from "react-router-dom";

import store from "../redux/store";
import signin from "../redux/user/user.action";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function SidebarContainer(props) {
  const logout = () => {
    cookies.remove("loggedIn", { path: "/" });
    cookies.remove("userCompanyType", { path: "/" });
    store.dispatch(
      signin({
        isLoggedIn: false,
      })
    );
  };

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink exact to="/user">
            사용자 페이지
          </NavLink>
        </li>
        <li>
          <NavLink to="/company/list">업체 목록 조회</NavLink>
        </li>
        <li>
          <NavLink to="/company/register">업체 정보 등록</NavLink>
        </li>
        <li>
          <NavLink to="/medicine/list">전문의약품 목록 조회</NavLink>
        </li>
        <li>
          <NavLink to="/medicine/register">전문의약품 정보 등록</NavLink>
        </li>
        <li>
          <NavLink to="/distribution">유통 페이지</NavLink>
        </li>
      </ul>
      <button onClick={logout}>로그아웃</button>
    </aside>
  );
}

export default SidebarContainer;
