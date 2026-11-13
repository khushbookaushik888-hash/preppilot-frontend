import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  CheckCircle2,
  Calendar,
  Code2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Target,
  ListTodo,
  ExternalLink,
  Layers
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

export default function Preparation() {
  const { profile, prediction } = useStudent();

  // Interactive checklist state
  const [completedGoals, setCompletedGoals] = useState({
    "goal-1": true,
    "goal-2": false,
    "goal-3": false,
    "goal-4": true,
    "goal-5": false,
    "goal-6": false,
  });

  const toggleGoal = (id) => {
    setCompletedGoals((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalGoals = Object.keys(completedGoals).length;
  const completedCount = Object.values(completedGoals).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalGoals) * 100);

  // Recommended topics tailored based on student scores
  const roadmapWeeks = [
    {
      week: "Week 1: Data Structures Foundation",
      focus: "Arrays, Two Pointers & Binary Search",
      goals: [
        { id: "goal-1", text: "Solve 15 LeetCode Mediums on Two-Pointers and Sliding Window" },
        { id: "goal-2", text: "Implement Binary Search variations (rotated array, search range)" },
      ],
      topics: ["Two Pointers", "Sliding Window", "Binary Search", "Hash Maps"],
      status: "In Progress",
    },
    {
      week: "Week 2: Advanced Data Structures & Recursion",
      focus: "Trees, Graphs & Depth-First Search",
      goals: [
        { id: "goal-3", text: "Master Binary Tree Traversals (BFS, DFS, Level Order)" },
        { id: "goal-4", text: "Solve 10 LeetCode Medium questions on Lowest Common Ancestor & Tree Inversion" },
      ],
      topics: ["Binary Search Tree", "BFS / DFS", "Recursion", "Tries"],
      status: "Upcoming",
    },
    {
      week: "Week 3: Core CS & System Fundamentals",
      focus: "DBMS Normalization, SQL & Operating Systems",
      goals: [
        { id: "goal-5", text: "Write complex SQL JOINs, GROUP BY and Window Functions" },
        { id: "goal-6", text: "Revise OS Process Scheduling, Threads, Deadlocks and Virtual Memory" },
      ],
      topics: ["SQL Window Functions", "B-Tree Indexing", "ACID Properties", "Deadlocks"],
      status: "Upcoming",
    },
    {
      week: "Week 4: Mock Interviews & Behavioral Rounds",
      focus: "System Design Basics & STAR Method Responses",
      goals: [
        { id: "goal-7", text: "Conduct 2 AI Mock Interviews with speech/answer timing" },
        { id: "goal-8", text: "Prepare 5 STAR method stories for behavioral and leadership questions" },
      ],
      topics: ["System Architecture", "STAR Method", "Behavioral Interview", "Resume Defense"],
      status: "Upcoming",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Structured Interview Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Personalized Preparation Plan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Curated roadmap tailored for <strong className="text-slate-800">{profile.target_role_match || "Software Development Engineer (SDE)"}</strong> candidates currently rated <strong className="text-indigo-600">{prediction.predicted_class}</strong>.
          </p>
        </div>

        {/* Overall Completion Metric */}
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl min-w-[200px]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-indigo-950">Milestone Progress:</span>
            <span className="font-bold text-indigo-700">{progressPct}%</span>
          </div>
          <div className="w-full bg-indigo-200/60 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-[11px] text-indigo-600 mt-1 block text-right font-medium">
            {completedCount} of {totalGoals} tasks completed
          </span>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            <strong>Demo Plan Notice:</strong> These curated study topics are sample benchmarks aligned with our 1,446 LeetCode topic database. Interactive weekly tasks are clickable.
          </span>
        </div>
        <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
          Curated Blueprint
        </span>
      </div>

      {/* 4-Week Roadmap Cards */}
      <div className="space-y-4">
        {roadmapWeeks.map((week, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                  {week.week}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {week.focus}
                </h3>
              </div>
              <span
                className={`self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-semibold ${
                  idx === 0
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {week.status}
              </span>
            </div>

            {/* Checklist items */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <ListTodo className="w-3.5 h-3.5" />
                <span>Weekly Action Goals (Click to toggle completion)</span>
              </h4>
              <div className="space-y-2">
                {week.goals.map((g) => {
                  const isDone = completedGoals[g.id];
                  return (
                    <label
                      key={g.id}
                      onClick={() => toggleGoal(g.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition select-none ${
                        isDone
                          ? "bg-emerald-50/60 border-emerald-200 text-slate-800 line-through opacity-80"
                          : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100/80"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!isDone}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className="flex-1 font-medium">{g.text}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Key Topics Tag Cloud */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                Key Topics to Master:
              </span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1 sm:mt-0">
                {week.topics.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-lg border border-slate-200/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Target Companies Callout */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-base font-bold">Ready to measure up against actual companies?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Check verified hiring standards across product leaders and IT services ahead of Phase 2 matching.
          </p>
        </div>
        <Link
          to="/companies"
          className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <span>Explore Companies</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
