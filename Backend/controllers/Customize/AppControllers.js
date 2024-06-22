const App = require("../../models/Customize/AppModels");

const getAllApps = async (req, res, next) => {
  try {
    const apps = await App.find();
    res.status(200).json({ apps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addApp = async (req, res, next) => {
  const {
    firstName,
    lastName,
    mobileNumber,
    Date,
    Time,
   
  } = req.body;
  try {
    const app = new App({
      firstName,
    lastName,
    mobileNumber,
    Date,
    Time,
    });
    await app.save();
    res.status(201).json({ app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to add customize order" });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const app = await App.findById(id);
    if (!app) {
      return res.status(404).json({ message: "App not found" });
    }
    res.status(200).json({ app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateApp = async (req, res, next) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    mobileNumber,
    Date,
    Time,
  } = req.body;
  try {
    let app = await App.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        mobileNumber,
        Date,
        Time,
      },
      { new: true }
    );
    if (!app) {
      return res.status(404).json({ message: "App not updated" });
    }
    res.status(200).json({ app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteApp = async (req, res, next) => {
  const id = req.params.id;
  try {
    const app = await App.findByIdAndDelete(id);
    if (!app) {
      return res.status(404).json({ message: "App not deleted" });
    }
    res.status(200).json({ app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllApps,
  addApp,
  getById,
  updateApp,
  deleteApp,
};