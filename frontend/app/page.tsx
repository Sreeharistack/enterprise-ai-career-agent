"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type AnalysisResult = {
  career_fit_score: number;
  skill_match_percentage: number;

  matched_skills: string[];
  partial_skills: string[];
  missing_skills: string[];

  career_report: {
    summary: string;
    strengths: string[];
    skills_to_improve: string[];
    skill_gaps: string[];
    learning_priorities: string[];
  };

  learning_roadmap: {
    days_30: string[];
    days_60: string[];
    days_90: string[];
  };

  project_recommendations: {
    project: string;
    description: string;
    level: string;
    skill: string;
  }[];

  interview_questions: {
    technical_questions: {
      skill: string;
      question: string;
    }[];

    skill_gap_questions: {
      skill: string;
      question: string;
    }[];
  };

  ats_analysis: {
    ats_score: number;
    keyword_match_score: number;
    matched_keywords: string[];
    missing_keywords: string[];
    detected_sections: string[];
    missing_sections: string[];
    suggestions: string[];
  };

  ai_career_analysis: string;
};

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [job, setJob] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function uploadFile(endpoint: string, file: File) {

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please upload a PDF file.");
  }
  
  if (file.size > 10 * 1024 * 1024) {
  throw new Error("PDF file must be smaller than 10 MB.");
}

  const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Upload failed: ${endpoint}\n${errorText}`
      );
    }

    return response.json();
  }

  async function analyzeCareer() {
    if (!resume || !job) {
      setMessage(
        "Please upload both your resume and job description."
      );

      return;
    }

    try {
      setLoading(true);

      setResult(null);

      setMessage("Uploading resume...");

      await uploadFile(
        "/resume/upload",
        resume
      );

      setMessage(
        "Uploading job description..."
      );

      await uploadFile(
        "/job/upload",
        job
      );

      setMessage(
        "AI is analyzing your career profile..."
      );

      const response = await fetch(
        `${API_URL}/analysis/analyze`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          `Career analysis failed.\n${errorText}`
        );
      }

      const data: AnalysisResult =
        await response.json();

      setResult(data);

      setMessage(
        "Career analysis completed successfully!"
      );
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Something went wrong. Make sure the FastAPI backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
  <div className="mx-auto max-w-7xl px-6">

    <div className="flex items-center justify-between py-5">

      {/* LOGO */}
      <div>
        <h1 className="text-2xl font-bold">
          AI Career Intelligence
        </h1>

        <p className="text-sm text-slate-400">
          Resume & Job Matching Agent
        </p>
      </div>

      {/* STATUS */}
      <div className="hidden rounded-full border border-blue-900 bg-blue-950/30 px-4 py-2 text-sm text-blue-300 md:block">
        🤖 AI Career Agent
      </div>

    </div>

    {/* NAVIGATION */}
    <nav className="flex gap-6 overflow-x-auto pb-4 text-sm">

      <a
        href="#dashboard"
        className="whitespace-nowrap text-blue-400 hover:text-blue-300"
      >
        Dashboard
      </a>

      <a
        href="#resume-analysis"
        className="whitespace-nowrap text-slate-400 hover:text-white"
      >
        Resume Analysis
      </a>

      <a
        href="#skill-gap"
        className="whitespace-nowrap text-slate-400 hover:text-white"
      >
        Skill Gap
      </a>

      <a
        href="#roadmap"
        className="whitespace-nowrap text-slate-400 hover:text-white"
      >
        Learning Roadmap
      </a>

      <a
        href="#projects"
        className="whitespace-nowrap text-slate-400 hover:text-white"
      >
        Projects
      </a>

      <a
        href="#ats"
        className="whitespace-nowrap text-slate-400 hover:text-white"
      >
        ATS Intelligence
      </a>

      <a
        href="#interview"
        className="whitespace-nowrap text-slate-400 hover:text-white"
      >
        Interview Prep
      </a>

    </nav>

  </div>
</header>


      {/* ================= HERO ================= */}

      <section
  id="dashboard"
  className="mx-auto max-w-7xl px-6 py-16"
>

  <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/30 px-6 py-16 text-center shadow-2xl md:px-12">

    {/* Decorative glow */}

    <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

    <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />


    {/* Badge */}

    <div className="relative inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">

      <span className="h-2 w-2 rounded-full bg-blue-400" />

      AI-Powered Career Intelligence

    </div>


    {/* Heading */}

    <h2 className="relative mx-auto mt-7 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">

      Turn Your Resume Into a

      <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">

        Career Action Plan

      </span>

    </h2>


    {/* Description */}

    <p className="relative mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">

      Upload your resume and target job description.
      Our AI analyzes your skill alignment, identifies
      career gaps, improves ATS readiness and creates
      a personalized roadmap for your next opportunity.

    </p>


    {/* Feature pills */}

    <div className="relative mt-8 flex flex-wrap justify-center gap-3">

      <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
        ✓ Skill Matching
      </span>

      <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
        ✓ ATS Analysis
      </span>

      <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
        ✓ AI Roadmap
      </span>

      <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
        ✓ Interview Prep
      </span>

    </div>

  </div>


        {/* ================= UPLOAD CARDS ================= */}
<section
  id="resume-analysis"
  className="mx-auto max-w-7xl px-6 pb-12"
>
  <div className="mb-8">
    <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
      Start Your Analysis
    </p>

    <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
      Upload your career documents
    </h3>

    <p className="mt-2 max-w-2xl text-slate-400">
      Provide your resume and the job description you are targeting.
      The AI agent will compare both documents and generate your career
      intelligence report.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-2">

    {/* Resume Card */}
    <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl transition hover:border-blue-500/40 hover:bg-slate-900">

      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            📄
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">
              Resume
            </h4>

            <p className="text-sm text-slate-400">
              Your current professional resume
            </p>
          </div>
        </div>

        {resume && (
          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            ✓ Selected
          </span>
        )}
      </div>

      <label
        htmlFor="resume-upload"
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-6 py-10 text-center transition hover:border-blue-500/50 hover:bg-blue-500/5"
      >
        <div className="mb-4 text-4xl">
          ↑
        </div>

        <p className="font-medium text-white">
          {resume
            ? resume.name
            : "Click to select resume PDF"}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          PDF format recommended
        </p>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              setResume(file);
            }
          }}
        />
      </label>
    </div>

    {/* Job Description Card */}
    <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl transition hover:border-purple-500/40 hover:bg-slate-900">

      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
            💼
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">
              Job Description
            </h4>

            <p className="text-sm text-slate-400">
              The job you want to apply for
            </p>
          </div>
        </div>

        {job && (
          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            ✓ Selected
          </span>
        )}
      </div>

      <label
        htmlFor="job-upload"
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-6 py-10 text-center transition hover:border-purple-500/50 hover:bg-purple-500/5"
      >
        <div className="mb-4 text-4xl">
          ↑
        </div>

        <p className="font-medium text-white">
          {job
            ? job.name
            : "Click to select job PDF"}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          PDF format recommended
        </p>

        <input
          id="job-upload"
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              setJob(file);
            }
          }}
        />
      </label>
    </div>

  </div>
</section>


       {/* ================= ANALYZE BUTTON ================= */}
<section className="mx-auto max-w-7xl px-6 pb-16">
  <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-center shadow-xl">
    
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-medium text-slate-400">
        Ready to discover your career fit?
      </p>

      <button
        onClick={analyzeCareer}
        disabled={!resume || !job || loading}
        className="mt-4 inline-flex min-w-[240px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:scale-[1.02] hover:from-blue-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        {loading ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Analyzing...
          </>
        ) : (
          <>
            🚀
            Analyze Career
          </>
        )}
      </button>

      {!resume || !job ? (
        <p className="mt-4 text-sm text-slate-500">
          Upload both your resume and job description to start the analysis.
        </p>
      ) : (
        <p className="mt-4 text-sm text-green-400">
          ✓ Both documents are ready for AI analysis.
        </p>
      )}

      {message && (
        <div className="mx-auto mt-5 max-w-xl rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
          {message}
        </div>
      )}
    </div>

  </div>
</section>


        {/* ================= RESULTS ================= */}

        {result && (
          <div className="mt-16">

            <h3 className="mb-6 text-3xl font-bold">
              Career Analysis
            </h3>


            {/* ================= CAREER SCORE ================= */}

<div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/20 p-8 shadow-xl">

              <div className="grid gap-8 md:grid-cols-4 md:items-center">

                {/* SCORE */}

                <div className="text-center md:col-span-1">

                   <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-8 border-blue-500/30 bg-slate-950 shadow-lg shadow-blue-900/20">

                    <div>

                     <div className="relative mx-auto flex h-44 w-44 items-center justify-center">

  {/* Outer ring */}

  <div className="absolute inset-0 rounded-full border-8 border-blue-500/10" />

  {/* Progress ring */}

  <div
    className="absolute inset-0 rounded-full"
    style={{
      background: `conic-gradient(
        rgb(59 130 246) ${Math.min(
          100,
          Math.max(0, result.career_fit_score)
        )}%,
        rgb(30 41 59) 0
      )`,
      mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
      WebkitMask:
        "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
    }}
  />

  {/* Center */}

  <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full bg-slate-950 shadow-xl">

    <p className="text-4xl font-bold text-blue-400">
      {result.career_fit_score}%
    </p>

    <p className="mt-1 text-sm font-medium text-slate-400">
      Career Fit
    </p>

  </div>

</div> 

                    </div>

                  </div>

                </div>


                {/* EXPLANATION */}

                <div className="md:col-span-3">

                  <h3 className="text-2xl font-bold">
                    Career Compatibility
                  </h3>

                  <p className="mt-2 text-slate-400">
                    Your resume was analyzed against the uploaded
                    job description using skill matching and AI analysis.
                  </p>


                  {/* PROGRESS */}

                  <div className="mt-6">

                    <div className="mb-2 flex justify-between text-sm">

                      <span className="text-slate-400">
                        Skill Match
                      </span>

                      <span className="font-semibold text-blue-400">
                        {result.skill_match_percentage}%
                      </span>

                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              result.skill_match_percentage
                            )
                          )}%`,
                        }}
                      />

                    </div>

                  </div>


                  {/* STATISTICS */}

                  <div className="mt-6 grid grid-cols-3 gap-4">

                    <div className="rounded-xl border border-green-900 bg-green-950/30 p-4 text-center">

                      <p className="text-2xl font-bold text-green-400">
                        {result.matched_skills.length}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Matched
                      </p>

                    </div>


                    <div className="rounded-xl border border-yellow-900 bg-yellow-950/30 p-4 text-center">

                      <p className="text-2xl font-bold text-yellow-400">
                        {result.partial_skills.length}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Partial
                      </p>

                    </div>


                    <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-center">

                      <p className="text-2xl font-bold text-red-400">
                        {result.missing_skills.length}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Skill Gaps
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= SKILL MATCHES ================= */}

             <div
  id="skill-gap"
  className="mt-8 grid gap-6 md:grid-cols-3"
>
  {/* Matched Skills */}
  <div className="group rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-xl hover:shadow-emerald-950/30">

    <div className="flex items-center justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
        ✓
      </div>

      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        Strong Match
      </span>

    </div>

    <div className="mt-6">

      <p className="text-sm font-medium text-slate-400">
        Matched Skills
      </p>

      <p className="mt-1 text-4xl font-bold text-white">
        {result.matched_skills.length}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        Skills already found in your resume
      </p>

    </div>

    <div className="mt-5 flex flex-wrap gap-2">

      {result.matched_skills.map((skill) => (
        <span
          key={skill}
          className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-300"
        >
          {skill}
        </span>
      ))}

    </div>

  </div>


  {/* Partial Skills */}
  <div className="group rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-950/30">

    <div className="flex items-center justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
        ◐
      </div>

      <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
        Partial Match
      </span>

    </div>

    <div className="mt-6">

      <p className="text-sm font-medium text-slate-400">
        Partial Skills
      </p>

      <p className="mt-1 text-4xl font-bold text-white">
        {result.partial_skills.length}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        Skills related to your existing knowledge
      </p>

    </div>

    <div className="mt-5 flex flex-wrap gap-2">

      {result.partial_skills.length > 0 ? (
        result.partial_skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-xs font-medium text-amber-300"
          >
            {skill}
          </span>
        ))
      ) : (
        <span className="text-sm text-slate-500">
          No partial skills detected
        </span>
      )}

    </div>

  </div>


  {/* Missing Skills */}
  <div className="group rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:shadow-xl hover:shadow-red-950/30">

    <div className="flex items-center justify-between">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-2xl">
        !
      </div>

      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        Skill Gap
      </span>

    </div>

    <div className="mt-6">

      <p className="text-sm font-medium text-slate-400">
        Missing Skills
      </p>

      <p className="mt-1 text-4xl font-bold text-white">
        {result.missing_skills.length}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        Job requirements not found in your resume
      </p>

    </div>

    <div className="mt-5 flex flex-wrap gap-2">

      {result.missing_skills.length > 0 ? (
        result.missing_skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-300"
          >
            {skill}
          </span>
        ))
      ) : (
        <span className="text-sm text-slate-500">
          No skill gaps detected
        </span>
      )}

    </div>

  </div>

</div>

            {/* ================= CAREER SUMMARY ================= */}

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="text-2xl font-bold">
                📊 Career Summary
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {result.career_report.summary}
              </p>

            </div>


           {/* ================= LEARNING ROADMAP ================= */}

<div
  id="roadmap"
  className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8"
>

  {/* Header */}
  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
          📚
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">
            Learning Roadmap
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            A personalized 90-day plan based on your identified skill gaps.
          </p>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
        Career Development
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-200">
        90-Day Skill Plan
      </p>
    </div>

  </div>


  {/* Roadmap Cards */}
  <div className="mt-8 grid gap-6 md:grid-cols-3">

    {/* 30 Days */}
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-slate-900 p-6">

      <div className="absolute right-4 top-4 text-5xl font-black text-blue-500/5">
        01
      </div>

      <div className="relative">

        <div className="flex items-center justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
            🎯
          </div>

          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            Phase 01
          </span>

        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-blue-400">
          Days 1–30
        </p>

        <h4 className="mt-1 text-xl font-bold text-white">
          Foundation
        </h4>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Build the foundation for the missing skills identified from the job description.
        </p>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/3 rounded-full bg-blue-500" />
        </div>

        <div className="mt-5 space-y-3">

          {result.learning_roadmap.days_30.length > 0 ? (
            result.learning_roadmap.days_30.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
              >

                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs text-blue-400">
                  ✓
                </div>

                <p className="text-sm leading-6 text-slate-300">
                  {item}
                </p>

              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No tasks available for this phase.
            </p>
          )}

        </div>

      </div>
    </div>


    {/* 30–60 Days */}
    <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-slate-900 p-6">

      <div className="absolute right-4 top-4 text-5xl font-black text-violet-500/5">
        02
      </div>

      <div className="relative">

        <div className="flex items-center justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl">
            🛠️
          </div>

          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
            Phase 02
          </span>

        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-violet-400">
          Days 31–60
        </p>

        <h4 className="mt-1 text-xl font-bold text-white">
          Practical Projects
        </h4>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Convert newly learned skills into practical portfolio projects.
        </p>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-2/3 rounded-full bg-violet-500" />
        </div>

        <div className="mt-5 space-y-3">

          {result.learning_roadmap.days_60.length > 0 ? (
            result.learning_roadmap.days_60.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
              >

                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs text-violet-400">
                  →
                </div>

                <p className="text-sm leading-6 text-slate-300">
                  {item}
                </p>

              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No tasks available for this phase.
            </p>
          )}

        </div>

      </div>
    </div>


    {/* 60–90 Days */}
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6">

      <div className="absolute right-4 top-4 text-5xl font-black text-emerald-500/5">
        03
      </div>

      <div className="relative">

        <div className="flex items-center justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
            🚀
          </div>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            Phase 03
          </span>

        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Days 61–90
        </p>

        <h4 className="mt-1 text-xl font-bold text-white">
          Career Ready
        </h4>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Strengthen advanced skills and prepare your portfolio for applications.
        </p>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-full rounded-full bg-emerald-500" />
        </div>

        <div className="mt-5 space-y-3">

          {result.learning_roadmap.days_90.length > 0 ? (
            result.learning_roadmap.days_90.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
              >

                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                  →
                </div>

                <p className="text-sm leading-6 text-slate-300">
                  {item}
                </p>

              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No tasks available for this phase.
            </p>
          )}

        </div>

      </div>
    </div>

  </div>


  {/* Roadmap Footer */}
  <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4">

    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
          💡
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-200">
            Your next step
          </p>

          <p className="text-xs text-slate-500">
            Start with the highest-priority skill gap and build one practical project.
          </p>
        </div>

      </div>

      <span className="text-xs font-medium text-slate-500">
        AI-generated roadmap
      </span>

    </div>

  </div>

</div>


{/* ================= PROJECTS ================= */}

<div
  id="projects"
  className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8"
>

  {/* Header */}
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

    <div>

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
          🚀
        </div>

        <div>

          <h3 className="text-2xl font-bold text-white">
            Recommended Projects
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Build these projects to strengthen the skills missing from your profile.
          </p>

        </div>

      </div>

    </div>

    <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 px-4 py-3">

      <p className="text-xs font-medium uppercase tracking-wider text-purple-400">
        Portfolio Builder
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-200">
        Skill → Project
      </p>

    </div>

  </div>


  {/* Project Cards */}

  {result.project_recommendations.length > 0 ? (

    <div className="mt-8 grid gap-6 md:grid-cols-2">

      {result.project_recommendations.map((project, index) => (

        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20"
        >

          {/* Background number */}

          <div className="absolute right-5 top-4 text-6xl font-black text-purple-500/5">
            {String(index + 1).padStart(2, "0")}
          </div>


          <div className="relative">

            {/* Top Row */}

            <div className="flex items-start justify-between gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
                💻
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  project.level === "Beginner"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : project.level === "Intermediate"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {project.level}
              </span>

            </div>


            {/* Skill */}

            <div className="mt-6">

              <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Skill Gap
              </p>

              <span className="mt-2 inline-flex rounded-lg border border-purple-500/20 bg-purple-500/5 px-3 py-1.5 text-xs font-medium text-purple-300">
                {project.skill}
              </span>

            </div>


            {/* Project Name */}

            <h4 className="mt-5 text-xl font-bold leading-7 text-white transition-colors group-hover:text-purple-300">
              {project.project}
            </h4>


            {/* Description */}

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {project.description}
            </p>


            {/* Project Path */}

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-sm">
                  🎯
                </div>

                <div>

                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Recommended Action
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-300">
                    Build this project and add it to your portfolio.
                  </p>

                </div>

              </div>

            </div>


            {/* Bottom */}

            <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">

              <span className="text-xs text-slate-500">
                Recommended for your skill gap
              </span>

              <span className="text-sm font-semibold text-purple-400 transition-transform group-hover:translate-x-1">
                Build Project →
              </span>

            </div>

          </div>

        </div>

      ))}

    </div>

  ) : (

    /* No Projects */

    <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl">
        ✓
      </div>

      <h4 className="mt-4 text-lg font-semibold text-white">
        No Project Gaps Detected
      </h4>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Your current skills already match the project recommendation database.
        Continue strengthening your existing portfolio.
      </p>

    </div>

  )}


  {/* Footer */}

  <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-4">

    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
          💡
        </div>

        <div>

          <p className="text-sm font-semibold text-slate-200">
            Portfolio Tip
          </p>

          <p className="text-xs text-slate-500">
            Include measurable results, technologies used, and a GitHub repository for each project.
          </p>

        </div>

      </div>

      <span className="text-xs font-medium text-slate-500">
        AI Career Intelligence
      </span>

    </div>

  </div>

</div>

          {/* ================= AI CAREER ANALYSIS ================= */}

<div
  id="ai-analysis"
  className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8"
>

  {/* Header */}
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

    <div>

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-xl">
          🤖
        </div>

        <div>

          <h3 className="text-2xl font-bold text-white">
            AI Career Analysis
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            AI-generated insights based on your resume and target job description.
          </p>

        </div>

      </div>

    </div>

    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">

      <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
        AI Intelligence
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-200">
        Career Analysis
      </p>

    </div>

  </div>


  {/* AI Analysis Content */}

  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

    {/* Report Header */}

    <div className="border-b border-slate-800 bg-slate-900/80 px-5 py-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10">
          ✨
        </div>

        <div>

          <p className="text-sm font-semibold text-white">
            AI Career Intelligence Report
          </p>

          <p className="text-xs text-slate-500">
            Personalized analysis of your current profile
          </p>

        </div>

      </div>

    </div>


    {/* AI Assessment */}

    <div className="p-6">

      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">

        <div className="mb-4 flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-cyan-400" />

          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            AI Assessment
          </span>

        </div>

        <div className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
          {result.ai_career_analysis}
        </div>

      </div>

    </div>

  </div>


  {/* Insight Footer */}

  <div className="mt-6 grid gap-4 md:grid-cols-3">

    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
          ✓
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Strengths
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-200">
            {result.matched_skills.length} matched skills
          </p>
        </div>

      </div>

    </div>


    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
          ◐
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Development
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-200">
            {result.partial_skills.length} partial skills
          </p>
        </div>

      </div>

    </div>


    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
          !
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Skill Gaps
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-200">
            {result.missing_skills.length} skills to develop
          </p>
        </div>

      </div>

    </div>

  </div>

</div>


{/* ================= ATS INTELLIGENCE ================= */}
            


            {/* ================= ATS ANALYSIS ================= */}

<div
  id="ats"
  className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8"
>

  {/* Header */}

  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

    <div>

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
          📊
        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
            ATS Intelligence
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            Resume ATS Analysis
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Your resume was checked against the uploaded job description
            for relevant keywords and common resume sections.
          </p>

        </div>

      </div>

    </div>


    <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 px-4 py-3">

      <p className="text-xs font-medium uppercase tracking-wider text-purple-400">
        ATS Scan
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-200">
        Resume Intelligence
      </p>

    </div>

  </div>


  {/* Score Cards */}

  <div className="mt-8 grid gap-5 md:grid-cols-2">

    {/* ATS Score */}

    <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">
            ATS Score
          </p>

          <p className="mt-2 text-4xl font-bold text-white">
            {result.ats_analysis.ats_score}%
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
          🎯
        </div>

      </div>


      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-700"
          style={{
            width: `${Math.min(result.ats_analysis.ats_score, 100)}%`,
          }}
        />

      </div>

      <p className="mt-3 text-xs text-slate-500">
        Overall ATS compatibility based on keywords and resume structure.
      </p>

    </div>


    {/* Keyword Score */}

    <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">
            Keyword Match
          </p>

          <p className="mt-2 text-4xl font-bold text-white">
            {result.ats_analysis.keyword_match_score}%
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
          🔎
        </div>

      </div>


      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-700"
          style={{
            width: `${Math.min(
              result.ats_analysis.keyword_match_score,
              100
            )}%`,
          }}
        />

      </div>

      <p className="mt-3 text-xs text-slate-500">
        Percentage of detected job-related keywords present in the resume.
      </p>

    </div>

  </div>


  {/* Keyword Analysis */}

  <div className="mt-6 grid gap-6 md:grid-cols-2">

    {/* Matched Keywords */}

    <div className="rounded-2xl border border-emerald-500/20 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h4 className="text-lg font-semibold text-white">
            Matched Keywords
          </h4>

          <p className="mt-1 text-xs text-slate-500">
            Keywords already represented in your resume.
          </p>

        </div>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          {result.ats_analysis.matched_keywords.length}
        </span>

      </div>


      <div className="mt-5 flex flex-wrap gap-2">

        {result.ats_analysis.matched_keywords.length > 0 ? (

          result.ats_analysis.matched_keywords.map((keyword) => (

            <span
              key={keyword}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-300"
            >
              ✓ {keyword}
            </span>

          ))

        ) : (

          <p className="text-sm text-slate-500">
            No matched keywords detected.
          </p>

        )}

      </div>

    </div>


    {/* Missing Keywords */}

    <div className="rounded-2xl border border-red-500/20 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h4 className="text-lg font-semibold text-white">
            Missing Keywords
          </h4>

          <p className="mt-1 text-xs text-slate-500">
            Job-related keywords not detected in your resume.
          </p>

        </div>

        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
          {result.ats_analysis.missing_keywords.length}
        </span>

      </div>


      <div className="mt-5 flex flex-wrap gap-2">

        {result.ats_analysis.missing_keywords.length > 0 ? (

          result.ats_analysis.missing_keywords.map((keyword) => (

            <span
              key={keyword}
              className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-300"
            >
              + {keyword}
            </span>

          ))

        ) : (

          <p className="text-sm text-slate-500">
            No missing keywords detected.
          </p>

        )}

      </div>

    </div>

  </div>


  {/* Resume Structure */}

  <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

    <div>

      <h4 className="text-lg font-semibold text-white">
        Resume Structure
      </h4>

      <p className="mt-1 text-xs text-slate-500">
        Common resume sections detected by the ATS analyzer.
      </p>

    </div>


    <div className="mt-6 grid gap-6 md:grid-cols-2">

      {/* Detected Sections */}

      <div>

        <div className="mb-3 flex items-center justify-between">

          <p className="text-sm font-semibold text-emerald-400">
            ✓ Detected Sections
          </p>

          <span className="text-xs text-slate-500">
            {result.ats_analysis.detected_sections.length}
          </span>

        </div>

        <div className="flex flex-wrap gap-2">

          {result.ats_analysis.detected_sections.map((section) => (

            <span
              key={section}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium capitalize text-emerald-300"
            >
              {section}
            </span>

          ))}

        </div>

      </div>


      {/* Missing Sections */}

      <div>

        <div className="mb-3 flex items-center justify-between">

          <p className="text-sm font-semibold text-amber-400">
            ! Missing Sections
          </p>

          <span className="text-xs text-slate-500">
            {result.ats_analysis.missing_sections.length}
          </span>

        </div>

        <div className="flex flex-wrap gap-2">

          {result.ats_analysis.missing_sections.length > 0 ? (

            result.ats_analysis.missing_sections.map((section) => (

              <span
                key={section}
                className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-xs font-medium capitalize text-amber-300"
              >
                {section}
              </span>

            ))

          ) : (

            <p className="text-sm text-slate-500">
              No common sections are missing.
            </p>

          )}

        </div>

      </div>

    </div>

  </div>


  {/* Suggestions */}

  <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

    <div className="flex items-start gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-lg">
        💡
      </div>

      <div>

        <h4 className="text-lg font-semibold text-white">
          ATS Improvement Suggestions
        </h4>

        <p className="mt-1 text-xs text-slate-500">
          Suggestions generated from the current ATS analysis.
        </p>

      </div>

    </div>


    <div className="mt-5 space-y-3">

      {result.ats_analysis.suggestions.length > 0 ? (

        result.ats_analysis.suggestions.map((suggestion, index) => (

          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
          >

            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-xs text-cyan-400">
              {index + 1}
            </span>

            <p className="text-sm leading-6 text-slate-300">
              {suggestion}
            </p>

          </div>

        ))

      ) : (

        <p className="text-sm text-slate-500">
          No additional ATS suggestions were generated.
        </p>

      )}

    </div>

  </div>

</div>


{/* ================= INTERVIEW PREPARATION ================= */}


            {/* ================= INTERVIEW PREPARATION ================= */}

<div
  id="interview"
  className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6"
>

              <h3 className="text-2xl font-bold">
                💬 Interview Preparation
              </h3>


              {/* TECHNICAL QUESTIONS */}

              <h4 className="mt-6 text-lg font-semibold text-blue-400">
                Technical Questions
              </h4>

              <div className="mt-4 space-y-4">

                {result.interview_questions.technical_questions.length === 0 ? (

                  <p className="text-sm text-slate-500">
                    No technical questions available.
                  </p>

                ) : (

                  result.interview_questions.technical_questions
                    .slice(0, 10)
                    .map((item, index) => (

                      <div
                        key={`technical-${index}`}
                        className="rounded-xl border border-slate-700 p-4"
                      >

                        <p className="text-xs text-blue-400">
                          {item.skill}
                        </p>

                        <p className="mt-2 text-slate-200">
                          {item.question}
                        </p>

                      </div>

                    ))

                )}

              </div>


              {/* SKILL GAP QUESTIONS */}

              <h4 className="mt-8 text-lg font-semibold text-red-400">
                Skill Gap Questions
              </h4>

              <div className="mt-4 space-y-4">

                {result.interview_questions.skill_gap_questions.length === 0 ? (

                  <p className="text-sm text-slate-500">
                    No skill-gap questions available.
                  </p>

                ) : (

                  result.interview_questions.skill_gap_questions.map(
                    (item, index) => (

                      <div
                        key={`gap-${index}`}
                        className="rounded-xl border border-red-900 bg-red-950/10 p-4"
                      >

                        <p className="text-xs text-red-400">
                          {item.skill}
                        </p>

                        <p className="mt-2 text-slate-200">
                          {item.question}
                        </p>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          </div>
        )}


        {/* ================= FOOTER ================= */}

        <footer className="mt-16 border-t border-slate-800 py-8 text-center text-sm text-slate-500">

          AI Career Intelligence Platform
          {" • "}
          Next.js + FastAPI + Hugging Face AI

        </footer>

      </section>

    </main>
  );
}


/* =========================================================
   SKILL SECTION COMPONENT
   ========================================================= */

function SkillSection({
  title,
  skills,
  color,
}: {
  title: string;
  skills: string[];
  color: "green" | "yellow" | "red";
}) {

  const colorClasses = {
    green:
      "border-green-900 bg-green-950/30 text-green-300",

    yellow:
      "border-yellow-900 bg-yellow-950/30 text-yellow-300",

    red:
      "border-red-900 bg-red-950/30 text-red-300",
  };
  
  return (
  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            color === "green"
              ? "bg-green-500/10"
              : color === "yellow"
              ? "bg-yellow-500/10"
              : "bg-red-500/10"
          }`}
        >
          {color === "green"
            ? "✓"
            : color === "yellow"
            ? "◐"
            : "!"}
        </div>

        <h4 className="text-lg font-semibold text-white">
          {title}
        </h4>

      </div>

      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
        {skills.length}
      </span>

    </div>

    <div className="mt-5 flex min-h-[70px] flex-wrap content-start gap-2">

      {skills.length === 0 ? (

        <span className="text-sm text-slate-500">
          No skills detected
        </span>

      ) : (

        skills.map((skill) => (

          <span
            key={skill}
            className={`rounded-full border px-3 py-1.5 text-sm transition hover:scale-[1.02] ${colorClasses[color]}`}
          >
            {skill}
          </span>

        ))

      )}

    </div>

  </div>
);
  
}


/* =========================================================
   ROADMAP COMPONENT
   ========================================================= */

function Roadmap({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {

  return (

      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-blue-500/40">

      
       <h4 className="flex items-center gap-2 font-semibold text-blue-400">
  <span>◈</span>
  {title}
</h4> 

      <ul className="mt-4 space-y-3">

        {items.length === 0 ? (

          <li className="text-sm text-slate-500">
            No tasks
          </li>

        ) : (

          items.map((item, index) => (

           <li
  key={index}
  className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm leading-6 text-slate-300"
>
  <span className="mr-2 text-blue-400">→</span>
  {item}
</li> 

          ))

        )}

      </ul>

    </div>

  );
}