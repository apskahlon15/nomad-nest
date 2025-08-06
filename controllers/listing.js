const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = 6; // Listings per page
  const skip = (page - 1) * limit; // Documents to skip

  const totalListings = await Listing.countDocuments();
  const listings = await Listing.find({}).skip(skip).limit(limit);

  const totalPages = Math.ceil(totalListings / limit);

  res.render("listings/index", {
    listings, // Use this instead of allListings
    currentPage: page,
    totalPages,
  });
};

module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new");
};
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "New listing created");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  // Properly update basic fields
  let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });

  // If a new image is uploaded, update image field
  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    updatedListing.image = { url, filename };
    await updatedListing.save();
  }

  req.flash("success", "Listing updated successfully");
  res.redirect(`/listings/${updatedListing._id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully");
  res.redirect("/listings");
};
