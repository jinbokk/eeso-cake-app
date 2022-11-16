const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index"); //render index ejs file in views folder
});

module.exports = router;
