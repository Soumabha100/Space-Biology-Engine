import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx"; // 1. Import the SearchProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. Wrap your app with the SearchProvider */}
    <SearchProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SearchProvider>
  </React.StrictMode>
);
