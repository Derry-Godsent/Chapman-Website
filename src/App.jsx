import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import Staffing from "./pages/Staffing.jsx";


import { lazy, Suspense } from "react";
const Home       = lazy(() => import("./pages/Home"));
const Services   = lazy(() => import("./pages/Services"));
const About      = lazy(() => import("./pages/About"));
const Contact    = lazy(() => import("./pages/Contact"));
const Team       = lazy(() => import("./pages/Team"));
const Careers    = lazy(() => import("./pages/Careers"));
const NotFound   = lazy(() => import("./pages/NotFound"));

function App() {
  const location = useLocation();

  return (
    <ErrorBoundary> {/* ✅ ADDED: Graceful error handling */}
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={
  <div style={{ height: "100vh", display: "grid", placeItems: "center", background: "#09090b" }}>
    <div style={{ width: 40, height: 40, border: "2px solid rgba(255,255,255,.1)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"         element={<Home />}     />
            <Route path="/services" element={<Services />} />
            <Route path="/about"    element={<About />}    />
            <Route path="/contact"  element={<Contact />}  />
            <Route path="/team"     element={<Team />}     />
            <Route path="*"         element={<NotFound />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/staffing" element={<Staffing />} />
          </Routes>
          </Suspense>
        </AnimatePresence>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;