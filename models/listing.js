const mongoose = require("mongoose");
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
});

// Pre-save hook to replace empty or whitespace-only url with default
listingSchema.pre("save", function (next) {
  if (!this.url || this.url.trim() === "") {
    this.url = DEFAULT_IMAGE_URL;
  }
  next();
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
