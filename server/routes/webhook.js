const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { User } = require("../models/User");
const FormData = require("form-data");
const axios = require("axios");
const {
  iamportGenerateAccessToken,
} = require("../util/iamportGenerateAccessToken");

// "/webhook"에 대한 POST 요청을 처리
router.post("/", async (req, res) => {
  try {
    // req의 body에서 imp_uid, merchant_uid 추출
    const { imp_uid, merchant_uid } = req.body;
    const order_status = req.body.status;

    if (order_status === "cancelled") {
      try {
        await User.findOneAndUpdate(
          { history: { $elemMatch: { imp_uid: imp_uid } } },
          // { _id: req.user._id },
          {
            $set: { "history.$[elem].status": "order_cancelled" },
          },
          { new: true, arrayFilters: [{ "elem.imp_uid": imp_uid }] }
        );

        return res.status(200).json({
          status: "cancelled_confirm_success",
          message: "관리자페이지 취소 DB 업데이트 성공",
        });
      } catch (error) {
        return res.status(400).json({
          status: "cancelled_confirm_error",
          message: "관리자페이지 취소 DB 업데이트 실패",
        });
      }
    }

    ///////////             done

    // 액세스 토큰(access token) 발급 받기
    /* ...중략... */

    // const form = new FormData();
    // form.append("imp_key", process.env.IMP_API_KEY);
    // form.append("imp_secret", process.env.IMP_API_SECRET);

    // console.log("imp_key", process.env.IMP_API_KEY);
    // console.log("imp_secret", process.env.IMP_API_SECRET);

    // const getToken = await axios.post(
    //   `https://api.iamport.kr/users/getToken`,
    //   form
    // );

    const access_token = await iamportGenerateAccessToken();

    // imp_uid로 포트원 서버에서 결제 정보 조회
    /* ...중략... */

    const getPaymentData = await axios.get(
      `https://api.iamport.kr/payments/${imp_uid}`,
      { headers: { Authorization: access_token } }
    );

    const paymentData = getPaymentData.data.response; // 조회한 결제 정보

    console.log("paymentData:::", paymentData);

    //     // DB에서 결제되어야 하는 금액 조회

    const order = await User.findOne(
      {},
      {
        history: { $elemMatch: { imp_uid: imp_uid } },
      }
    ).then((order) => order.history[0]);

    console.log("order test::::", order);

    const amountToBePaid = order.amount; // 결제 되어야 하는 금액

    console.log("amountToBePaid::::", amountToBePaid);
    // // 결제 검증하기
    const { amount } = paymentData;
    const paymentStatus = paymentData.status;
    // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액
    if (amount === amountToBePaid) {
      // DB에 결제 정보 저장
      // await Orders.findByIdAndUpdate(merchant_uid, { $set: paymentData });
      switch (paymentStatus) {
        // case "ready": // 가상계좌 발급
        //   // DB에 가상계좌 발급 정보 저장
        //   const { vbank_num, vbank_date, vbank_name } = paymentData;
        //   await Users.findByIdAndUpdate("/* 고객 id */", {
        //     $set: { vbank_num, vbank_date, vbank_name },
        //   });
        //   // 가상계좌 발급 안내 문자메시지 발송
        //   SMS.send({
        //     text: `가상계좌 발급이 성공되었습니다. 계좌 정보 ${vbank_num} ${vbank_date} ${vbank_name}`,
        //   });
        //   res.send({ status: "vbankIssued", message: "가상계좌 발급 성공" });
        //   break;
        case "paid": // 결제 완료
          try {
            await User.findOneAndUpdate(
              { history: { $elemMatch: { imp_uid: imp_uid } } },
              // { _id: req.user._id },
              {
                $set: { "history.$[elem].status": "order_paid" },
              },
              { new: true, arrayFilters: [{ "elem.imp_uid": imp_uid }] }
            ).then((result) => result);

            return res.status(200).json({
              status: "order_confirm_success",
              message: "결제 완료 / DB 업데이트 성공",
            });
          } catch (error) {
            return res.status(400).json({
              status: "order_confirm_error",
              message: "결제 완료 / DB 업데이트 실패",
            });
          }
      }
    } else {
      // 결제금액 불일치. 위/변조 된 결제
      return res
        .status(400)
        .json({ status: "forgery", message: "위조된 결제시도" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", error: error });
  }
});

module.exports = router;
