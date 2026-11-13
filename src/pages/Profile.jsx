import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Code2,
  Calendar,
  CheckCircle2,
  Edit3,
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

export default function Profile() {
  const { profile, prediction } = useStudent();
  const navigate = useNavigate();

  const academicInfo = [
    { label: "Degree", value: profile.degree || "B.Tech" },
    { label: "University Year", value: profile.university_year || "Fourth Year" },
    { label: "Specialization", value: profile.specialization || "Computer Science (CSE)" },
    { label: "Academic CGPA", value: `${profile.cgpa || "—"} / 10.0` },
  ];

  const technicalScores = [
    { label: "Data Structures & Algorithms", value: `${profile.dsa_score || 0}%` },
    { label: "Python Programming", value: `${profile.python_score || 0}%` },
    { label: "Java Programming", value: `${profile.java_score || 0}%` },
    { label: "SQL & Querying", value: `${profile.sql_score || 0}%` },
    { label: "DBMS Fundamentals", value: `${profile.dbms_score || 0}%` },
    { label: "Communication Skills", value: `${profile.communication_score || 0}%` },
    { label: "Mock Interview Performance", value: `${profile.mock_interview_score || 0}%` },
  ];

  const codingActivity = [
    { label: "Questions Attempted", value: profile.coding_questions_attempted || 0 },
    { label: "Questions Solved", value: profile.coding_questions_solved || 0 },
    { label: "Portfolio Projects", value: profile.projects_count || 0 },
    { label: "Certifications", value: profile.certifications_count || 0 },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Student Banner */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-extrabold flex items-center justify-center text-2xl shadow-md shadow-indigo-500/20">
            {profile.name ? profile.name.charAt(0) : "S"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{profile.name || "Student Candidate"}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                {profile.degree || "B.Tech"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              Target Role: <strong className="text-slate-800">{profile.target_role_match}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/assessment")}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-sm"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Assessment Profile</span>
        </button>
      </div>

      {/* Readiness Badge Summary */}
      <div className="p-6 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Evaluated Career Readiness
            </span>
            <div className="text-xl font-black text-indigo-950">
              {prediction.predicted_class} (Top Class Probability: {Math.round(prediction.confidence * 100)}%)
            </div>
            <span className="text-[10px] text-slate-500 block">
              Raw Random Forest probability; not calibrated confidence.
            </span>
          </div>
        </div>

        <Link
          to="/readiness"
          className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 bg-white px-3.5 py-2 rounded-lg border border-indigo-200 shadow-sm"
        >
          <span>View Full Prediction Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid: Academic Info & Coding Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Details */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Academic Profile</span>
          </h3>
          <div className="space-y-3">
            {academicInfo.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{item.label}:</span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coding & Portfolio */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-600" />
            <span>Problem Solving & Portfolio</span>
          </h3>
          <div className="space-y-3">
            {codingActivity.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{item.label}:</span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Assessment Scores Card */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>Technical Assessment Record</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {technicalScores.map((score) => (
            <div key={score.label} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">{score.label}</span>
              <span className="text-base font-bold text-slate-900">{score.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
