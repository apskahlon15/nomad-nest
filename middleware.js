const Listing = require("./models/listing");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You need to log in to do that");
    return res.redirect("/login");
  }
  res.locals.currUser = req.user; // ✅ Fix: add this line
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    // ✅ Ensure currUser exists before accessing _id
    if (
      !res.locals.currUser ||
      !listing.owner.equals(res.locals.currUser._id)
    ) {
      req.flash("error", "You are not the owner");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } catch (error) {
    next(error);
  }
};
