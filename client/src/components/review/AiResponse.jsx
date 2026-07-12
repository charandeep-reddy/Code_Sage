import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bug,
  Code2,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  Sparkles,
} from "lucide-react";

import OverviewTab from "./tabs/OverviewTab";
import BugsTab from "./tabs/BugsTab";
import OptimizationTab from "./tabs/OptimizationTab";
import LearningTab from "./tabs/LearningTab";
import AIChat from "./chat/AIChat";

const tabs = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Bugs", icon: Bug },
  { label: "Optimization", icon: Code2 },
  { label: "Learning", icon: GraduationCap },
];

const ReviewSkeleton = () => (
  <div className="rounded-2xl border border-white/10 bg-[#08111f]/95 p-5 shadow-2xl shadow-black/20">
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
          <Loader2 size={16} className="animate-spin" />
          CodeSage is reviewing
        </div>
        <h2 className="mt-2 text-2xl font-bold text-white">AI Review</h2>
      </div>
      <div className="h-12 w-12 rounded-full border border-cyan-400/30 bg-cyan-400/10" />
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-24 animate-pulse rounded-xl border border-white/10 bg-white/[0.04]"
        />
      ))}
    </div>

    <div className="mt-6 space-y-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-4 animate-pulse rounded-full bg-white/10"
        />
      ))}
    </div>
  </div>
);

function AIResponse({ review, loading, editorRef, sourceCode }) {
  const [activeTab, setActiveTab] = useState("Overview");

  if (loading) {
    return <ReviewSkeleton />;
  }

  if (!review) {
    return (
      <div className="sticky top-20 rounded-2xl border border-white/10 bg-[#08111f]/95 p-6 shadow-2xl shadow-black/20">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <Sparkles size={22} />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">AI Review</h2>

        <p className="mt-3 leading-7 text-slate-400">
          Submit code to generate score, bug analysis, complexity, optimized code,
          and learning recommendations.
        </p>
      </div>
    );
  }

  return (
    <section className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#08111f]/95 shadow-2xl shadow-black/30">
      <div className="border-b border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              CodeSage Review
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">AI Review</h2>
          </div>

          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-300">
            {review.overall_score}/100
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/20 p-1 sm:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.label;

            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`relative flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="review-active-tab"
                    className="absolute inset-0 rounded-lg bg-cyan-500/20 ring-1 ring-cyan-300/20"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
                <Icon size={16} className="relative" />
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-h-[calc(100vh-18rem)] overflow-y-auto p-5">
        {activeTab === "Overview" && <OverviewTab review={review} />}

        {activeTab === "Bugs" && (
          <BugsTab review={review} editorRef={editorRef} />
        )}

        {activeTab === "Optimization" && (
          <OptimizationTab review={review} sourceCode={sourceCode} />
        )}

        {activeTab === "Learning" && <LearningTab review={review} />}

        <div className="my-8 border-t border-white/10" />

        <AIChat review={review} />
      </div>
    </section>
  );
}

export default AIResponse;
