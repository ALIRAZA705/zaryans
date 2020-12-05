import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import Logo from "../assets/images/logo.png";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand
        className="d-md-down-none"
        to="/dashboard"
        style={{
          backgroundColor: "white",
          borderColor: "#d8dbe0",
          borderStyle: "solid",
          borderWidth: "thin",
          paddingTop: "3px",
        }}
      >
        {/* <CIcon className="c-sidebar-brand-full" name="" height={35} />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
          
        /> */}
        <img
          className="c-sidebar-brand-full"
          style={{ height: "100px", width: "100" }}
          src={Logo}
          alt="Dashboard"
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
