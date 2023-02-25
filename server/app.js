if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const logger = require("morgan");
const schedule = require("node-schedule");

const app = express();
app.use(history());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/temp", express.static("temp"));

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EESO CAKE API DOCUMENT (in production)",
      version: "0.0.0",
      description: "API documentation for the  EESO CAKE SERVICE",
    },
  },
  apis: ["./routes/api-docs.js"], // files containing annotations as above
};
const openapiSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/iamport", require("./routes/iamport"));
app.use("/api/instagram", require("./routes/instagram"));
app.use("/webhook", require("./routes/webhook"));

app.post("/portone-webhook", async (req, res) => {
  try {
    const { tx_id, payment_id } = req.body;

    // 1. 포트원 API를 사용하기 위한 액세스 토큰 발급 받기
    const signinResponse = await axios({
      url: "https://api.portone.io/v2/signin/api-key",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        api_key: process.env.IMP_API_KEY, // 포트원 API Key
      },
    });
    const { access_token } = signinResponse.data;

    // 2. 포트원 결제내역 단건조회 API 호출
    const paymentResponse = await axios({
      url: `https://api.portone.io/v2/payments/${payment_id}`,
      method: "get",
      // 1번에서 발급받은 액세스 토큰을 Bearer 형식에 맞게 넣어주세요.
      headers: { Authorization: "Bearer " + access_token },
    });
    const {
      payment: { id, transactions },
    } = paymentResponse.data;
    // 대표 트랜잭션(승인된 트랜잭션)을 선택합니다.
    const transaction = transactions.find((tx) => tx.is_primary === true);

    // 3. 가맹점 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
    const order = await OrderService.findById(id);
    if (order.amount === transaction.amount.total) {
      switch (status) {
        case "VIRTUAL_ACCOUNT_ISSUED": {
          const { virtual_account } = transaction.payment_method_detail;
          // 가상 계좌가 발급된 상태입니다.
          // 계좌 정보(virtual_account)를 이용해 원하는 로직을 구성하세요.
          break;
        }
        case "PAID": {
          // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
          break;
        }
      }
    } else {
      // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
    }
  } catch (e) {
    // 결제 검증에 실패했습니다.
    res.status(400).send(e);
  }
});

// const instaApiBaseURL = process.env.INSTAGRAM_API_BASE_URL;
// app.use(instaApiBaseURL, require("./routes/instagram"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  // app.use(express.static("client/build"));

  // index.html for all page routes html
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

const scheduledTask = require("./util/scheduledTask");

app.listen(8000, function () {
  // 5초마다 mongoDB 탐색하여 document 갱신
  schedule.scheduleJob("*/5 * * * * *", function () {
    console.log("scheduler running / " + new Date());
    scheduledTask.update_order_status();
  });

  // 매달 1일 토큰 갱신
  schedule.scheduleJob("0 0 1 * *", function () {
    console.log("Instagram Token has been updated");
    scheduledTask.renew_instagramAPI_token();
  });
});

module.exports = app;
