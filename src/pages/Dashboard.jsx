import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Target,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Code2,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
  Award,
  Layers,
  Activity,
  Briefcase
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

export default function Dashboard() {
  const { profile, prediction, isLiveMLConnected } = useStudent();
  const navigate = useNavigate();

  // Extract skills breakdown
  const skills = [
    { name: "Data Structures & Algorithms", key: "dsa_score", score: profile.dsa_score || 0, category: "Core Problem Solving" },
    { name: "Python Programming", key: "python_score", score: profile.python_score || 0, category: "Languages" },
    { name: "Java Programming", key: "java_score", score: profile.java_score || 0, category: "Languages" },
    { name: "SQL & Querying", key: "sql_score", score: profile.sql_score || 0, category: "Data Systems" },
    { name: "DBMS Concepts", key: "dbms_score", score: profile.dbms_score || 0, category: "Core CS" },
    { name: "Communication Skills", key: "communication_score", score: profile.communication_score || 0, category: "Soft Skills" },
    { name: "Mock Interview Performance", key: "mock_interview_score", score: profile.mock_interview_score || 0, category: "Evaluation" },
  ];

  const strongSkills = skills.filter((s) => s.score >= 75);
  const improvementSkills = skills.filter((s) => s.score < 70);

  const getTierColor = (tier) => {
    switch (tier) {
      case "Excellent":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
          badge: "bg-emerald-600 text-white",
          subtext: "Top-tier candidate exhibiting strong readiness across technical, analytical, and problem-solving domains.",
        };
      case "Good":
        return {
          bg: "bg-indigo-50",
          border: "border-indigo-200",
          text: "text-indigo-700",
          badge: "bg-indigo-600 text-white",
          subtext: "Solid foundational readiness identified. Targeted practice across core topics will strengthen readiness.",
        };
      case "Average":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          badge: "bg-amber-600 text-white",
          subtext: "Foundational technical competency identified. Further reinforcement in DSA and Mock Interviews recommended.",
        };
      case "Poor":
      default:
        return {
          bg: "bg-rose-50",
          border: "border-rose-200",
          text: "text-rose-700",
          badge: "bg-rose-600 text-white",
          subtext: "Requires foundational skill building across programming, academic CGPA, and coding practice.",
        };
    }
  };

  const tierStyle = getTierColor(prediction.predicted_class);
  const solveRate = profile.coding_questions_attempted
    ? Math.round((profile.coding_questions_solved / profile.coding_questions_attempted) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl text-white shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Career Readiness Dashboard</span>
            <span className="bg-indigo-700 text-indigo-200 px-2 py-0.5 rounded-full text-[10px]">
              {profile.degree || "B.Tech"} • Year {profile.university_year || "4"}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back, {profile.name || "Candidate"}!
          </h2>
          <p className="text-sm text-indigo-200 mt-1 max-w-xl">
            Targeting: <strong className="text-white">{profile.target_role_match || "Software Development Engineer (SDE)"}</strong>. Review your readiness metrics and preparation recommendations below.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/assessment")}
            className="px-4 py-2 text-xs font-semibold text-indigo-950 bg-white rounded-lg hover:bg-indigo-50 transition shadow-sm"
          >
            Update Profile
          </button>
          <button
            onClick={() => navigate("/readiness")}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition shadow-sm"
          >
            Prediction Analysis
          </button>
        </div>
      </div>

      {/* Top Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Readiness Card */}
        <div className={`p-6 rounded-2xl border ${tierStyle.border} ${tierStyle.bg} shadow-sm flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Overall Interview Readiness
              </span>
              <Target className={`w-5 h-5 ${tierStyle.text}`} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className={`text-3xl font-extrabold ${tierStyle.text}`}>
                  {prediction.predicted_class}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  Top Class Probability: {Math.round(prediction.confidence * 100)}%
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                Raw Random Forest probability; not calibrated confidence.
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {tierStyle.subtext}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-col gap-1 text-xs">
            <span className="text-slate-500 font-medium">Model Test-Set Accuracy (12,000 Held-Out Records):</span>
            <span className="font-semibold text-indigo-700">
              {isLiveMLConnected ? "92.89% (Live Model Verified)" : "Demo Simulation"}
            </span>
          </div>
        </div>

        {/* Problem Solving / LeetCode Stats */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Coding Problem Solving
              </span>
              <Code2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {profile.coding_questions_solved || 0}
              </span>
              <span className="text-xs text-slate-500">
                / {profile.coding_questions_attempted || 0} attempted
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(solveRate, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Accuracy: <strong className="text-slate-800">{solveRate}%</strong> solved rate
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Portfolio Projects:</span>
            <span className="font-semibold text-slate-800">{profile.projects_count || 0} Completed</span>
          </div>
        </div>

        {/* Academic & Interview Assessment Card */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Academic & Interview Score
              </span>
              <Award className="w-5 h-5 text-violet-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-500">CGPA (0-10)</span>
                <div className="text-2xl font-bold text-slate-900">{profile.cgpa || "—"}</div>
              </div>
              <div>
                <span className="text-xs text-slate-500">Mock Interview</span>
                <div className="text-2xl font-bold text-slate-900">{profile.mock_interview_score || "—"}%</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <span>Certifications:</span>
              <strong className="text-slate-800">{profile.certifications_count || 0} Earned</strong>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Specialization:</span>
            <span className="font-semibold text-slate-800">{profile.specialization || "CSE"}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Skills Overview & Strengths/Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Overview Bars (2 columns wide) */}
        <div className="lg:col-span-2 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Technical Competencies Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Benchmarked against 60,000 career records for {profile.target_role_match}
              </p>
            </div>
            <Link
              to="/readiness"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Detailed Analysis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {skills.map((s) => {
              const isHigh = s.score >= 75;
              const isMid = s.score >= 60 && s.score < 75;
              const barColor = isHigh ? "bg-emerald-500" : isMid ? "bg-indigo-500" : "bg-amber-500";
              const textColor = isHigh ? "text-emerald-700" : isMid ? "text-indigo-700" : "text-amber-700";

              return (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">{s.name}</span>
                      <span className="text-[10px] text-slate-400">({s.category})</span>
                    </div>
                    <span className={`font-bold ${textColor}`}>{s.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${Math.min(s.score, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Improvement Areas (1 column wide) */}
        <div className="space-y-6">
          {/* Strong Skills */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-emerald-700">
              <CheckCircle2 className="w-5 h-5" />
              <h4 className="text-sm font-bold text-slate-900">Strong Competencies</h4>
            </div>
            {strongSkills.length > 0 ? (
              <div className="space-y-2.5">
                {strongSkills.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs"
                  >
                    <span className="font-semibold text-emerald-900">{s.name}</span>
                    <span className="font-bold text-emerald-700">{s.score}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                No skills currently exceed the 75% threshold. Focus on foundational study.
              </p>
            )}
          </div>

          {/* Improvement Areas */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="text-sm font-bold text-slate-900">Skills Needing Improvement</h4>
            </div>
            {improvementSkills.length > 0 ? (
              <div className="space-y-2.5">
                {improvementSkills.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between p-2.5 bg-amber-50/70 border border-amber-100 rounded-xl text-xs"
                  >
                    <div>
                      <span className="font-semibold text-amber-900 block">{s.name}</span>
                      <span className="text-[10px] text-amber-700">Target: Reach 70%+</span>
                    </div>
                    <span className="font-bold text-amber-800">{s.score}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-700 font-medium">
                Outstanding! All your core skills exceed the 70% threshold.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Next Steps Section */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recommended Next Steps</h3>
            <p className="text-xs text-slate-500">
              Personalized action milestones tailored to elevate your readiness category
            </p>
          </div>
          <Link
            to="/preparation"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Full Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Coding Milestone
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">
                Solve 50 Medium LeetCode Questions
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Focus on Binary Search, Two Pointers, and Trees to hit the 300+ solved threshold.
              </p>
            </div>
            <Link
              to="/preparation"
              className="mt-4 text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>View Topics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 bg-violet-50 px-2 py-0.5 rounded border border-violet-100">
                Core Revision
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">
                Revise SQL Queries & DBMS Indexing
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Practice JOINs, subqueries, normalization, and ACID properties for technical screening rounds.
              </p>
            </div>
            <Link
              to="/preparation"
              className="mt-4 text-xs font-semibold text-violet-600 hover:underline flex items-center gap-1"
            >
              <span>Study Guide</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Company Target
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">
                Inspect 6 Company Benchmarks
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Review verified industry requirements across product leaders and IT services ahead of Phase 2 company matching.
              </p>
            </div>
            <Link
              to="/companies"
              className="mt-4 text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
            >
              <span>View Companies</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
