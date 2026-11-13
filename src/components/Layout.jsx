import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Map route pathname to clean title
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/dashboard":
        return "Student Readiness Dashboard";
      case "/assessment":
        return "Profile Assessment Form";
      case "/readiness":
        return "Interview Readiness Prediction";
      case "/preparation":
        return "Preparation Roadmap & Goals";
      case "/companies":
        return "Target Companies Benchmark";
      case "/profile":
        return "Student Candidate Profile";
      default:
        return "PrePilot";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={getPageTitle(location.pathname)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
