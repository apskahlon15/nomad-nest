const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/review.js");
const { isLoggedIn } = require("../middleware.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Redirect GET /listings/:id/reviews to listing page
router.get("/", (req, res) => {
  const listingId = req.params.id;
  res.redirect(`/listings/${listingId}`);
});

// Delete review route
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

module.exports = router;
