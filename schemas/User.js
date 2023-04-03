const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  // pets: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Dog",
  //   },
  // ],
});

userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  gender,
  location
) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (!firstName || !lastName || !email || !password || !gender || !location) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one upper case letter, a number and a symbol"
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    gender,
    location,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
