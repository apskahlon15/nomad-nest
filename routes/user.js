const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

// SIGNUP ROUTES
router
  .route("/signup")
  .get(userController.renderSignUp)
  .post(wrapAsync(userController.signUp));

// LOGIN ROUTES
router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    wrapAsync(userController.login)
  );

// LOGOUT ROUTE
router.get("/logout", userController.logOut);

module.exports = router;
