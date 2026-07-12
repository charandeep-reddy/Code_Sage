const DEFAULT_REVIEW = Object.freeze({
  overall_score: 0,
  summary: "",
  strengths: [],
  bugs: [],
  time_complexity: "Unknown",
  space_complexity: "Unknown",
  best_practices: [],
  security_issues: [],
  optimization_suggestions: [],
  optimized_code: "",
  changes_made: [],
  concepts_used: [],
  concepts_to_learn: [],
  explanation: "",
  similar_leetcode_problems: [],
});

const cleanJsonText = (text) => {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
};

const parseReview = (response) => {
  if (!response) {
    return {};
  }

  if (typeof response === "object") {
    return response;
  }

  if (typeof response === "string") {
    return JSON.parse(cleanJsonText(response));
  }

  return {};
};

const asArray = (value) => {
  return Array.isArray(value) ? value : [];
};

const asString = (value, fallback = "") => {
  return typeof value === "string" ? value : fallback;
};

const asScore = (value) => {
  const score = Number(value);

  if (!Number.isFinite(score)) {
    return DEFAULT_REVIEW.overall_score;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
};

const asBug = (bug) => {
  if (!bug || typeof bug !== "object") {
    return null;
  }

  return {
    line: Number.isFinite(Number(bug.line)) ? Number(bug.line) : 0,
    severity: asString(bug.severity),
    issue: asString(bug.issue),
    explanation: asString(bug.explanation),
    fix: asString(bug.fix),
  };
};

const asChange = (change) => {
  if (!change || typeof change !== "object") {
    return null;
  }

  return {
    line: Number.isFinite(Number(change.line)) ? Number(change.line) : 0,
    old: asString(change.old),
    new: asString(change.new),
    reason: asString(change.reason),
  };
};

const asLeetCodeProblem = (problem) => {
  if (!problem || typeof problem !== "object") {
    return null;
  }

  return {
    title: asString(problem.title),
    difficulty: asString(problem.difficulty),
    url: asString(problem.url),
  };
};

const mapObjects = (value, mapper) => {
  return asArray(value).map(mapper).filter(Boolean);
};

const validateAIResponse = (response) => {
  try {
    const review = parseReview(response);

    // Each field is validated independently so a failed prompt cannot erase
    // successful sections that were already returned by other prompt modules.
    return {
      overall_score: asScore(review.overall_score),
      summary: asString(review.summary, DEFAULT_REVIEW.summary),
      strengths: asArray(review.strengths),
      bugs: mapObjects(review.bugs, asBug),
      time_complexity: asString(
        review.time_complexity,
        DEFAULT_REVIEW.time_complexity
      ),
      space_complexity: asString(
        review.space_complexity,
        DEFAULT_REVIEW.space_complexity
      ),
      best_practices: asArray(review.best_practices),
      security_issues: asArray(review.security_issues),
      optimization_suggestions: asArray(review.optimization_suggestions),
      optimized_code: asString(
        review.optimized_code,
        DEFAULT_REVIEW.optimized_code
      ),
      changes_made: mapObjects(review.changes_made, asChange),
      concepts_used: asArray(review.concepts_used),
      concepts_to_learn: asArray(review.concepts_to_learn),
      explanation: asString(review.explanation, DEFAULT_REVIEW.explanation),
      similar_leetcode_problems: mapObjects(
        review.similar_leetcode_problems,
        asLeetCodeProblem
      ),
    };
  } catch (error) {
    console.error("AI Validation Error:", error);
    return { ...DEFAULT_REVIEW };
  }
};

validateAIResponse.DEFAULT_REVIEW = DEFAULT_REVIEW;

module.exports = validateAIResponse;
