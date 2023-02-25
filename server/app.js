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
app.use("/api/webhook", require("./routes/webhook"));

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
