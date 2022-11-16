const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator"),
  bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;

const Email = new mongoose.Schema({
  address: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },
  // Change the default to true if you don't need to validate a new user's email address
  validated: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  nickname: { type: String, required: true },
  password: { type: String, required: true, trim: true },
  email: { type: Email, required: true },
  birth: { type: Date },
  gender: [{ type: String, required: true }],
  description: { type: String },
});

userSchema.plugin(uniqueValidator, { message: "is already taken." });

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model("User", userSchema);
