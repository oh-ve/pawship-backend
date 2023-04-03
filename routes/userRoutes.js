const express = require("express");

const {
  loginUser,
  signUpUser,
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userControllers");

const app = express.Router();

//Login
app.post("/login", loginUser);

//Signup
app.post("/signup", signUpUser);

app.get("/users", getUsers);
app.get("/:id", getUserById);

app.delete("/delete", deleteUserById);

module.exports = app;
