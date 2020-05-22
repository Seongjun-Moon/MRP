import React from "react";
import { NavLink } from "react-router-dom";

function SidebarContainer(props) {
  return (
    <div className="sidebar">
      <h1>여기는 사이드바</h1>
      <ul>
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
    </div>
  );
}

export default SidebarContainer;
