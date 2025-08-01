const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const port = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/nomad-nest";
app.use(express.urlencoded({ extended: true }));
const ejsMate = require("ejs-mate");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

const { date } = require("joi");
//Sessions
const sessionOptions = {
  secret: "mySuperSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 100, // Sets the exact expiration date/time of the cookie (7 days from now)
    maxAge: 7 * 24 * 60 * 60 * 100, // Sets the max age of the cookie in milliseconds (also 7 days), after which cookie expires
    httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript (helps prevent XSS attacks)
  },
};
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
//Routes

const listing = require("./routes/listing.js");
const review = require("./routes/review.js");

// Root route
app.get("/", (req, res) => {
  console.log("Hi, I am root");
  res.send("Welcome to the root route!");
});

// New listing page route
app.get(
  "/listings/new",
  wrapAsync(async (req, res) => {
    res.render("listings/new");
  })
);

// Mount routers
app.use("/listings", listing);
app.use("/listings/:id/reviews", review);

// Review validation middleware (if needed in app-level, otherwise handled in router)
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// You already have POST and other routes in routers, so no duplicates here

// Error handler middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Main async function to connect to Mongo and start server
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Successfully connected to the Database");

  app.listen(port, () => {
    console.log(`🚀 App is listening on http://localhost:${port}`);
  });
}

// Run main()
main().catch((err) => console.error("❌ Error:", err));
