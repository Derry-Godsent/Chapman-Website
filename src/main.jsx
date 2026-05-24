import React from "react";
import { createRoot } from "react-dom/client"; // ✅ FIX: Import createRoot
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // ✅ For SEO meta tags
import App from "./App";
import "./index.css"; // If you have global styles

// ✅ FIX: Use createRoot from react-dom/client (React 18)
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);