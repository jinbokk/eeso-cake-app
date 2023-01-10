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
        return res.status(200).send({
          logoutSuccess: true,
        });
      }
    }
  );
});

// router.post("/addToCart", auth, async (req, res) => {
//   const rootProductDoc = await Product.findOne({
//     _id: req.body.productId,
//   }).exec();

//   User.findOne({ _id: req.user._id }, (err, result) => {
//     req.body.option.forEach((createdOption, createdOptionIndex) => {
//       if (result.cart.length > 0) {
//         result.cart.forEach((existingCart, existingCartIndex) => {
//           if (
//             JSON.stringify(existingCart.option) ===
//             JSON.stringify(createdOption)
//           ) {
//             console.log("옵션 중복 로직");
//             console.log(
//               "createdOptionIndex",
//               createdOptionIndex,
//               "existingCartIndex",
//               existingCartIndex
//             );
//             User.updateMany(
//               { _id: req.user._id, "cart.option": createdOption },
//               {
//                 $inc: { "cart.$.quantity": 1 },
//               },

//               {
//                 new: true,
//               },
//               (err, result) => {
//                 if (err) {
//                   return res.status(400).json({ success: false, err });
//                 } else {
//                   return res.status(200).send(result.cart);
//                 }
//               }
//             );
//           } else {
//             console.log("옵션 중복아님 로직");
//             console.log(
//               "createdOptionIndex",
//               createdOptionIndex,
//               "existingCartIndex",
//               existingCartIndex
//             );

//             //모두 조회해보고 없으면 추가하는 코드...

//             //     User.updateMany(
//             //       {
//             //         _id: req.user._id,
//             //       },
//             //       {
//             //         $push: {
//             //           cart: {
//             //             rootProductDoc: rootProductDoc,
//             //             id: rootProductDoc.id,
//             //             quantity: 1,
//             //             option: createdOption,
//             //             added: req.body.added,
//             //           },
//             //         },
//             //       },
//             //       {
//             //         new: true,
//             //       },
//             //       (err, result) => {
//             //         if (err) {
//             //           return res.status(400).json({ success: false, err });
//             //         } else {
//             //           return res.status(200).send(result.cart);
//             //         }
//             //       }
//             //     );
//             return;
//           }
//         });
//       } else {
//         console.log("옵션 중복아님 로직 (장바구니 비어있었을때)");
//         User.updateMany(
//           {
//             _id: req.user._id,
//           },
//           {
//             $push: {
//               cart: {
//                 rootProductDoc: rootProductDoc,
//                 id: rootProductDoc.id,
//                 quantity: 1,
//                 option: createdOption,
//                 added: req.body.added,
//               },
//             },
//           },
//           {
//             new: true,
//           },
//           (err, result) => {
//             if (err) {
//               return res.status(400).json({ success: false, err });
//             } else {
//               return res.status(200).send(result.cart);
//             }
//           }
//         );
//       }
//     });
//   });
//   // +a. 상품 정보가 유효하지 않을때 (시즌 상품 등) 경우도 추가해야한다!!!!
// });

// router.post("/addToCart", auth, async (req, res) => {
//   const rootProductDoc = await Product.findOne({
//     _id: req.body.productId,
//   }).exec();

//   User.findOne({ _id: req.user._id }, (err, result) => {
//     let existingOptionStr = result.cart.map((cartItem) => {
//       return JSON.stringify(cartItem.option);
//     });

//     let createdOptionStr = JSON.stringify(req.body.option);

//     let duplicateOption = req.body.option.filter((createdOption) => {
//       return existingOptionStr.includes(JSON.stringify(createdOption));
//     });

//     let duplicateOptionStr = JSON.stringify(duplicateOption);
//     // 중복되는 값만 찾았다.

//     if (duplicateOption) {
//       // 중복값이 "모두" 있다면, 업데이트 해준다
//       console.log("중복 있음 로직");
//       for (let i = 0; i < duplicateOption.length; i++) {
//         User.updateMany(
//           { _id: req.user._id, "cart.option": duplicateOption[i] },
//           {
//             $inc: { "cart.$.quantity": 1 },
//           },

//           {
//             new: true,
//             arrayFilters: [{ "cart.option": { $e: duplicateOptionStr[i] } }],
//           },
//           (err, result) => {
//             if (err) {
//               console.log("err::::::::::::::::::", err);
//               return res.status(400).json({ success: false, err });
//             } else {
//               console.log("result::::::::::::::::::", result);
//               return res.status(200).send(result.cart);
//             }
//           }
//         );
//       }
//       // 중복값이 "일부" 있고, "일부" 없으면?
//     } else {
//       // 중복값이 "전혀" 없으면 새로 push한다
//       console.log("중복 없음 로직");
//       User.updateMany(
//         {
//           _id: req.user._id,
//         },
//         {
//           $push: {
//             cart: {
//               rootProductDoc: rootProductDoc,
//               id: rootProductDoc.id,
//               quantity: 1,
//               option: req.body.option,
//               added: req.body.added,
//             },
//           },
//         },
//         {
//           new: true,
//           arrayFilters: [{ "cart.option": { $ne: createdOptionStr } }],
//         },
//         (err, result) => {
//           if (err) {
//             console.log("err::::::::::::::::::", err);
//             return res.status(400).json({ success: false, err });
//           } else {
//             console.log("result::::::::::::::::::", result);
//             return res.status(200).send(result.cart);
//           }
//         }
//       );
//     }
//   });
// });

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
    // (err, result) => {
    //   // 2. product Collection의 정보를 새로고침하여 가져온다 (redux-store에 담긴 cartDetail의 기반이 되는 정보를 새로고침 하는 것)
    //   let cart = result.cart;
    //   let productIds = cart.map((item) => {
    //     return item.id;
    //   });

    //   Product.find({ _id: { $in: productIds } }).exec((err, productDetail) => {
    //     if (err) {
    //       return res.status(400).send(err);
    //     } else {
    //       return res.status(200).json({ productDetail, cart });
    //       // productDetail을 만들때, product collection에는 quantity 정보가 없어서 user collection과 합치는 작업을 했었는데
    //       // 위 작업을 똑같이 반복하기 위해 productDetail과 cart정보를 함께 보내는 것이다.
    //     }
    //   });
    // }
  );
});

module.exports = router;
