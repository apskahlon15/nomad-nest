const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const passport = require("passport");

// Render Sign Up Page
module.exports.renderSignUp = (req, res) => {
  res.render("users/signup");
};

// Sign Up Logic (your provided code)
module.exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Nomad Nest");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Render Login Page
module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

// Login Logic
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Nomad Nest");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Logout Logic
module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have successfully logged out");
    res.redirect("/listings");
  });
};
