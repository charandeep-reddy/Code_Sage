import { CheckCircle2, Gauge, ShieldCheck, Timer } from "lucide-react";

const getScoreTone = (score) => {
  if (score >= 80) {
    return "text-emerald-300 border-emerald-400/20 bg-emerald-400/10";
  }

  if (score >= 55) {
    return "text-amber-300 border-amber-400/20 bg-amber-400/10";
  }

  return "text-red-300 border-red-400/20 bg-red-400/10";
};

function OverviewTab({ review }) {
  const score = Number(review.overall_score) || 0;
  const circumference = 2 * Math.PI * 44;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
        <div className={`rounded-2xl border p-5 ${getScoreTone(score)}`}>
          <div className="relative mx-auto h-32 w-32">
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="opacity-20"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progress}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{score}</span>
              <span className="text-xs font-semibold uppercase text-slate-400">
                Score
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-cyan-300">
            <Gauge size={18} />
            <h3 className="font-semibold">Summary</h3>
          </div>
          <p className="mt-3 leading-7 text-slate-300">
            {review.summary || "No summary was returned for this review."}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Timer size={17} />
            <span className="text-sm font-semibold">Time Complexity</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">
            {review.time_complexity}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={17} />
            <span className="text-sm font-semibold">Space Complexity</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">
            {review.space_complexity}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center gap-2 text-emerald-300">
          <CheckCircle2 size={18} />
          <h3 className="font-semibold">Strengths</h3>
        </div>

        {review.strengths?.length ? (
          <div className="mt-4 grid gap-3">
            {review.strengths.map((strength, index) => (
              <div
                key={index}
                className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.06] p-4 text-sm leading-6 text-slate-200"
              >
                {strength}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-400">
            No specific strengths were returned.
          </p>
        )}
      </div>
    </div>
  );
}

export default OverviewTab;
