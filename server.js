const express = require("express");
const multer = require("multer");
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("WOOF");
});

app.use((req, res, next) => {
  console.log("HERE:", req.path, req.method);
  next();
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

const connectDB = require("./dbinit.js");
connectDB();

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const dogRoutes = require("./routes/dogRoutes");

app.use("/dog", dogRoutes);
