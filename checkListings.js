require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing"); // adjust if needed

const dbUrl = process.env.ATLAS_DB_URL;

async function checkListings() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Connected to Atlas");

    const listings = await Listing.find({});
    if (listings.length === 0) {
      console.log("⚠️ No listings found in the database!");
    } else {
      console.log("📋 Listings found:", listings);
    }
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
}

checkListings();
