import { useState } from "react";
import { AlertTriangle, ChevronDown, CheckCircle2 } from "lucide-react";
import { highlightLine } from "../utils/highlightLine";

const severityStyles = {
  critical: "border-red-400/30 bg-red-500/10 text-red-200",
  high: "border-orange-400/30 bg-orange-500/10 text-orange-200",
  medium: "border-amber-400/30 bg-amber-500/10 text-amber-100",
  low: "border-cyan-400/30 bg-cyan-500/10 text-cyan-100",
};

function BugsTab({ review, editorRef }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!review.bugs?.length) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-200">
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 size={18} />
          No bugs detected
        </div>
        <p className="mt-2 text-sm text-emerald-100/80">
          CodeSage did not find syntax, runtime, or logical issues in this pass.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {review.bugs.map((bug, index) => {
        const severity = (bug.severity || "medium").toLowerCase();
        const isOpen = openIndex === index;

        return (
          <div
            key={`${bug.line}-${index}`}
            className={`rounded-2xl border ${
              severityStyles[severity] || severityStyles.medium
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left"
            >
              <div className="flex min-w-0 items-center gap-3">
                <AlertTriangle size={18} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {severity}
                    </span>
                    <span className="text-xs text-slate-400">
                      Line {bug.line || "unknown"}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 font-semibold text-white">
                    {bug.issue || "Potential issue detected"}
                  </p>
                </div>
              </div>

              <ChevronDown
                size={18}
                className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen ? (
              <div className="border-t border-white/10 p-4">
                <p className="leading-7 text-slate-300">{bug.explanation}</p>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
                  <p className="text-sm font-semibold text-emerald-300">
                    Suggested Fix
                  </p>
                  <p className="mt-2 leading-7 text-slate-300">{bug.fix}</p>
                </div>

                <button
                  type="button"
                  onClick={() => highlightLine(editorRef.current, bug.line)}
                  className="mt-4 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Jump to line
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default BugsTab;
