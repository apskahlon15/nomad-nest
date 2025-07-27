const mongoose = require("mongoose");
const Review = require("./review");
const { ref } = require("joi");
const Schema = mongoose.Schema;

const DEFAULT_IMAGE_URL =
  "https://images.pexels.com/photos/1227513/pexels-photo-1227513.jpeg";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  url: {
    type: String,
    default: DEFAULT_IMAGE_URL,
    validate: {
      validator: (v) => typeof v === "string" && v.trim().length > 0,
      message: "URL cannot be empty",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
