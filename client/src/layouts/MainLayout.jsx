import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import GlobalHeader from "../components/GlobalHeader"; // Import the new header

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <GlobalHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
