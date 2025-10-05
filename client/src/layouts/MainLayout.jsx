import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 h-screen overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
