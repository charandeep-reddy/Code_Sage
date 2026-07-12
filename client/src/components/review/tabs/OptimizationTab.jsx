import { Code2, GitCommitVertical, ShieldAlert, Sparkles } from "lucide-react";

const CodeBlock = ({ title, code, tone = "cyan" }) => (
  <div className="min-w-0 rounded-2xl border border-white/10 bg-[#050816]">
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <span className="text-sm font-semibold text-slate-300">{title}</span>
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          tone === "green"
            ? "bg-emerald-400/10 text-emerald-300"
            : "bg-cyan-400/10 text-cyan-300"
        }`}
      >
        code
      </span>
    </div>
    <pre className="max-h-96 overflow-auto p-4 text-sm leading-6 text-slate-200">
      <code>{code || "No code available."}</code>
    </pre>
  </div>
);

function OptimizationTab({ review, sourceCode }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center gap-2 text-cyan-300">
          <Sparkles size={18} />
          <h3 className="font-semibold">Optimization Suggestions</h3>
        </div>

        {review.optimization_suggestions?.length ? (
          <div className="mt-4 grid gap-3">
            {review.optimization_suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] p-4 text-sm leading-6 text-slate-200"
              >
                {suggestion}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-emerald-300">
            No optimization suggestions were returned.
          </p>
        )}
      </div>

      <div className="grid gap-4 2xl:grid-cols-2">
        <CodeBlock title="Original Code" code={sourceCode} />
        <CodeBlock title="Improved Code" code={review.optimized_code} tone="green" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center gap-2 text-violet-300">
          <GitCommitVertical size={18} />
          <h3 className="font-semibold">Code Changes Timeline</h3>
        </div>

        {review.changes_made?.length ? (
          <div className="mt-5 space-y-4">
            {review.changes_made.map((change, index) => (
              <div key={index} className="relative pl-7">
                <div className="absolute left-0 top-1 h-full w-px bg-white/10" />
                <div className="absolute left-[-5px] top-1 h-3 w-3 rounded-full bg-violet-300" />
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-violet-300">
                    Line {change.line || "unknown"}
                  </div>
                  <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                    <div className="rounded-lg bg-red-500/10 p-3 text-red-100">
                      {change.old || "Original line not provided"}
                    </div>
                    <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-100">
                      {change.new || "Updated line not provided"}
                    </div>
                  </div>
                  <p className="mt-3 leading-6 text-slate-300">{change.reason}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-400">
            No line-level changes were returned.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-emerald-300">
            <Code2 size={18} />
            <h3 className="font-semibold">Best Practices</h3>
          </div>
          <div className="mt-4 space-y-3">
            {review.best_practices?.length ? (
              review.best_practices.map((practice, index) => (
                <p
                  key={index}
                  className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300"
                >
                  {practice}
                </p>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                No best-practice issues were returned.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-red-300">
            <ShieldAlert size={18} />
            <h3 className="font-semibold">Security Issues</h3>
          </div>
          <div className="mt-4 space-y-3">
            {review.security_issues?.length ? (
              review.security_issues.map((issue, index) => (
                <p
                  key={index}
                  className="rounded-xl border border-red-400/10 bg-red-400/[0.06] p-3 text-sm leading-6 text-red-100"
                >
                  {issue}
                </p>
              ))
            ) : (
              <p className="text-sm text-emerald-300">
                No security issues were detected.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptimizationTab;
