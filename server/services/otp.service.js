const nodemailer = require("nodemailer");
const path = require("path");
const { title } = require("process");
require("dotenv").config();

const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

async function sendOtp(email) {
  const otp = generateOtp();

  const mailOptions = {
    from: `"JobFit" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your One-Time Password (OTP) for Login",
    text: `Your OTP is: ${otp}. Please do not share it with anyone.`,
   html: `  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f6f8; padding: 40px 0;">
      <tr>
        <td align="center">

          <!-- Main container -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 510px; width: 93%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">

            <!-- Logo -->
            <tr>
              <td align="center" style="padding: 30px 20px 10px;">
                <img src="https://raw.githubusercontent.com/SumitVadhava/demo/main/JobFit2.png" alt="JobFit Logo" style="width: 100px; height: auto; display: block;" />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td align="center" style="padding: 0 30px 10px;">
                <h2 style="margin: 0; font-size: 24px; color: #333333;">Email Verification</h2>
                <p style="font-size: 15px; color: #555555;">Use the code below to verify your email address.</p>
              </td>
            </tr>

            <!-- OTP Code Box -->
            <tr>
              <td align="center" style="padding: 20px 30px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f0f5; border-radius: 10px; padding: 25px;">
                  <tr>
                    <td align="center" style="font-size: 36px; font-weight: bold; color: #2c2c2c; letter-spacing: 10px;">
                      ${otp}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Info text -->
            <tr>
              <td align="center" style="padding: 0 30px;">
                <p style="font-size: 14px; color: #666;">
                  This code is valid for <strong>5 minutes</strong>. Please use it promptly to complete your login.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 25px 0 30px; background-color: #f9f9f9;">
                <p style="font-size: 13px; color: #888; margin: 0 0 2px;">
                  You're receiving this message because 
                </p>
                <p style="font-size: 13px; color: #888; margin: 0 0 2px;">your email was used to sign up to JobFit.</p>
                <p style="font-size: 13px; color: #aaa; margin-top:3px;">— Team JobFit</p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table> `};
  
  await transporter.sendMail(mailOptions);
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
  
  return otp;
}

function verifyOtp(email, inputOtp) {
  const data = otpStore.get(email);
  if (!data || Date.now() > data.expiresAt) return false;

  const isValid = data.otp === inputOtp;
  
  if (isValid) otpStore.delete(email);
  
  return isValid;
}

module.exports = {
  sendOtp,
  verifyOtp,
};