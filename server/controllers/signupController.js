const User = require('../models/login');
const bcrypt = require('bcrypt');

const addSingupController = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });

    if(existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    if (!existingUser) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({ message: 'User saved successfully', user: newUser });
    } 
    
    else {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

  } 
  catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ message: 'Server error' });
  }

};

module.exports = { addSingupController };