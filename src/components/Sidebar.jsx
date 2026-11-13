import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Target,
  Compass,
  Building2,
  User,
  Zap,
  Sparkles,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

export default function Sidebar({ isOpen, onClose }) {
  const { profile, prediction, isLiveMLConnected } = useStudent();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Profile Assessment", path: "/assessment", icon: FileSpreadsheet },
    { name: "Readiness Prediction", path: "/readiness", icon: Target },
    { name: "Preparation Roadmap", path: "/preparation", icon: Compass },
    { name: "Target Companies", path: "/companies", icon: Building2 },
    { name: "Student Profile", path: "/profile", icon: User },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                PrePilot
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                AI Career Readiness
              </span>
            </div>
          </Link>
        </div>

        {/* Current profile summary card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-indigo-700 bg-indigo-100 rounded-lg">
              {profile.name ? profile.name.charAt(0) : "S"}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-slate-800 truncate">
                {profile.name || "Student Candidate"}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                CGPA {profile.cgpa || "—"} • {profile.degree || "B.Tech"}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">Readiness:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                prediction.predicted_class === "Excellent"
                  ? "bg-emerald-100 text-emerald-800"
                  : prediction.predicted_class === "Good"
                  ? "bg-indigo-100 text-indigo-800"
                  : prediction.predicted_class === "Average"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {prediction.predicted_class || "Good"}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-200" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Live ML status bar at bottom */}
        <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-xs shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveMLConnected
                  ? "bg-emerald-400 animate-ping"
                  : "bg-amber-400"
              }`}
            />
            <span className="font-semibold">
              {isLiveMLConnected ? "Live Random Forest" : "Demo Simulation"}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">
            {isLiveMLConnected
              ? "Trained on 60,000 records. Model Test-Set Accuracy (12,000 Held-Out Records): 92.89%."
              : "Showing demo results. Python API is ready at port 5000."}
          </p>
        </div>

        {/* Footer link to landing */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link to="/" className="text-indigo-600 hover:underline">
            Landing Page
          </Link>
          <span>v1.0 Demo</span>
        </div>
      </aside>
    </>
  );
}
