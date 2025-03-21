import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Portfolio } from "./screens/ElementLight";
import { Live } from './screens/Live';
import { Cogito } from './screens/Cogito';

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/live" element={<Live />} />
        <Route path="/cogito" element={<Cogito />} />
      </Routes>
    </Router>
  </StrictMode>,
);
