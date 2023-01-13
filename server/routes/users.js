const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
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

router.post("/unregister", (req, res) => {
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

router.post("/addToCart", auth, async (req, res) => {
  const rootProductDoc = await Product.findOne({
    _id: req.body.productId,
  }).exec();

  const createdOption = req.body.option; // Array

  User.findOne({ _id: req.user._id }, (err, result) => {
    if (result.cart.length === 0) {
      // 우저 카트가 비어있을 경우
      createdOption.forEach((createdOptionItem) => {
        User.updateMany(
          {
            _id: req.user._id,
          },
          {
            $push: {
              cart: {
                rootProductDoc: rootProductDoc,
                id:
                  rootProductDoc._id +
                  `-${Math.random().toString(16).substr(2, 8)}`,
                option: createdOptionItem,
                quantity: 1,
                added: req.body.added,
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
              return res.status(200).send(result.cart);
            }
          }
        );
      });
    } else {
      // 유저 카트가 비어있지 않을 경우

      const existingOption = result.cart.map(
        (existingCart) => existingCart.option
      );
      // console.log("existingOption", existingOption);
      // const existingOptionStr = JSON.stringify(existingOption);
      // console.log("existingOptionStr", existingOptionStr);

      const createdOption = req.body.option;
      // console.log("createdOption", createdOption);
      // const createdOptionStr = JSON.stringify(createdOption);
      // console.log("createdOptionStr", createdOptionStr);

      const duplicateOption = createdOption.filter((createdOptionItem) =>
        existingOption.some(
          (existingOptionItem) =>
            JSON.stringify(existingOptionItem) ===
            JSON.stringify(createdOptionItem)
        )
      );

      console.log("duplicateOption", duplicateOption);
      // [] or 겹치는 옵션 걸러냄

      const notDuplicateOption = createdOption.filter(
        (createdOptionItem) =>
          !existingOption.some(
            (existingOptionItem) =>
              JSON.stringify(existingOptionItem) ===
              JSON.stringify(createdOptionItem)
          )
      );

      console.log("notDuplicateOption", notDuplicateOption);
      // 겹치지 않는 옵션

      // 1. 겹치는 옵션만 있을때
      // 2. 겹치는 옵션이 없을때
      // 3. 겹치는 옵션과 겹치지 않는 옵션이 섞여있을때

      duplicateOption.map((duplicateOptionItem) => {
        User.updateOne(
          {
            _id: req.user._id,
            "cart.option": duplicateOptionItem,
          },
          {
            $inc: { "cart.$.quantity": 1 },
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
              return res.status(200).send(result.cart);
            }
          }
        );
      });

      notDuplicateOption.map((notDuplicateOptionItem) => {
        User.updateOne(
          {
            _id: req.user._id,
          },
          {
            $push: {
              cart: {
                rootProductDoc: rootProductDoc,
                id:
                  rootProductDoc._id +
                  `-${Math.random().toString(16).substr(2, 8)}`,
                option: notDuplicateOptionItem,
                quantity: 1,
                added: req.body.added,
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
              return res.status(200).send(result.cart);
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

module.exports = router;
