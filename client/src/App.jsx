import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ExplorerPage from "./pages/ExplorerPage";
import ResourceHubPage from "./pages/ResourceHubPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Both the root path and /explorer will now correctly load the main page */}
          <Route path="/" element={<ExplorerPage />} />
          <Route path="/explorer" element={<ExplorerPage />} />
          <Route path="/resources" element={<ResourceHubPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;