const { reviewCode } = require("../services/aiService");
const hashCode = require("../utils/hashCode");
const {
  saveReview,
  getUserReviews,
  getReviewById,
} = require("../services/reviewService");
const createReview = async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        message: "Language and Code are required",
      });
    }

    // Generate AI Review
    const review = await reviewCode(language, code);

    // Generate Code Hash
    const codeHash = hashCode(code);

    // Save Review
    const reviewId = await saveReview(
      req.user.id,
      language,
      code,
      codeHash,
      review,
    );

    return res.status(201).json({
      success: true,
      reviewId,
      review,
    });
  } catch (error) {
    console.error(error);

    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "AI service is currently busy. Please try again in a few moments.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getReviews = async (req, res) => {
  try {
    const reviews = await getUserReviews(req.user.id);

    const formattedReviews = reviews.map((review) => {
      // console.log(review.review_json);
      console.log(typeof review.review_json);
      const reviewData = review.review_json;

      return {
        id: review.id,
        language: review.language,
        score: reviewData.overall_score,
        summary: reviewData.summary,
        created_at: review.created_at,
      };
    });

    return res.status(200).json({
      success: true,
      count: formattedReviews.length,
      reviews: formattedReviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const getReview = async (req, res) => {
  try {
    const review = await getReviewById(req.params.id, req.user.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,

      review: {
        id: review.id,

        language: review.language,

        code: review.code,

        review: review.review_json,

        created_at: review.created_at,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createReview,
  getReviews,
  getReview,
};
