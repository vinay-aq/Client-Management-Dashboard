import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import usePermission from "../../hooks/usePermission";
import { PERMISSIONS } from "../../utils/permissions";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const canManageUsers = usePermission(PERMISSIONS.MANAGER_USERS);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <nav
      style={{
        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "16px",

        borderBottom: "1px solid #ccc",

        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",

          gap: "16px",
        }}
      >
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/clients">Clients</Link>
        <Link to="/activity/feed">Activity</Link>
        <Link to="/activity/feed/realtime">Activity Realtime</Link>

        {canManageUsers && <Link to="/admin/users">Users</Link>}
      </div>
      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "12px",
        }}
      >
        <span>{user?.email}</span>
        <span>{user?.role}</span>
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
