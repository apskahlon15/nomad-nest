const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const DEFAULT_IMAGE_URL =
  "https://images.pexels.com/photos/1227513/pexels-photo-1227513.jpeg";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default: DEFAULT_IMAGE_URL,
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

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
