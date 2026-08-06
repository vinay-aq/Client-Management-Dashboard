import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <main style={{padding: '1rem'}}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
