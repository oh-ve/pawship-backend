const Dog = require("../schemas/Dog");

const createDog = async (req, res) => {
  try {
    const {
      name,
      photo,
      age,
      gender,
      temperament,
      playstyle,
      favoriteGame,
      lookingFor,
    } = req.body;
    const dog = await Dog.create({
      name,
      photo,
      age,
      gender,
      temperament,
      playstyle,
      favoriteGame,
      lookingFor,
    });
    res.status(201).json({
      success: true,
      dog,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json({ dogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    res.status(200).json({
      dog,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updateDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      dog,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      response: "Dog deleted",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteAllDogs = async (req, res) => {
  try {
    const deletedDogs = await Dog.deleteMany({});
    if (deletedDogs.deletedCount === 0) {
      return res.status(404).json({ error: "No Dogs found to delete." });
    }
    res
      .status(200)
      .json({ message: `Deleted ${deletedDogs.deletedCount} Dogs.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDogsFromUser = async (req, res) => {
  try {
    const user_id = req.user_id;
    const dogs = await Dog.find({ user_id }).populate("user");
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDog,
  getAllDogs,
  getOneDog,
  updateDog,
  deleteAllDogs,
  deleteDog,
  getAllDogsFromUser,
};
