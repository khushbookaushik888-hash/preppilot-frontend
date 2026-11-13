import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileSpreadsheet,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  Layers,
  ArrowRight
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

export default function Assessment() {
  const { profile, setProfile, predictReadiness, isPredicting, PRESET_PROFILES } = useStudent();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...profile });
  const [errors, setErrors] = useState({});
  const [activePreset, setActivePreset] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const applyPreset = (key) => {
    if (PRESET_PROFILES[key]) {
      setFormData({ ...PRESET_PROFILES[key] });
      setActivePreset(key);
      setErrors({});
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Student name is required.";
    }

    const cgpa = parseFloat(formData.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      newErrors.cgpa = "CGPA must be a valid number between 0.0 and 10.0";
    }

    const scoreFields = [
      { key: "dsa_score", label: "DSA Score" },
      { key: "python_score", label: "Python Score" },
      { key: "java_score", label: "Java Score" },
      { key: "sql_score", label: "SQL Score" },
      { key: "dbms_score", label: "DBMS Score" },
      { key: "communication_score", label: "Communication Score" },
      { key: "mock_interview_score", label: "Mock Interview Score" },
    ];

    scoreFields.forEach(({ key, label }) => {
      const val = parseFloat(formData[key]);
      if (isNaN(val) || val < 0 || val > 100) {
        newErrors[key] = `${label} must be between 0 and 100.`;
      }
    });

    const attempted = parseInt(formData.coding_questions_attempted, 10);
    const solved = parseInt(formData.coding_questions_solved, 10);

    if (isNaN(attempted) || attempted < 0) {
      newErrors.coding_questions_attempted = "Questions attempted must be 0 or greater.";
    }

    if (isNaN(solved) || solved < 0) {
      newErrors.coding_questions_solved = "Questions solved must be 0 or greater.";
    } else if (!isNaN(attempted) && solved > attempted) {
      newErrors.coding_questions_solved = "Solved questions cannot exceed attempted questions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    await predictReadiness(formData);
    navigate("/readiness");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header card */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Candidate Evaluation Intake</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Student Profile Assessment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Enter your academic credentials, technical assessment scores, and coding metrics for AI readiness prediction.
            </p>
          </div>

          {/* Preset Buttons for Demo */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-bold text-slate-600 block mb-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              1-Click Demo Profiles:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset("sde_top")}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  activePreset === "sde_top"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Top SDE (9.2)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("full_stack")}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  activePreset === "full_stack"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Full Stack (7.9)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("data_engineer")}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  activePreset === "data_engineer"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Data Eng (8.3)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("qa_engineer")}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  activePreset === "qa_engineer"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                QA / Support (6.3)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("needs_prep")}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  activePreset === "needs_prep"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Needs Prep (5.1)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Error Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Please correct the highlighted fields:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Academic & Target Goal */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
            1. Student Identification & Career Goal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full px-3.5 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? "border-rose-400 bg-rose-50/50" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Job Role <span className="text-rose-500">*</span>
              </label>
              <select
                name="target_role_match"
                value={formData.target_role_match || "Software Development Engineer (SDE)"}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Software Development Engineer (SDE)">Software Development Engineer (SDE)</option>
                <option value="Full Stack Web Developer">Full Stack Web Developer</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Data Engineer / Analyst">Data Engineer / Analyst</option>
                <option value="Technical Support / QA Engineer">Technical Support / QA Engineer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Degree</label>
              <select
                name="degree"
                value={formData.degree || "B.Tech"}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Sc CS">B.Sc CS</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">University Year</label>
              <select
                name="university_year"
                value={formData.university_year || "Fourth Year"}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Fourth Year">Fourth Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Specialization</label>
              <select
                name="specialization"
                value={formData.specialization || "CSE"}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="CSE">CSE</option>
                <option value="CSE (AI/ML)">CSE (AI/ML)</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CGPA (0.0 - 10.0) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                name="cgpa"
                value={formData.cgpa ?? ""}
                onChange={handleChange}
                placeholder="e.g. 8.2"
                className={`w-full px-3.5 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.cgpa ? "border-rose-400 bg-rose-50/50" : "border-slate-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Technical Scores */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
            2. Core Technical Assessment Scores (0 - 100)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                DSA Score <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="dsa_score"
                value={formData.dsa_score ?? ""}
                onChange={handleChange}
                placeholder="0-100"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.dsa_score ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Python Score <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="python_score"
                value={formData.python_score ?? ""}
                onChange={handleChange}
                placeholder="0-100"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.python_score ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Java Score <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="java_score"
                value={formData.java_score ?? ""}
                onChange={handleChange}
                placeholder="0-100"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.java_score ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SQL Score <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="sql_score"
                value={formData.sql_score ?? ""}
                onChange={handleChange}
                placeholder="0-100"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.sql_score ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                DBMS Score <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="dbms_score"
                value={formData.dbms_score ?? ""}
                onChange={handleChange}
                placeholder="0-100"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.dbms_score ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Interview, Coding & Portfolio */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
            3. Soft Skills, Coding Activity & Portfolio
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Communication Score (0-100) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="communication_score"
                value={formData.communication_score ?? ""}
                onChange={handleChange}
                placeholder="0-100"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.communication_score ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mock Interview Score (0-100) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="mock_interview_score"
                value={formData.mock_interview_score ?? ""}
                onChange={handleChange}
                placeholder="0-100"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.mock_interview_score ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Questions Attempted <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="coding_questions_attempted"
                value={formData.coding_questions_attempted ?? ""}
                onChange={handleChange}
                placeholder="e.g. 400"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.coding_questions_attempted ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Questions Solved <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="coding_questions_solved"
                value={formData.coding_questions_solved ?? ""}
                onChange={handleChange}
                placeholder="e.g. 320"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.coding_questions_solved ? "border-rose-400" : "border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Projects Completed
              </label>
              <input
                type="number"
                name="projects_count"
                value={formData.projects_count ?? ""}
                onChange={handleChange}
                placeholder="e.g. 4"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Certifications Count
              </label>
              <input
                type="number"
                name="certifications_count"
                value={formData.certifications_count ?? ""}
                onChange={handleChange}
                placeholder="e.g. 2"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500">
            Clicking predict will evaluate your candidate profile using the Random Forest classifier.
          </p>

          <button
            type="submit"
            disabled={isPredicting}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white rounded-xl shadow-md transition ${
              isPredicting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25"
            }`}
          >
            {isPredicting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Evaluating with ML Model...</span>
              </>
            ) : (
              <>
                <span>Predict Career Readiness</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
