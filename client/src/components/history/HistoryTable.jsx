function HistoryTable({ reviews }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="grid grid-cols-12 border-b border-white/10 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
        <span className="col-span-3">Language</span>
        <span className="col-span-2">Score</span>
        <span className="col-span-5">Summary</span>
        <span className="col-span-2 text-right">Date</span>
      </div>

      <div className="divide-y divide-white/10">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="grid grid-cols-12 gap-4 px-6 py-5 text-sm transition hover:bg-white/5"
          >
            <span className="col-span-3 font-semibold text-white">
              {review.language}
            </span>

            <span className="col-span-2 text-violet-300">
              {review.score ?? 0}/100
            </span>

            <span className="col-span-5 line-clamp-2 text-slate-300">
              {review.summary || "No summary available."}
            </span>

            <span className="col-span-2 text-right text-slate-400">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryTable;
