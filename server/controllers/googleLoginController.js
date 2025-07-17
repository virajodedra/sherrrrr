const User = require('./../models/google_login');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const googleAddLoginController = async (req, res) => {
  const { name, email, picture, google_id } = req.body;

  try {
    let existingUser = await User.findOne({ google_id: google_id });

    if (!existingUser) {
      const newUser = new User({
        userName: name,
        email: email,
        picture: picture,
        google_id: google_id
      });

      await newUser.save();
      userToUse = newUser;
    
    } else {
      userToUse = existingUser;
    }

    const token = jwt.sign(
      { id: userToUse._id, email: userToUse.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    if (!token) return res.status(500).json({ message: "Error generating token" });

    const message = existingUser ? 'User already exists' : 'User signup successfully';

    return res.status(200).json({
      message,
      user: userToUse,
      token
    });

  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ message: 'Server error' , error: error.message });
  }
};


module.exports = {googleAddLoginController};