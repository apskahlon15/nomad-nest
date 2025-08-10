require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing"); // adjust if needed
const listings = require("./init/data");

async function seedDB() {
  try {
    await mongoose.connect(process.env.ATLAS_DB_URL);
    console.log("MongoDB connected");

    // Don't delete existing listings, just insert new ones
    await Listing.insertMany(listings);
    console.log(`${listings.length} listings added to the database`);

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error("Error seeding the database:", err);
  }
}

seedDB();
