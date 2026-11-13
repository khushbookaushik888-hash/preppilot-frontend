import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Readiness from "./pages/Readiness";
import Preparation from "./pages/Preparation";
import Companies from "./pages/Companies";
import Profile from "./pages/Profile";

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Authenticated / App Portal wrapped in Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/readiness" element={<Readiness />} />
            <Route path="/preparation" element={<Preparation />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;