const express = require("express");
const router = express.Router();
const User = require("../models/user");

// All Users Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i"); // "ca" can find "cake" and "CAke" ... etc
  }
  try {
    const users = await User.find(searchOptions); // just use find method this time in mongoose (find all)
    res.render("users/index", {
      users: users,
      searchOptions: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});

// New Users Route
router.get("/new", (req, res) => {
  res.render("users/new", { user: new User() });
});

// Create User Route
router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: fileName,
      ingredient: req.body.ingredient,
      layer: req.body.layer,
      design: req.body.design,
      description: req.body.description,
      image_url: image_url,
    });

    console.log("mongoDB User upload result : ", user);

    const newUser = await user.save();

    // res.redirect(`users/${newUser.id}`);
    res.redirect("users");
  } catch (error) {
    res.render("users/new", {
      user: user,
      errorMessage: "Error creating User",
    });
    console.log("error is : ", error);
  }
});

module.exports = router;
