const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const app = express();
const port = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/nomad-nest";

app.use(express.urlencoded({ extended: true }));
const ejsMate = require("ejs-mate");

const methodOverride = require("method-override");
const { nextTick } = require("process");
const review = require("./models/review.js");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
const listing = require("./routes/listing.js");

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

app.use("/listings", listing);

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

app.post(
  "/listings",

  wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (result.error) {
      throw new ExpressError(400, result.error);
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

// Delete review route
app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review reference from the listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the actual review document
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`); // fixed redirect to match your route
  })
);

app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("New review saved");
    res.redirect(`/listings/${listing._id}`);
  })
);

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
    res.status(statusCode).render("error.ejs", { message });
  });

  app.listen(port, () => {
    console.log(`🚀 App is listening on http://localhost:${port}`);
  });
}

// Run main()
main().catch((err) => console.error("❌ Error:", err));
