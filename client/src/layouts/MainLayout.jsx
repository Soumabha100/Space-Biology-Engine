import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      {/* The fix is here: removing the redundant 'h-screen' class from <main>
          allows the flex container to correctly manage the height. */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;