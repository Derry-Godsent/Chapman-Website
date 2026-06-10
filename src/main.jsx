import React from "react";
import { createRoot } from "react-dom/client"; // ✅ FIX: Import createRoot
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // ✅ For SEO meta tags
import App from "./App";
import "./index.css";
import { Analytics } from '@vercel/analytics/react';

// ✅ FIX: Use createRoot from react-dom/client (React 18)
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
         <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);