const User = require("../models/user.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.changeUserRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.changeUserStatus = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
};

