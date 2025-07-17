const User = require('../models/login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const getLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email: email });
    if (!user) return res.status(200).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(200).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    if (!token) return res.status(500).json({ message: "Error generating token" });

    res.json({ message: "Login successful", token, user});

  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getLoginController };