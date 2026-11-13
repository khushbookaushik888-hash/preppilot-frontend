import React from "react";
import {
  Building2,
  Clock,
  Sparkles,
  Code2,
  CheckCircle2,
  Info,
  ExternalLink,
  ShieldCheck,
  Cpu
} from "lucide-react";

export default function Companies() {
  // Six companies with verified data from Company_Tech_Job_Requirements_Dataset.xlsx (24,000 records)
  const companies = [
    {
      name: "Google",
      tier: "Tier 1 Product Leader",
      dsaLevel: "Advanced to Expert",
      leetcodeRange: "350 - 650+ Questions",
      primaryFocus: "High Algorithmic Depth & System Design",
      techStack: "Git, CI/CD Pipelines, SQL, Distributed Systems",
      culture: "Complex problem solving, clean code, scalable architecture",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      accentBorder: "border-blue-500",
      logoLetter: "G",
      logoBg: "bg-red-500",
    },
    {
      name: "Microsoft",
      tier: "Tier 1 Product Leader",
      dsaLevel: "Advanced to Expert",
      leetcodeRange: "350 - 648+ Questions",
      primaryFocus: "Data Structures, OOPs & Azure Cloud Services",
      techStack: "C++, C#, Python, SQL, System Architecture",
      culture: "Engineering excellence, modular design, collaborative problem solving",
      badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
      accentBorder: "border-indigo-500",
      logoLetter: "M",
      logoBg: "bg-blue-600",
    },
    {
      name: "Amazon",
      tier: "Tier 1 Product Leader",
      dsaLevel: "Advanced to Expert",
      leetcodeRange: "350 - 649+ Questions",
      primaryFocus: "Trees, Graphs, DP & Leadership Principles",
      techStack: "Java, AWS Services, Microservices, Relational DBs",
      culture: "Customer obsession, high-velocity coding, 16 Leadership Principles",
      badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
      accentBorder: "border-amber-500",
      logoLetter: "A",
      logoBg: "bg-amber-600",
    },
    {
      name: "TCS",
      tier: "Global IT Services Leader",
      dsaLevel: "Intermediate to Advanced",
      leetcodeRange: "150 - 349 Questions",
      primaryFocus: "Core CS, Aptitude, Java/Python, RDBMS",
      techStack: "Java, Spring Boot, SQL, Cloud Fundamentals",
      culture: "Structured development, client engineering, scalable enterprise delivery",
      badgeClass: "bg-slate-100 text-slate-800 border-slate-200",
      accentBorder: "border-slate-500",
      logoLetter: "T",
      logoBg: "bg-slate-800",
    },
    {
      name: "Infosys",
      tier: "Global IT Services Leader",
      dsaLevel: "Intermediate to Advanced",
      leetcodeRange: "150 - 349 Questions",
      primaryFocus: "Algorithmic Basics, Aptitude & Web Technologies",
      techStack: "Python, Java, Full Stack Tools, SQL",
      culture: "Continuous learning, digital transformation, structured training tracks",
      badgeClass: "bg-slate-100 text-slate-800 border-slate-200",
      accentBorder: "border-sky-500",
      logoLetter: "I",
      logoBg: "bg-sky-600",
    },
    {
      name: "Capgemini",
      tier: "Global Consulting & Tech Leader",
      dsaLevel: "Intermediate to Advanced",
      leetcodeRange: "153 - 349 Questions",
      primaryFocus: "Technical Assessment, Pseudo-Code, Communication",
      techStack: "Java, JavaScript, REST APIs, SQL Databases",
      culture: "Agile methodologies, client solutions, global consulting standards",
      badgeClass: "bg-slate-100 text-slate-800 border-slate-200",
      accentBorder: "border-blue-400",
      logoLetter: "C",
      logoBg: "bg-blue-700",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Target Company Benchmarks</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Company-Wise Hiring Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Authentic hiring expectations derived from our dataset of 24,000 real engineering job requirements across product leaders and global IT giants.
            </p>
          </div>

          <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2 text-xs text-indigo-700 font-semibold shrink-0">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Matching Engine: Coming in Phase 2</span>
          </div>
        </div>
      </div>

      {/* Compliance / Authenticity Disclaimer */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Project Notice:</strong> Company cards below display authentic role requirements from our dataset. In accordance with PrePilot's phased roadmap, <strong>individual student-to-company percentage match scores will be calculated by the Company Matching Engine in Phase 2</strong> without hardcoding or fabrication.
        </div>
      </div>

      {/* 6 Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((comp) => (
          <div
            key={comp.name}
            className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${comp.logoBg} text-white font-extrabold flex items-center justify-center text-lg shadow-sm`}
                  >
                    {comp.logoLetter}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{comp.name}</h3>
                    <span className="text-[11px] font-medium text-slate-500 block">
                      {comp.tier}
                    </span>
                  </div>
                </div>

                {/* Coming Soon pill */}
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full border border-slate-200">
                  Phase 2
                </span>
              </div>

              {/* Requirement Attributes */}
              <div className="space-y-2.5 py-3 border-y border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">DSA Proficiency:</span>
                  <span className="font-bold text-slate-800">{comp.dsaLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">LeetCode Solved Target:</span>
                  <span className="font-bold text-indigo-700">{comp.leetcodeRange}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 shrink-0">Focus Areas:</span>
                  <span className="font-medium text-slate-700 text-right">{comp.primaryFocus}</span>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Core Frameworks & Tools:
                </span>
                <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {comp.techStack}
                </p>
              </div>
            </div>

            {/* Bottom Status Card */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Verified Benchmark
              </span>
              <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                Matching Coming Soon
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
