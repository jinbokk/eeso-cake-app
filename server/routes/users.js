const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { mongo } = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

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

        error: err,
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
    if (!user) {
      return res.send({
        loginSuccess: false,
        message: "해당 이메일로 가입된 계정이 없습니다.",
      });
    }

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
        res.clearCookie("w_auth")
        res.clearCookie("w_authExp")
        return res.status(200).json({
          logoutSuccess: true,
        });
      }
    }
  );
});

router.post("/addToCart", auth, async (req, res) => {
  const createdOptions = req.body.createdOption; // Array

  const user = await User.findOne({ _id: req.user._id }).exec();

  if (user.cart.length === 0) {
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
              deliveryType: createdOptionItem.deliveryType,
              deliveryDateTime: createdOptionItem.deliveryDateTime,
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
        (err, result) => result
      );
    });
  } else {
    // 유저 카트가 비어있지 않을 경우

    // 카트 아이디 && 옵션 모두 일치하는지 판단.
    const existingIndex = user.cart;
    const createdIndex = req.body.createdOption;

    const duplicateOption = createdIndex.filter((createdOption) =>
      existingIndex.some(
        (existingOption) =>
          // JSON.stringify(existingOption) === JSON.stringify(createdOption)
          existingOption.rootProductId === createdOption.rootProductId &&
          existingOption.deliveryType === createdOption.deliveryType &&
          existingOption.deliveryDateTime.stringType ===
            createdOption.deliveryDateTime.stringType &&
          existingOption.letteringToggle === createdOption.letteringToggle &&
          existingOption.designTopperToggle ===
            createdOption.designTopperToggle &&
          existingOption.customerRequestText ===
            createdOption.customerRequestText &&
          existingOption.price === createdOption.price
      )
    );

    console.log("duplicateOption", duplicateOption);
    // [] or 겹치는 옵션 걸러냄

    const notDuplicateOption = createdIndex.filter(
      (createdOption) =>
        !existingIndex.some(
          (existingOption) =>
            // JSON.stringify(existingOption) === JSON.stringify(createdOption)
            existingOption.rootProductId === createdOption.rootProductId &&
            existingOption.deliveryType === createdOption.deliveryType &&
            existingOption.deliveryDateTime.stringType ===
              createdOption.deliveryDateTime.stringType &&
            existingOption.letteringToggle === createdOption.letteringToggle &&
            existingOption.designTopperToggle ===
              createdOption.designTopperToggle &&
            existingOption.customerRequestText ===
              createdOption.customerRequestText &&
            existingOption.price === createdOption.price
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
              "elem.rootProductId": duplicateItem.rootProductId,
              "elem.deliveryType": duplicateItem.deliveryType,
              "elem.deliveryDateTime.stringType":
                duplicateItem.deliveryDateTime.stringType,
              "elem.letteringToggle": duplicateItem.letteringToggle,
              "elem.letteringText": duplicateItem.letteringText,
              "elem.designTopperToggle": duplicateItem.designTopperToggle,
              "elem.designTopperText": duplicateItem.designTopperText,
              "elem.customerRequestText": duplicateItem.customerRequestText,
              "elem.price": duplicateItem.price,
            },
          ],
        },
        (err, result) => result
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
              deliveryType: notDuplicateItem.deliveryType,
              deliveryDateTime: notDuplicateItem.deliveryDateTime,
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
        (err, result) => result
      );
    });

    // 위 과정이 모두 끝난 뒤, <<<이걸 어떻게 판단할까...
    // 한번에 묶어서 보낸다..
    // return res
    //   .status(200)
    //   .json({ updatedCart: result.cart, isUpdated: true });
  }
});

router.post("/remove-from-cart", auth, (req, res) => {
  let { checkedCartIds } = req.body;

  checkedCartIds.map((item) => {
    let cart_o_id = new ObjectId(item);
    // 1. cart 안의 상품들 중 지우고자 하는 상품을 찾아 지운다
    return User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $pull: {
          cart: {
            _id: cart_o_id,
          },
        },
      },
      {
        new: true,
      },
      (err, result) => result
    );
  });
});

router.post("/increaseQuantity", auth, async (req, res) => {
  let cartId = req.query.id;
  let cart_o_id = new ObjectId(cartId);

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
          "elem._id": cart_o_id,
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
  let cart_o_id = new ObjectId(cartId);

  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $inc: { "cart.$[elem].quantity": -1 },
    },
    {
      new: true,
      arrayFilters: [
        {
          "elem._id": cart_o_id,
          "elem.quantity": { $gt: 1 },
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

router.post("/orderComplete", auth, async (req, res) => {
  let {
    imp_uid,
    merchant_uid,
    name,
    amount,
    deliveryType,
    deliveryDateTime,
    products,
    status,
  } = req.body;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  // order Process

  // 1. 결제완료 : order_paid
  // 2. 제작중 : order_making
  // 3. 픽업 대기: order_waiting_for_pickup
  // 4. 픽업 완료: order_complete
  // 5. 취소 대기 : order_waiting_for_cancel
  // 6. 취소 완료 : order_canceled

  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $push: {
        history: {
          imp_uid: imp_uid,
          merchant_uid: merchant_uid,
          name: name,
          amount: amount,
          products: products,
          status: status,
          deliveryType: deliveryType,
          deliveryDateTime: deliveryDateTime,
          paymentDate: new Date(new Date().getTime() + KR_TIME_DIFF),
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

module.exports = router;
