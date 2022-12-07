import React from "react";
import Sidebar from "./Sidebar";
import "./main.css";

function Layout(props) {
  return (
    <div className="main">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default Layout;
