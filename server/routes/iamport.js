const express = require("express");
const router = express.Router();

// router.get("/", auth, (req, res) => {
//   res.status(200).json({
//     _id: req.user._id,
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     gender: req.user.gender,
//     address: req.user.address,
//     phoneNumber: req.user.phoneNumber,
//     marketing: req.user.marketing,
//     role: req.user.role,
//     cart: req.user.cart,
//     history: req.user.history,
//   });
// });

module.exports = router;
