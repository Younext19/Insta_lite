import React from "react";
import Sidebar from "../SideBar/Sidebar";
import "./style.css";
import AdminSideBar from "../SideBar/AdminSidebar";
export default function Layout({ children, isAdmin = false }) {
  return (
    <div>
      {isAdmin ? (
        <>
          <AdminSideBar /> <div className="admin-content">{children}</div>
        </>
      ) : (
        <>
          <Sidebar isLogged={true} />
          <div className="right-content">{children}</div>
        </>
      )}
    </div>
  );
}
