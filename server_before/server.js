if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser"); // lib for easliy access to input elements

const cors = require("cors");
app.use(cors());

const indexRouter = require("./routes/index");
const productRouter = require("./routes/products");
const userRouter = require("./routes/users");
const apiRouter = require("./routes/api");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

// Connect MongoDB
// useNewUrlParser , useUnifiedTopology , useFindAndModify ,
// and useCreateIndex are no longer supported options.
// Mongoose 6 always behaves as if useNewUrlParser , useUnifiedTopology ,
// and useCreateIndex are true , and useFindAndModify is false .

mongoose.connect(process.env.PRODUCT_DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(`Connected to mongoDB`));

// const productDB = mongoose.createConnection(process.env.PRODUCT_DATABASE_URL);
// const userDB = mongoose.createConnection(process.env.USER_DATABASE_URL);

// productDB.on("error", (error) => console.log(error));
// productDB.once("open", () => console.log(`Connected to mongoDB_Products`));
// userDB.on("error", (error) => console.log(error));
// userDB.once("open", () => console.log(`Connected to mongoDB_Users`));

app.listen(process.env.PORT || 8000, () => console.log("Server is running"));
