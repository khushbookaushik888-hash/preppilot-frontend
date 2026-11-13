import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  BarChart3,
  Building2,
  Sparkles,
  Award,
  BookOpen,
  Users,
  Target
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

export default function Landing() {
  const { isLiveMLConnected } = useStudent();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                PrePilot
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                AI Career Platform
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6">
            <Link to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition">
              Dashboard
            </Link>
            <Link to="/companies" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition hidden sm:inline-block">
              Companies
            </Link>
            <Link to="/assessment" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition hidden md:inline-block">
              Assessment Form
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm shadow-indigo-500/20"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-indigo-50/40 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-Powered Interview Preparation and Career Readiness Prediction</span>
            <span className="px-1.5 py-0.2 bg-indigo-600 text-white text-[10px] rounded-full">v1.0</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
            Know Your Readiness. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">
              Prepare for Your Dream Career.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            PrePilot analyzes your academic profile, technical competencies, coding problem-solving activity, and target role to estimate interview readiness, identify skill gaps, and recommend personalized next steps.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/25"
            >
              <span>Check Your Readiness</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition shadow-sm"
            >
              <span>Explore Dashboard Demo</span>
            </Link>
          </div>

          {/* Live ML status pill */}
          <div className="mt-8 inline-flex items-center gap-2 text-xs text-slate-500 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveMLConnected ? "bg-emerald-500 animate-pulse" : "bg-indigo-500"
              }`}
            />
            <span>
              {isLiveMLConnected
                ? "Live Random Forest Model active (Model Test-Set Accuracy (12,000 Held-Out Records): 92.89%)"
                : "Trained on 60,000 verified student records across 5 core job roles"}
            </span>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="bg-white border-y border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">60,000</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Student Training Records</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">92.89%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Model Test-Set Accuracy (12,000 Held-Out Records)</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">5 Roles</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Target Engineering Domains</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">24,000</div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Company Tech Benchmarks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              Why PrePilot
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              A Smarter, Data-Driven Route to Placement Success
            </p>
            <p className="mt-3 text-slate-600 text-base">
              Instead of guessing your readiness, let machine learning evaluate your strengths, uncover gaps, and prepare you for technical rounds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Random Forest Readiness Prediction
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evaluates candidates across 4 calibrated readiness tiers: Poor, Average, Good, and Excellent, factoring in CGPA, coding volume, core CS, and interview scores.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Multi-Skill Gap Detection
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automatically pinpoints critical weaknesses across DSA, SQL, DBMS, OOPs, Web Development, and soft skills before you face an actual interviewer.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Target Company Benchmarks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Maintains realistic criteria from 24,000 tech job specifications for top tier product giants (Google, Microsoft, Amazon) and global IT leaders (TCS, Infosys, Capgemini).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              Workflow
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              How PrePilot Works in 4 Steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Enter Academic & Skills</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Input your CGPA, core technical assessment scores, coding problem counts, and target job role.
              </p>
            </div>

            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Predict Readiness</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Scikit-learn Random Forest model generates instant tier classification and probability distribution.
              </p>
            </div>

            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Diagnose Skill Gaps</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review your strengths and areas needing improvement relative to industry expectations.
              </p>
            </div>

            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Target Companies</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow personalized preparation checklists and prepare for specific hiring company bars.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/20"
            >
              <span>Launch Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">PrePilot</span>
                <p className="text-xs text-slate-400">AI-Powered Career Readiness Prediction Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <Link to="/assessment" className="hover:text-white transition">Assessment</Link>
              <Link to="/readiness" className="hover:text-white transition">Readiness</Link>
              <Link to="/companies" className="hover:text-white transition">Companies</Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} PrePilot. Built for College Demonstration.</p>
            <p className="mt-2 sm:mt-0">ML Foundation: Scikit-learn Random Forest (Model Test-Set Accuracy (12,000 Held-Out Records): 92.89%)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
