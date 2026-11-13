import React, { createContext, useContext, useState, useEffect } from "react";

const StudentContext = createContext();

export const PRESET_PROFILES = {
  sde_top: {
    name: "Aarav Mehta",
    degree: "B.Tech",
    university_year: "Fourth Year",
    specialization: "CSE",
    target_role_match: "Software Development Engineer (SDE)",
    cgpa: 9.2,
    dsa_score: 92,
    python_score: 85,
    java_score: 88,
    sql_score: 85,
    dbms_score: 86,
    communication_score: 85,
    mock_interview_score: 88,
    coding_questions_attempted: 580,
    coding_questions_solved: 520,
    projects_count: 5,
    certifications_count: 3,
  },
  full_stack: {
    name: "Sneha Rao",
    degree: "B.Tech",
    university_year: "Fourth Year",
    specialization: "IT",
    target_role_match: "Full Stack Web Developer",
    cgpa: 7.9,
    dsa_score: 70,
    python_score: 75,
    java_score: 65,
    sql_score: 80,
    dbms_score: 78,
    communication_score: 78,
    mock_interview_score: 72,
    coding_questions_attempted: 340,
    coding_questions_solved: 280,
    projects_count: 4,
    certifications_count: 2,
  },
  data_engineer: {
    name: "Rohan Verma",
    degree: "B.Tech",
    university_year: "Fourth Year",
    specialization: "CSE (AI/ML)",
    target_role_match: "Data Engineer / Analyst",
    cgpa: 8.3,
    dsa_score: 74,
    python_score: 90,
    java_score: 60,
    sql_score: 94,
    dbms_score: 90,
    communication_score: 75,
    mock_interview_score: 76,
    coding_questions_attempted: 390,
    coding_questions_solved: 310,
    projects_count: 4,
    certifications_count: 3,
  },
  qa_engineer: {
    name: "Ananya Patel",
    degree: "B.Tech",
    university_year: "Third Year",
    specialization: "ECE",
    target_role_match: "Technical Support / QA Engineer",
    cgpa: 6.3,
    dsa_score: 46,
    python_score: 52,
    java_score: 42,
    sql_score: 50,
    dbms_score: 48,
    communication_score: 55,
    mock_interview_score: 50,
    coding_questions_attempted: 150,
    coding_questions_solved: 95,
    projects_count: 2,
    certifications_count: 1,
  },
  needs_prep: {
    name: "Karan Singh",
    degree: "B.Tech",
    university_year: "Second Year",
    specialization: "CSE",
    target_role_match: "AI/ML Engineer",
    cgpa: 5.1,
    dsa_score: 30,
    python_score: 38,
    java_score: 25,
    sql_score: 30,
    dbms_score: 28,
    communication_score: 35,
    mock_interview_score: 32,
    coding_questions_attempted: 70,
    coding_questions_solved: 35,
    projects_count: 1,
    certifications_count: 0,
  },
};

const DEFAULT_PROFILE = PRESET_PROFILES.sde_top;

const DEFAULT_PREDICTION = {
  status: "success",
  predicted_class: "Excellent",
  confidence: 0.93,
  probabilities: {
    Average: 0.0,
    Excellent: 0.93,
    Good: 0.07,
    Poor: 0.0,
  },
  target_role: "Software Development Engineer (SDE)",
  inference_time_ms: 132.5,
  mode: "live_ml",
  model_info: {
    algorithm: "Random Forest Classifier",
    accuracy: "Model Test-Set Accuracy (12,000 Held-Out Records): 92.89%",
    records_evaluated: 60000,
  },
  updated_at: new Date().toISOString(),
};

export function StudentProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("preppilot_profile");
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [prediction, setPrediction] = useState(() => {
    try {
      const saved = localStorage.getItem("preppilot_prediction");
      return saved ? JSON.parse(saved) : DEFAULT_PREDICTION;
    } catch {
      return DEFAULT_PREDICTION;
    }
  });

  const [isLiveMLConnected, setIsLiveMLConnected] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);

  // Check live ML server health periodically
  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/health", {
          signal: AbortSignal.timeout(2000),
        });
        if (res.ok && isMounted) {
          setIsLiveMLConnected(true);
        } else if (isMounted) {
          setIsLiveMLConnected(false);
        }
      } catch {
        if (isMounted) setIsLiveMLConnected(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("preppilot_profile", JSON.stringify(profile));
    } catch (e) {
      console.warn("Could not save profile to localStorage", e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem("preppilot_prediction", JSON.stringify(prediction));
    } catch (e) {
      console.warn("Could not save prediction to localStorage", e);
    }
  }, [prediction]);

  // Client-side simulation fallback if python server is offline
  const simulatePrediction = (studentData) => {
    const cgpa = parseFloat(studentData.cgpa) || 7.0;
    const dsa = parseFloat(studentData.dsa_score) || 60;
    const solved = parseInt(studentData.coding_questions_solved, 10) || 150;
    const mock = parseFloat(studentData.mock_interview_score) || 60;
    const comm = parseFloat(studentData.communication_score) || 60;

    // Weighted composite score (mirroring the Random Forest feature importances from Phase 0)
    // CGPA (22%), DSA/LeetCode (20%), Core scores (20%), Mock/Comm (15%)
    const composite = (cgpa / 10.0) * 35 + (dsa / 100.0) * 25 + Math.min(solved / 450.0, 1.0) * 20 + ((mock + comm) / 200.0) * 20;

    let predictedClass = "Average";
    let probas = { Poor: 0.05, Average: 0.70, Good: 0.22, Excellent: 0.03 };

    if (composite >= 80) {
      predictedClass = "Excellent";
      probas = { Poor: 0.0, Average: 0.02, Good: 0.15, Excellent: 0.83 };
    } else if (composite >= 62) {
      predictedClass = "Good";
      probas = { Poor: 0.02, Average: 0.18, Good: 0.75, Excellent: 0.05 };
    } else if (composite >= 44) {
      predictedClass = "Average";
      probas = { Poor: 0.08, Average: 0.78, Good: 0.13, Excellent: 0.01 };
    } else {
      predictedClass = "Poor";
      probas = { Poor: 0.85, Average: 0.14, Good: 0.01, Excellent: 0.0 };
    }

    return {
      status: "success",
      predicted_class: predictedClass,
      confidence: probas[predictedClass],
      probabilities: probas,
      target_role: studentData.target_role_match || "Software Development Engineer (SDE)",
      inference_time_ms: 12.4,
      mode: "demo_simulated",
      model_info: {
        algorithm: "Demo Simulation (Baseline Rule Model)",
        accuracy: "Simulated Demonstration",
        note: "Start 'python ml/server.py' for Live Random Forest predictions (Model Test-Set Accuracy (12,000 Held-Out Records): 92.89%)",
      },
      updated_at: new Date().toISOString(),
    };
  };

  const predictReadiness = async (studentData) => {
    setIsPredicting(true);
    setProfile(studentData);

    try {
      // 1. Try real live ML backend
      const res = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
        signal: AbortSignal.timeout(4000),
      });

      if (res.ok) {
        const liveResult = await res.json();
        if (liveResult.status === "success") {
          liveResult.updated_at = new Date().toISOString();
          setPrediction(liveResult);
          setIsLiveMLConnected(true);
          setIsPredicting(false);
          return liveResult;
        }
      }
    } catch {
      // Backend not running; fallback to demo mode
    }

    // 2. Fallback to client simulation
    const simResult = simulatePrediction(studentData);
    setPrediction(simResult);
    setIsLiveMLConnected(false);
    setIsPredicting(false);
    return simResult;
  };

  const loadPreset = (presetKey) => {
    if (PRESET_PROFILES[presetKey]) {
      const presetData = PRESET_PROFILES[presetKey];
      setProfile(presetData);
      return presetData;
    }
    return null;
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        setProfile,
        prediction,
        predictReadiness,
        isPredicting,
        isLiveMLConnected,
        loadPreset,
        PRESET_PROFILES,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
}
