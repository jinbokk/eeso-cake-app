const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    gender: req.user.gender,
    location: req.user.location,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err)
      return res.json({
        registerSuccess: false,
        message:
          err.code === 11000
            ? "동일한 이메일로 가입된 계정이 존재합니다."
            : "회원가입에 실패하였습니다.",
      });
    return res.status(200).json({
      registerSuccess: true,
    });
  });
});

router.post("/login", (req, res) => {
  // 1. find email on DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "해당 이메일로 가입된 계정이 없습니다.",
      });

    // 2. if email checked, then check password verify
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });

      // 3. if password checked, then generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // save token to cookie or localStorage
        // where is the best safe storage is grayZone
        // this time, i will use cookie

        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ logoutSuccess: false, err });
      return res.status(200).send({
        logoutSuccess: true,
      });
    }
  );
});

router.post("/addToCart", auth, (req, res) => {
  // 1. user Collection 정보 가져오기
  // user정보는 auth 미들웨어를 통해 받아올 수 있다

  // 2. 가져온 정보에서 cart에 넣으려 하는 상품이 이미 있는지 확인
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": req.body.productId,
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }, // 쿼리를 돌면서 update된 유저 정보를 받기위해 new:true 옵션을 준 것이다.
        (err, userInfo) => {
          console.log(userInfo);
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).send(userInfo.cart);
        }
      );
    } else {
      // 2-b. 상품이 없을때
      User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });

  // 2-a. 상품이 이미 있을때

  // 2-c. 상품 정보가 유효하지 않을때 (시즌 상품 등) 경우도 추가해야한다!!!!
});

module.exports = router;
