const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("New review saved");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  // Remove review reference from the listing's reviews array
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete the actual review document
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`); // fixed redirect to match your route
};
