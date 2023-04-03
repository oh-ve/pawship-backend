const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

console.log(process.env.SECRET);
const createToken = (_id, firstName, lastName, gender, location) => {
  return jwt.sign(
    { _id, firstName, lastName, gender, location },
    process.env.SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(
      user._id,
      user.firstName,
      user.lastName,
      user.gender,
      user.location
    );

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up user
const signUpUser = async (req, res) => {
  const { firstName, lastName, email, password, gender, location } = req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      gender,
      location
    );
    //create token
    const token = createToken(
      user._id,
      user.firstName,
      user.lastName,
      user.gender,
      user.location
    );
    res
      .status(200)
      .json({ firstName, lastName, email, token, gender, location });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, password, gender, location } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    gender,
    location,
  });
  user.save((err, newUser) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(201).json(newUser);
    }
  });
};

const getUsers = async (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  });
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  User.findByIdAndUpdate(userId, updates, { new: true }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  });
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(204).send();
    }
  });
};

module.exports = {
  loginUser,
  signUpUser,
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
