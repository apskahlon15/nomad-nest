const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const app = express();
const port = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/nomad-nest";

app.use(express.urlencoded({ extended: true }));
const ejsMate = require("ejs-mate");

const methodOverride = require("method-override");
const { nextTick } = require("process");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

// Root route
app.get("/", (req, res) => {
  console.log("Hi, I am root");
  res.send("Welcome to the root route!");
});

//New Route

app.get(
  "/listings/new",
  wrapAsync(async (req, res) => {
    res.render("listings/new");
  })
);

// INDEX route — Show all listings
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    console.log(allListings);
    res.render("listings/index", { allListings });
  })
);

// Show route

app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
  })
);

app.post(
  "/listings",

  wrapAsync(async (req, res, next) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "Send Valid Data");
    }
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
  })
);

app.post(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
  })
);

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);
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

app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  })
);

app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
  })
);

// Main async function
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Successfully connected to the Database");

  // app.all("*", (req, res, next) => {
  //   next(new ExpressError(404, "Page not found!"));
  // }); // Facing error here

  app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).send(message);
  });

  app.listen(port, () => {
    console.log(`🚀 App is listening on http://localhost:${port}`);
  });
}

// Run main()
main().catch((err) => console.error("❌ Error:", err));
