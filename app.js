const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const app = express();
const port = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/nomad-nest";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Root route
app.get("/", (req, res) => {
  console.log("Hi, I am root");
  res.send("Welcome to the root route!");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "Example",
//     description: "This is a testing",
//     price: 90,
//     location: "Banff",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("Test done successfully");
// });

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});

// Main async function
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Successfully connected to the Database");

  app.listen(port, () => {
    console.log(`🚀 App is listening on http://localhost:${port}`);
  });
}

// Run main()
main().catch((err) => console.error("❌ Error:", err));
