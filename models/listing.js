const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  url: {
    default:
      "https://images.pexels.com/photos/1227513/pexels-photo-1227513.jpeg",
    type: String,
    set: (v) =>
      v === ""
        ? "https://images.pexels.com/photos/1227513/pexels-photo-1227513.jpeg"
        : v,
  },

  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
