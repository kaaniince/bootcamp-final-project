const express = require("express");
const routes = require("./routes/index");
const connectDB = require("./config/db");
const { redisCon } = require("./utils/redis");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

//connect to db
connectDB();

redisCon();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  })
);

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
