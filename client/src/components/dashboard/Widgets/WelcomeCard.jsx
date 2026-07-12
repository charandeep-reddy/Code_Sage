import { Sparkles } from "lucide-react";

function WelcomeCard({ user, stats }) {
  const displayName =
    user?.name || user?.username || user?.email?.split("@")[0] || "coder";
  const hasReviews = stats?.totalReviews > 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-violet-600/20 to-blue-600/20 p-8">

      <div className="flex items-center gap-3">

        <Sparkles className="text-violet-400" />

        <span className="text-violet-300 font-semibold">
          Welcome Back
        </span>

      </div>

      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
        Ready to level up, {displayName}?
      </h1>

      <p className="mt-4 text-slate-300 max-w-2xl">
        {hasReviews
          ? `You have completed ${stats.totalReviews} code reviews with an average score of ${stats.averageScore}%. Keep the momentum going today.`
          : "Start with your first AI code review to unlock personalized stats, learning progress, and daily goal tracking."}
      </p>

    </div>
  );
}

export default WelcomeCard;
