const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

// Define a basic user schema. No need to add password manually.
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

// Add passport-local-mongoose plugin to handle hashing, salting, and authentication methods
userSchema.plugin(passportLocalMongoose);

// Export the compiled User model
module.exports = mongoose.model("User", userSchema);
