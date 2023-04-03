const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  temperament: {
    type: String,
    required: true,
  },
  playstyle: {
    type: String,
    required: true,
  },
  favoriteGame: {
    type: String,
    required: true,
  },
  lookingFor: {
    type: String,
    required: true,
  },
  // like: {
  //   type: Boolean,
  //   required: false,
  // },
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
