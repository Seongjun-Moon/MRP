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
          <NavLink to="/company">업체 페이지</NavLink>
        </li>
        <li>
          <NavLink to="/medicine">전문 의약품 페이지</NavLink>
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
