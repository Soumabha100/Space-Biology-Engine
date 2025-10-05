import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ExplorerPage from "./pages/ExplorerPage";
import ResourceHubPage from "./pages/ResourceHubPage";
import ChatPage from "./pages/ChatPage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ExplorerPage />} />
          <Route path="/explorer" element={<ExplorerPage />} />
          <Route path="/resources" element={<ResourceHubPage />} />
          <Route path="/chat/:entityId" element={<ChatPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;