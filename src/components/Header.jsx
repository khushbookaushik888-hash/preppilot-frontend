import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Briefcase,
  Zap,
  Sparkles,
  PlusCircle,
  Activity,
  Layers
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

export default function Header({ onMenuClick, title = "Dashboard" }) {
  const { profile, prediction, isLiveMLConnected, loadPreset, predictReadiness } = useStudent();
  const navigate = useNavigate();

  const handlePresetSelect = async (e) => {
    const key = e.target.value;
    if (!key) return;
    const loadedData = loadPreset(key);
    if (loadedData) {
      await predictReadiness(loadedData);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-600 rounded-lg lg:hidden hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span>Target Role:</span>
            <span className="font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {profile.target_role_match || "Software Development Engineer (SDE)"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Demo Preset Selector for fast college demonstration */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-100 rounded-lg p-1 border border-slate-200">
          <Layers className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
          <span className="text-[11px] font-semibold text-slate-600">Demo Preset:</span>
          <select
            onChange={handlePresetSelect}
            defaultValue=""
            className="text-xs bg-white text-slate-800 border border-slate-200 rounded px-2 py-1 font-medium focus:outline-none cursor-pointer"
          >
            <option value="" disabled>Select Candidate Profile</option>
            <option value="sde_top">Top-Tier SDE (Excellent)</option>
            <option value="full_stack">Full-Stack Dev (Good)</option>
            <option value="data_engineer">Data Engineer (Excellent)</option>
            <option value="qa_engineer">QA / Tech Support (Average)</option>
            <option value="needs_prep">Junior AI/ML (Poor)</option>
          </select>
        </div>

        {/* Live ML / Demo Badge */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isLiveMLConnected
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
          title={
            isLiveMLConnected
              ? "Connected to real Random Forest Model (Model Test-Set Accuracy (12,000 Held-Out Records): 92.89%)"
              : "Running in frontend demo simulation mode"
          }
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isLiveMLConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
            }`}
          />
          <span className="hidden sm:inline">
            {isLiveMLConnected ? "Live ML Connected" : "Demo Mode"}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/assessment")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm shadow-indigo-500/20"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Assessment</span>
        </button>
      </div>
    </header>
  );
}
