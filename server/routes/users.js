const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    gender: req.user.gender,
    address: req.user.address,
    phoneNumber: req.user.phoneNumber,
    marketing: req.user.marketing,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) {
      return res.status(400).json({
        registerSuccess: false,
        message:
          err.code === 11000
            ? "동일한 이메일로 가입된 계정이 존재합니다."
            : "회원가입에 실패하였습니다.",
      });
    } else {
      return res.status(200).json({
        registerSuccess: true,
      });
    }
  });
});

router.post("/unregister", async (req, res) => {
  // 암호 대조 먼저 해주어야 한다

  let user = await User.findOne({
    email: req.body.email,
  }).exec();

  let existPassword = user.password;

  let comparePassword = await bcrypt.compare(req.body.password, existPassword);

  console.log("comparePassword:::", comparePassword);

  if (comparePassword) {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (!req.body.email || err) {
          res.status(200).send(err);
        } else {
          user.deleteOne();
          res.status(200).json({
            unregisterSuccess: true,
          });
        }
      }
    );
  } else {
    res.status(200).json({
      unregisterSuccess: false,
      message: "비밀번호가 틀립니다. 다시 입력해 주세요.",
    });
  }
});

router.get("/register/email-check/:email", (req, res) => {
  let { email } = req.params;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      return res.status(200).send(true);
    } else {
      return res.status(200).send(false);
    }
  });
});

router.get("/register/phoneNumber-check/:phoneNumber", (req, res) => {
  let { phoneNumber } = req.params;

  User.findOne({ phoneNumber: phoneNumber }, (err, user) => {
    if (user) {
      return res.status(200).send(true);
    } else {
      return res.status(200).send(false);
    }
  });
});

router.post("/login", (req, res) => {
  // 1. find email on DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.send({
        loginSuccess: false,
        message: "해당 이메일로 가입된 계정이 없습니다.",
      });

    // 2. if email checked, then check password verify
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.send({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });

      // 3. if password checked, then generate token
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          // save token to cookie or localStorage
          // where is the best safe storage is grayZone
          // this time, i will use cookie
          return (
            res.cookie("w_authExp", user.tokenExp),
            res.cookie("w_auth", user.token).status(200).json({
              loginSuccess: true,
              userId: user._id,
            })
          );
        }
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ logoutSuccess: false, message: err });
      } else {
        return res.status(200).json({
          logoutSuccess: true,
        });
      }
    }
  );
});

router.post("/addToCart", auth, (req, res) => {
  const createdOptions = req.body.createdOption; // Array

  console.log("createdOptions::::::", createdOptions);

  User.findOne({ _id: req.user._id }, (err, result) => {
    if (result.cart.length === 0) {
      // 유저 카트가 비어있을 경우
      createdOptions.map((createdOptionItem) => {
        User.findOneAndUpdate(
          {
            _id: req.user._id,
          },
          {
            $push: {
              cart: {
                _id: mongo.ObjectId(),
                rootProductId: createdOptionItem.rootProductId,
                title: createdOptionItem.title,
                image_url: createdOptionItem.image_url,
                // option: createdOptionItem.option,
                deliveryType: createdOptionItem.deliveryType,
                deliveryDate: createdOptionItem.deliveryDate,
                deliveryTime: createdOptionItem.deliveryTime,
                letteringToggle: createdOptionItem.letteringToggle,
                letteringText: createdOptionItem.letteringText,
                designTopperToggle: createdOptionItem.designTopperToggle,
                designTopperText: createdOptionItem.designTopperText,
                customerRequestText: createdOptionItem.customerRequestText,
                quantity: createdOptionItem.quantity,
                price: createdOptionItem.price,
              },
            },
          },
          {
            new: true,
          },
          (err, result) => {
            if (err) {
              return res.status(400).json({ success: false, err });
            } else {
              console.log("result", result);
            }
          }
        );
      });
    } else {
      // 유저 카트가 비어있지 않을 경우

      // 카트 아이디 && 옵션 모두 일치하는지 판단.
      const existingIndex = result.cart;
      // console.log("existingOption", existingOption);
      // const existingOptionStr = JSON.stringify(existingOption);
      // console.log("existingOptionStr", existingOptionStr);

      const createdIndex = req.body.options;
      // console.log("createdOption", createdOption);
      // const createdOptionStr = JSON.stringify(createdOption);
      // console.log("createdOptionStr", createdOptionStr);

      const duplicateOption = createdIndex.filter((createdOption) =>
        existingIndex.some(
          (existingOption) =>
            JSON.stringify(existingOption) === JSON.stringify(createdOption)
        )
      );

      console.log("duplicateOption", duplicateOption);
      // [] or 겹치는 옵션 걸러냄

      const notDuplicateOption = createdIndex.filter(
        (createdOption) =>
          !existingIndex.some(
            (existingOption) =>
              JSON.stringify(existingOption) === JSON.stringify(createdOption)
          )
      );

      console.log("notDuplicateOption", notDuplicateOption);
      // 겹치지 않는 옵션

      // 1. 겹치는 옵션만 있을때
      // 2. 겹치는 옵션이 없을때
      // 3. 겹치는 옵션과 겹치지 않는 옵션이 섞여있을때

      duplicateOption.map((duplicateItem) => {
        User.findOneAndUpdate(
          {
            _id: req.user._id,
          },
          {
            $inc: { "cart.$[elem].quantity": 1 },
          },
          {
            new: true,
            arrayFilters: [
              {
                "elem.title": duplicateItem.title,
                "elem.option": duplicateItem.option,
              },
            ],
          },
          (err, result) => {
            if (err) {
              console.log("err::::::::::::::::::", err);
              return res.status(400).json({ success: false, err });
            } else {
              console.log("result::::::::::::::::::", result);
              // return res.status(200).send(result);
            }
          }
        );
      });

      notDuplicateOption.map((notDuplicateItem) => {
        User.findOneAndUpdate(
          {
            _id: req.user._id,
          },
          {
            $push: {
              cart: {
                _id: mongo.ObjectId(),
                rootProductId: notDuplicateItem.rootProductId,
                title: notDuplicateItem.title,
                image_url: notDuplicateItem.image_url,
                // option: notDuplicateItem.option,
                deliveryType: notDuplicateItem.deliveryType,
                deliveryDate: notDuplicateItem.deliveryDate,
                deliveryTime: notDuplicateItem.deliveryTime,
                letteringToggle: notDuplicateItem.letteringToggle,
                letteringText: notDuplicateItem.letteringText,
                designTopperToggle: notDuplicateItem.designTopperToggle,
                designTopperText: notDuplicateItem.designTopperText,
                customerRequestText: notDuplicateItem.customerRequestText,
                quantity: notDuplicateItem.quantity,
                price: notDuplicateItem.price,
              },
            },
          },
          {
            new: true,
          },
          (err, result) => {
            if (err) {
              console.log("err::::::::::::::::::", err);
              return res.status(400).json({ success: false, err });
            } else {
              console.log("result::::::::::::::::::", result);
              // return res.status(200).send(result);
            }
          }
        );
      });
    }
  });
});

router.get("/remove-from-cart", auth, (req, res) => {
  // 1. cart 안의 상품들 중 지우고자 하는 상품을 찾아 지운다
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $pull: {
        cart: {
          id: req.query.id,
        },
      },
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log("err::::::::::::::::::", err);
        return res.status(400).json({ success: false, err });
      } else {
        console.log("result::::::::::::::::::", result);
        return res.status(200).send(result.cart);
      }
    }
  );
});

router.post("/increaseQuantity", auth, async (req, res) => {
  let cartId = req.query.id;

  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $inc: { "cart.$[elem].quantity": 1 },
    },
    {
      new: true,
      arrayFilters: [
        {
          "elem._id": ObjectId(cartId),
        },
      ],
    },
    (err, result) => {
      if (err) {
        console.log("err::::::::::::::::::", err);
        return res.status(400).json({ success: false, err });
      } else {
        console.log("result::::::::::::::::::", result);
        return res.status(200).send(result.cart);
      }
    }
  );
});

router.post("/decreaseQuantity", auth, async (req, res) => {
  let cartId = req.query.id;

  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $inc: { "cart.$[elem].quantity": 1 },
    },
    {
      new: true,
      arrayFilters: [
        {
          "elem._id": ObjectId(cartId),
        },
      ],
    },
    (err, result) => {
      if (err) {
        console.log("err::::::::::::::::::", err);
        return res.status(400).json({ success: false, err });
      } else {
        console.log("result::::::::::::::::::", result);
        return res.status(200).send(result.cart);
      }
    }
  );
});

module.exports = router;
