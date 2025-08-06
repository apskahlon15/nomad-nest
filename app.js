if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

console.log(process.env.SECRET);

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
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

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

// Initialize Passport to use in the app (adds passport functionality to Express)
app.use(passport.initialize());

// Enables persistent login sessions (used with express-session)
app.use(passport.session());

// Set up the local strategy using the User model's authentication method (usually from passport-local-mongoose)
passport.use(new LocalStrategy(User.authenticate()));

// Defines how user data is stored in the session (provided by passport-local-mongoose)
passport.serializeUser(User.serializeUser());

// Defines how user data is retrieved from the session (provided by passport-local-mongoose)
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//Routes

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "student@gmail.com",
    username: "teststudent123",
  });
  let registeredUser = await User.register(fakeUser, "helloworld");
  console.log(registeredUser);
});

// Root route
app.get("/", (req, res) => {
  console.log("Hi, I am root");
  res.send("Welcome to the root route!");
});

// Mount routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

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
