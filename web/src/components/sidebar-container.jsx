import React from "react";
import { NavLink } from "react-router-dom";

function SidebarContainer(props) {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink exact to="/">
            사용자 페이지
          </NavLink>
        </li>
        <li>
          <NavLink to="/company">업체 목록 조회</NavLink>
        </li>
        <li>
          <NavLink to="/company/register">업체 정보 등록</NavLink>
        </li>
        <li>
          <NavLink to="/medicine">전문의약품 목록 조회</NavLink>
        </li>
        <li>
          <NavLink to="/medicine/register">전문의약품 정보 등록</NavLink>
        </li>
        <li>
          <NavLink to="/circulation">유통 페이지</NavLink>
        </li>
      </ul>
      <button>로그아웃</button>
    </aside>
  );
}

export default SidebarContainer;
