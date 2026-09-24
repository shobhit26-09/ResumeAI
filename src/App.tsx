import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import Analyzer from "./pages/Analyzer";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";

function ScrollTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0); }, [pathname]); return null; }

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/templates" element={<Templates />} />
        {["/features", "/pricing", "/sign-in/*", "/sign-up/*"].map(p => <Route key={p} path={p} element={<Navigate to="/" replace />} />)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
