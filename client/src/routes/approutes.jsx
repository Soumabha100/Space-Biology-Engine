import React from "react";
import { Routes, Route } from "react-router-dom";
import ExplorerPage from "../pages/ExplorerPage";
import ResourceHubPage from "../pages/ResourceHubPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ExplorerPage />} /> {/* homepage */}
      <Route path="/explorer" element={<ExplorerPage />} />
      <Route path="/resources" element={<ResourceHubPage />} />
      <Route path="*" element={<ExplorerPage />} /> {/* fallback */}
    </Routes>
  );
};

export default AppRouter;