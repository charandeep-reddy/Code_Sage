import { BookOpen, ExternalLink, GraduationCap, Lightbulb } from "lucide-react";

function LearningTab({ review }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center gap-2 text-cyan-300">
          <Lightbulb size={18} />
          <h3 className="font-semibold">Explanation</h3>
        </div>
        <p className="mt-4 leading-8 text-slate-300">
          {review.explanation || "No explanation was returned for this review."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-emerald-300">
            <BookOpen size={18} />
            <h3 className="font-semibold">Concepts Used</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {review.concepts_used?.length ? (
              review.concepts_used.map((concept, index) => (
                <span
                  key={index}
                  className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200"
                >
                  {concept}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400">No concepts were returned.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 text-violet-300">
            <GraduationCap size={18} />
            <h3 className="font-semibold">Concepts To Learn</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {review.concepts_to_learn?.length ? (
              review.concepts_to_learn.map((concept, index) => (
                <span
                  key={index}
                  className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-sm font-semibold text-violet-200"
                >
                  {concept}
                </span>
              ))
            ) : (
              <p className="text-sm text-emerald-300">
                No extra concepts were recommended.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center gap-2 text-amber-300">
          <ExternalLink size={18} />
          <h3 className="font-semibold">Similar LeetCode Problems</h3>
        </div>

        {review.similar_leetcode_problems?.length ? (
          <div className="mt-4 grid gap-3">
            {review.similar_leetcode_problems.map((problem, index) => (
              <a
                key={`${problem.title}-${index}`}
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-amber-300/30 hover:bg-amber-300/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white">
                      {problem.title || "Untitled problem"}
                    </h4>
                    <p className="mt-1 text-sm text-slate-400">
                      {problem.difficulty || "Difficulty unavailable"}
                    </p>
                  </div>
                  <ExternalLink size={16} className="text-amber-300" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-400">
            No related practice problems were returned.
          </p>
        )}
      </div>
    </div>
  );
}

export default LearningTab;
