const express = require("express");
const app = express.Router();

const {
  createDog,
  getAllDogs,
  getOneDog,
  updateDog,
  deleteDog,
  deleteAllDogs,
  getAllDogsFromUser,
} = require("../controllers/dogControllers");

const requireAuth = require("../middlewares/requireAuth");

app.use(requireAuth);

app.route("/").get(getAllDogs).post(createDog).delete(deleteAllDogs);

app.route("/user/:user_id").get(getAllDogsFromUser);

app.route("/:id").get(getOneDog).put(updateDog).delete(deleteDog);

module.exports = app;
