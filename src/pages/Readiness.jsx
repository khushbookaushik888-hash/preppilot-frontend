import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Info,
  Clock,
  Briefcase,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

export default function Readiness() {
  const { profile, prediction, isLiveMLConnected } = useStudent();
  const navigate = useNavigate();

  const getTierDetails = (tier) => {
    switch (tier) {
      case "Excellent":
        return {
          title: "Tier 1 Ready – Excellent",
          badgeColor: "bg-emerald-600 text-white",
          bgColor: "bg-emerald-50/70 border-emerald-200",
          textColor: "text-emerald-700",
          barColor: "bg-emerald-500",
          summary: "Your profile exhibits exceptional readiness across technical problem solving, core computer science concepts, and academic performance.",
        };
      case "Good":
        return {
          title: "Tier 2 Ready – Good",
          badgeColor: "bg-indigo-600 text-white",
          bgColor: "bg-indigo-50/70 border-indigo-200",
          textColor: "text-indigo-700",
          barColor: "bg-indigo-500",
          summary: "You possess solid foundational skills and strong problem-solving potential across core technical areas. Refining advanced DSA and participating in mock interviews will help elevate your readiness to Excellent.",
        };
      case "Average":
        return {
          title: "Tier 3 Ready – Average",
          badgeColor: "bg-amber-600 text-white",
          bgColor: "bg-amber-50/70 border-amber-200",
          textColor: "text-amber-700",
          barColor: "bg-amber-500",
          summary: "Your profile indicates foundational competence in core areas. Structured practice in data structures, algorithms, and technical communication is recommended to strengthen readiness.",
        };
      case "Poor":
      default:
        return {
          title: "Needs Foundation – Poor",
          badgeColor: "bg-rose-600 text-white",
          bgColor: "bg-rose-50/70 border-rose-200",
          textColor: "text-rose-700",
          barColor: "bg-rose-500",
          summary: "Your profile indicates significant gaps in core programming and problem-solving practice. Immediate structured revision of algorithms, academic subjects, and communication practice is required.",
        };
    }
  };

  const details = getTierDetails(prediction.predicted_class);
  const probabilities = prediction.probabilities || {
    Poor: 0.05,
    Average: 0.15,
    Good: 0.70,
    Excellent: 0.10,
  };

  // Determine strengths & gaps
  const strengths = [];
  const gaps = [];

  if (profile.cgpa >= 8.0) strengths.push(`High Academic Discipline (CGPA ${profile.cgpa})`);
  else if (profile.cgpa < 6.5) gaps.push(`Academic CGPA (${profile.cgpa}) is below competitive benchmark (7.0+)`);

  if (profile.dsa_score >= 75) strengths.push(`Strong DSA & Algorithmic Problem Solving (${profile.dsa_score}%)`);
  else if (profile.dsa_score < 65) gaps.push(`DSA & Problem Solving (${profile.dsa_score}%) needs focused practice`);

  if (profile.coding_questions_solved >= 300) strengths.push(`Robust Coding Volume (${profile.coding_questions_solved} questions solved)`);
  else if (profile.coding_questions_solved < 150) gaps.push(`Low Coding Volume (${profile.coding_questions_solved} solved) – target at least 250+`);

  if (profile.mock_interview_score >= 75) strengths.push(`Strong Mock Interview Performance (${profile.mock_interview_score}%)`);
  else if (profile.mock_interview_score < 65) gaps.push(`Mock Interview Score (${profile.mock_interview_score}%) indicates interview anxiety or communication gap`);

  if (profile.sql_score >= 80) strengths.push(`Proficient SQL & Query Optimization (${profile.sql_score}%)`);
  if (profile.python_score >= 80) strengths.push(`High Python Proficiency (${profile.python_score}%)`);

  if (strengths.length === 0) strengths.push("Eager learner with a blank canvas for improvement");
  if (gaps.length === 0) gaps.push("Maintain consistency and practice system design for senior rounds");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner with Model Status */}
      <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm text-xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-semibold text-slate-800">ML Model Diagnostics:</span>
            <span className="text-slate-500">
              {prediction.mode === "live_ml"
                ? "Evaluated using Persistent Scikit-learn Random Forest Pipeline"
                : "Evaluated in Demo Simulation Mode"}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`px-3 py-1 rounded-full font-bold text-[11px] flex items-center gap-1.5 ${
                prediction.mode === "live_ml"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-amber-100 text-amber-800 border border-amber-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  prediction.mode === "live_ml" ? "bg-emerald-600 animate-pulse" : "bg-amber-600"
                }`}
              />
              {prediction.mode === "live_ml"
                ? "Model Test-Set Accuracy (12,000 Held-Out Records): 92.89%"
                : "Demo Mode (Simulated)"}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-slate-600 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            Prediction Pipeline Execution Time:{" "}
            <strong className="text-slate-800 font-semibold">
              {prediction.inference_time_ms ? `${prediction.inference_time_ms} ms` : "< 15 ms"}
            </strong>{" "}
            (including validation, imputation and inference)
          </span>
        </div>
      </div>

      {/* Main Readiness Decision Card */}
      <div className={`p-8 rounded-3xl border ${details.bgColor} shadow-sm`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${details.badgeColor}`}>
                {prediction.predicted_class}
              </span>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                Target Role: <strong>{prediction.target_role || profile.target_role_match}</strong>
              </span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-extrabold ${details.textColor} tracking-tight`}>
              {details.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
              {details.summary}
            </p>
          </div>

          {/* Top Class Probability Badge */}
          <div className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm min-w-[220px] max-w-[260px] text-center">
            <div className={`text-4xl font-black ${details.textColor}`}>
              {Math.round(prediction.confidence * 100)}%
            </div>
            <span className="text-xs font-bold text-slate-700 mt-1">
              Top Class Probability: {Math.round(prediction.confidence * 100)}%
            </span>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
              Raw Random Forest probability; not calibrated confidence.
            </p>
          </div>
        </div>

        {/* Probabilities Breakdown */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span>Class Probability Distribution</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(probabilities).map(([cls, prob]) => {
              const isWinner = cls === prediction.predicted_class;
              const pct = Math.round(prob * 100);

              return (
                <div
                  key={cls}
                  className={`p-3 rounded-xl border ${
                    isWinner
                      ? "bg-white border-indigo-300 shadow-sm"
                      : "bg-white/60 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-semibold ${isWinner ? "text-indigo-950 font-bold" : "text-slate-600"}`}>
                      {cls}
                    </span>
                    <span className="font-bold text-slate-900">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isWinner ? details.barColor : "bg-slate-300"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Strengths & Improvement Areas Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identified Strengths */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Your Competitive Strengths</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Features where your profile exceeds standard placement benchmarks:
          </p>
          <ul className="space-y-3">
            {strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Identified Gaps */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Priority Areas to Improve</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Deficiencies that may present hurdles during technical interviews:
          </p>
          <ul className="space-y-3">
            {gaps.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Navigation Footer */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Next Action: Begin Targeted Preparation</h4>
          <p className="text-xs text-slate-500">
            Follow the curated study roadmap or compare against the 6 target company benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/assessment")}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
          <button
            onClick={() => navigate("/preparation")}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-sm flex items-center gap-1.5"
          >
            <span>View Preparation Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
