const express = require("express");
const routes = require("./routes/index");
const connectDB = require("./config/db");
const { redisCon } = require("./utils/redis");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

//json
app.use(express.json());

//urlencoded
app.use(express.urlencoded({ extended: true }));

//connect to db
connectDB();

redisCon();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend origin
    credentials: true, // Cookie'lerin frontend'e gönderilmesine izin ver
  })
);

app.get(
  "/test",
  function (req, res, next) {
    console.log("middleware");
    next();
  },
  function (req, res) {
    console.log("controller");
    res.status(200).json({ message: "controller" });
  }
);

//routes
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000", process.env.JWT_SECRET);
});
