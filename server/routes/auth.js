const express = require('express');
const router = express.Router();
const User = require('../models/login');
const { sendOtp, verifyOtp } = require('./../services/otp.service');

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    
    let existingUser = await User.findOne({ email: email });
    
    if (existingUser) {
        return res.status(200).json({ message: 'User already exists', user: existingUser });
    }
    
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        await sendOtp(email);
        res.json({ message: 'OTP sent to your email' });
    } 
    catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send OTP', details: err.message });
    }
});

router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

    const valid = verifyOtp(email, otp);
    
    if (!valid) return res.status(400).json({ error: 'Invalid or expired OTP' });

    res.json({ message: 'OTP verified successfully' });
});

module.exports = router;