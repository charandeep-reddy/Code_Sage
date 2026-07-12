const ai = require("../providers/geminiProvider");

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS) || 30000;
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cleanJsonText = (text) => {
  if (typeof text !== "string") {
    throw new Error("Gemini returned an empty response");
  }

  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .replace(/,\s*([}\]])/g, "$1")
    .trim();
};

const extractJsonObject = (text) => {
  const cleanedText = cleanJsonText(text);
  const firstBrace = cleanedText.indexOf("{");
  const lastBrace = cleanedText.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return cleanedText;
  }

  return cleanedText.slice(firstBrace, lastBrace + 1);
};

const parseJsonResponse = (text) => {
  const cleanedText = extractJsonObject(text);

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    const parseError = new Error("Gemini returned malformed JSON");
    parseError.cause = error;
    parseError.rawResponse = cleanedText;
    throw parseError;
  }
};

const isRetryableGeminiError = (error) => {
  return (
    RETRYABLE_STATUSES.has(error.status) ||
    error.code === "ETIMEDOUT" ||
    error.code === "ECONNRESET" ||
    error.name === "AbortError" ||
    error.message === "Gemini request timed out" ||
    error.message === "Gemini returned malformed JSON"
  );
};

const getResponseText = (response) => {
  if (!response) {
    return "";
  }

  if (typeof response.text === "string") {
    return response.text;
  }

  if (typeof response.text === "function") {
    return response.text();
  }

  return "";
};

const withTimeout = (promise, timeoutMs) => {
  let timeoutId;

  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Gemini request timed out"));
    }, timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
};

const generateJSON = async (prompt, context = "Gemini JSON") => {
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await withTimeout(
        ai.models.generateContent({
          model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
        REQUEST_TIMEOUT_MS
      );

      return parseJsonResponse(getResponseText(response));
    } catch (error) {
      lastError = error;
      console.error(`Gemini Error [${context}] attempt ${attempt}:`, {
        message: error.message,
        status: error.status,
      });

      if (!isRetryableGeminiError(error) || attempt === MAX_RETRIES) {
        break;
      }

      await sleep(BASE_DELAY_MS * 2 ** (attempt - 1));
    }
  }

  throw lastError;
};

module.exports = {
  generateJSON,
  parseJsonResponse,
};
