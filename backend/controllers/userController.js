const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, proPic, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'invalid field' });
  }

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, proPic, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, "hii", {
      expiresIn: '1d'
    });

    res.status(201).json({ name: user.name, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Log out user from other devices
    await User.updateMany({ _id: { $ne: user._id }, email }, { loggedIn: false });

    // Update the current user as logged in
    user.loggedIn = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, "hii", {
      expiresIn: '1d'
    });

    res.status(200).json({ name: user.name, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
