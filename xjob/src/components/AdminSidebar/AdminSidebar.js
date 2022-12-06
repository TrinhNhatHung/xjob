import React from "react";
import { useLocation } from "react-router";
import "./adminSidebar.css";

function AdminSidebar() {
  const location = useLocation();

  return (
    <div id="adminSidebar">
      {location.pathname === "/admin/dashboard" ? (
        <div className="sidbarItem">
          <a href="/admin/dashboard" className="sidebarLink active">
            Dashboard
          </a>
        </div>
      ) : (
        <div className="sidbarItem">
          <a href="/admin/dashboard" className="sidebarLink">
            Dashboard
          </a>
        </div>
      )}
      {location.pathname === "/admin/manage-account" ? (
        <div className="sidbarItem">
          <a href="/admin/manage-account" className="sidebarLink active">
            Quản lí người dùng
          </a>
        </div>
      ) : (
        <div className="sidbarItem">
          <a href="/admin/manage-account" className="sidebarLink">
            Quản lí người dùng
          </a>
        </div>
      )}
    </div>
  );
}

export default AdminSidebar;
