if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const app = express();
const port = 3000;
const dbUrl = process.env.ATLAS_DB_URL;

const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB Atlas
async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Successfully connected to the Database");
  } catch (e) {
    console.error("❌ MongoDB connection error:", e);
  }
}
main();

// Configure session store with MongoDB
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // time period in seconds to limit session updates
});

store.on("error", (err) => {
  console.error("Error in Mongo session store", err);
});

// Session configuration
const sessionOptions = {
  store: store,
  secret: process.env.SECRET || "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: false, // avoid saving empty sessions
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to set locals accessible in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/search", async (req, res) => {
  const query = req.query.q || "";
  try {
    const results = await Listing.find({
      title: { $regex: query, $options: "i" }, // Case-insensitive regex search only on title
    });
    res.render("listings/search", { results, query });
  } catch (e) {
    console.error(e);
    res.redirect("/listings");
  }
});

// Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the root route!");
});

// Validation middleware example (optional)
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Error handler middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 App is listening on http://localhost:${port}`);
});
