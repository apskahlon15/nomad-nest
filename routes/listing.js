const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// INDEX route — Show all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    console.log(allListings);
    res.render("listings/index", { allListings });
  })
);

// Show route

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show", { listing });
  })
);

// Delete Route

router.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

router.post(
  "/",
  wrapAsync(async (req, res) => {
    let result = listingSchema.validate(req.body);
    if (result.error) throw new ExpressError(400, result.error);
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
  })
);

module.exports = router;
