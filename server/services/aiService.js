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

   const prompt = `
You are CodeSage, an expert software engineer and coding mentor.

Analyze the following ${language} code.

Return ONLY valid JSON in this exact format.

{
  "optimized_code": "...complete corrected code...",
  "changes_made": [
    {
      "line": 12,
      "old": "i <= nums.size()",
      "new": "i < nums.size()",
      "reason": "Prevents out-of-bounds access."
    },
    {
      "line": 25,
      "old": "return NULL;",
      "new": "return {};",
      "reason": "Modern C++ best practice."
    }
  ]
}

Rules:

1. The "optimized_code" must contain the COMPLETE corrected program.

2. Do NOT rewrite formatting unnecessarily.

3. Preserve all correct code exactly as it is.

4. Modify ONLY the lines that actually require improvement.

5. Add inline comments ONLY on the modified lines explaining the reason for the change.

6. Do NOT add comments to unchanged lines.

7. Do NOT add markdown, code fences, or explanations outside the JSON.

Code:

${code}
`;


    const response = await generateWithRetry(prompt);

    const validatedResponse = validateAIResponse(response.text);

    return validatedResponse;

  } catch (error) {
    console.error("AI Service Error:", error);

    throw error;
  }
};

module.exports = {
  reviewCode,
};