const generateOverview = require("./prompts/overviewPrompt");
const generateBugs = require("./prompts/bugsPrompt");
const generateComplexity = require("./prompts/complexityPrompt");
const generateOptimization = require("./prompts/optimizationPrompt");
const generateLearning = require("./prompts/learningPrompt");
const validateAIResponse = require("../utils/validateAiResponse");

const reviewSections = [
  {
    name: "Overview",
    completedLog: "Overview Completed",
    run: generateOverview,
  },
  {
    name: "Bug Analysis",
    completedLog: "Bug Analysis Completed",
    run: generateBugs,
  },
  {
    name: "Complexity",
    completedLog: "Complexity Completed",
    run: generateComplexity,
  },
  {
    name: "Optimization",
    completedLog: "Optimization Completed",
    run: generateOptimization,
  },
  {
    name: "Learning",
    completedLog: "Learning Completed",
    run: generateLearning,
  },
];

// One failed section returns an empty object, allowing the final validator to
// default only that section while preserving every successful Gemini result.
const runReviewSection = async (section, language, code) => {
  try {
    const result = await section.run(language, code);
    console.log(section.completedLog);
    return result;
  } catch (error) {
    console.error(`Gemini Error [${section.name}] section failed:`, {
      message: error.message,
      status: error.status,
    });

    return {};
  }
};

const reviewCode = async (language, code) => {
  console.log("Review Started");

  // All review dimensions are generated concurrently to reduce endpoint latency
  // and keep each prompt focused on one responsibility.
  const sectionResults = await Promise.all(
    reviewSections.map((section) => runReviewSection(section, language, code))
  );

  const mergedReview = sectionResults.reduce(
    (review, sectionResult) => ({
      ...review,
      ...sectionResult,
    }),
    {}
  );

  const validatedReview = validateAIResponse(mergedReview);

  console.log("Review Finished");

  return validatedReview;
};

module.exports = {
  reviewCode,
};
