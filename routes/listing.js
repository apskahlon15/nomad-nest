const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

// Middleware to validate listing data
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// INDEX & CREATE
router
  .route("/")
  .get(wrapAsync(listingController.index)) // GET /listings
  .post(
    isLoggedIn,
    upload.single("listing[image]"), // Upload first
    validateListing, // Then validate
    wrapAsync(listingController.createListing)
  ); // POST /listings

// NEW (form to create listing)
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW, UPDATE, DELETE (based on ID)
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // GET /listings/:id
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  ) // PUT /listings/:id
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // DELETE /listings/:id

// EDIT (form to edit listing)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
