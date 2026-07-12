const ai = require("../providers/geminiProvider");
const validateAIResponse = require("../utils/validateAiResponse");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateWithRetry(prompt) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `Gemini Request (Attempt ${attempt}/${MAX_RETRIES})`
      );

      const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: prompt,
      });

      return response;

    } catch (error) {

      if (error.status === 503 && attempt < MAX_RETRIES) {
        console.log(
          `Gemini Busy. Retrying in ${attempt * 2} seconds...`
        );

        await sleep(attempt * 2000);

        continue;
      }

      throw error;
    }
  }
}


const reviewCode = async (language, code) => {
  try {
    console.log("🚀 reviewCode() started");

    const prompt = `
You are CodeSage, an expert software engineer and coding mentor.

Analyze the following ${language} code.

Return ONLY valid JSON (no markdown, no explanations).

Use exactly this structure:

{
  "overall_score": 0,
  "summary": "",
  "strengths": [],
  "bugs": [
    {
      "line": 0,
      "severity": "",
      "issue": "",
      "explanation": "",
      "fix": ""
    }
  ],
  "time_complexity": "",
  "space_complexity": "",
  "best_practices": [],
  "security_issues": [],
  "optimization_suggestions": [],
  "optimized_code": "",
  "changes_made": [
    {
      "line": 0,
      "old": "",
      "new": "",
      "reason": ""
    }
  ],
  "concepts_used": [],
  "concepts_to_learn": [],
  "explanation": "",
  "similar_leetcode_problems": [
    {
      "title": "",
      "difficulty": "",
      "url": ""
    }
  ]
}

Rules:

- Give an overall score from 0 to 100.
- Explain the code in simple language.
- Detect logical bugs, syntax issues, runtime errors and edge cases.
- Mention time and space complexity.
- Suggest optimizations.
- List best practices.
- Mention any security concerns if applicable.
- Return the COMPLETE corrected program in "optimized_code".
- Modify ONLY the lines that actually need changes.
- Add inline comments ONLY on modified lines.
- List every modification in "changes_made".
- Recommend 2-5 similar LeetCode problems when applicable.

Code:

${code}
`;

    console.log("📤 Sending request to Gemini...");

    const response = await generateWithRetry(prompt);

    console.log("✅ Gemini request completed.");

    console.log("========== RAW GEMINI RESPONSE ==========");
    console.log(response.text);
    console.log("=========================================");

    const validatedResponse = validateAIResponse(response.text);

    console.log("========== VALIDATED RESPONSE ==========");
    console.log(validatedResponse);
    console.log("=========================================");

    return validatedResponse;

  } catch (error) {
    console.error("❌ AI Service Error:");
    console.error(error);

    if (error.response) {
      console.error("Response:", error.response);
    }

    throw error;
  }
};
module.exports = {
  reviewCode,
};