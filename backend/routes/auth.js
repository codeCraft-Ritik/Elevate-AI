import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const router = express.Router();

// --- STABLE PATH LOGIC ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- NODEMAILER CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

const otpStore = new Map();

/**
 * 1. REGISTER: Premium Neural OTP Protocol
 * Sends a high-tech authentication email with glow effects and clean alignment.
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Identity already exists." });

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Store OTP with 10-minute expiry
    otpStore.set(email, { username, email, password: hashedPassword, otp, expires: Date.now() + 600000 });

    await transporter.sendMail({
      from: `"ElevateAI Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Action Required: Your Neural Access Key",
      html: `
        <div style="background-color: #050507; padding: 50px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; background: #0d0d0f; border: 1px solid #1e40af; border-radius: 35px; padding: 50px 40px; box-shadow: 0 25px 60px rgba(0,0,0,0.8);">
            <div style="background: #2563eb; width: 65px; height: 65px; border-radius: 18px; margin: 0 auto 25px; line-height: 65px; font-size: 32px; font-weight: 900; color: #ffffff; box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);">E</div>
            <h2 style="text-transform: uppercase; letter-spacing: 6px; font-style: italic; color: #3b82f6; margin-bottom: 15px; font-size: 18px;">Authentication Protocol</h2>
            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Greetings <strong style="color: #ffffff;">${username}</strong>,</p>
            <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 40px;">A request to initialize your neural profile has been detected. Use the following access key to proceed:</p>
            
            <div style="margin: 40px 0; background: #16161a; border: 1px dashed #2563eb; border-radius: 25px; padding: 40px;">
              <h1 style="letter-spacing: 18px; font-size: 52px; margin: 0; color: #3b82f6; text-shadow: 0 0 25px rgba(37, 99, 235, 0.5); font-weight: 900;">${otp}</h1>
            </div>

            <p style="font-size: 11px; color: #4b5563; text-transform: uppercase; letter-spacing: 3px; margin-top: 40px;">This key expires in 10 minutes | Secure Transmission Active</p>
          </div>
          <p style="margin-top: 30px; font-size: 10px; color: #3f3f46; letter-spacing: 1px;">© 2026 ELEVATEAI NEURAL SYSTEMS. UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED.</p>
        </div>`
    });

    res.status(200).json({ message: "OTP transmitted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 2. VERIFY OTP & WELCOME: Elite Welcome Kit
 * Sends a unique, attractive welcome email upon successful verification.
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const data = otpStore.get(email);

    if (!data || data.otp !== otp || Date.now() > data.expires) {
      return res.status(400).json({ message: "Invalid or expired code." });
    }

    const newUser = new User({ 
      username: data.username, 
      email: data.email, 
      password: data.password 
    });
    
    await newUser.save();
    otpStore.delete(email);

    const imagePath = path.resolve(__dirname, '../../public/Services.png');
    
    const welcomeMailOptions = {
      from: `"ElevateAI Premium" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Simulation Initialized: Welcome to the Elite, ${data.username}!`,
      html: `
        <div style="background-color: #050507; padding: 50px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
          <div style="max-width: 650px; margin: 0 auto; background: #0d0d0f; border: 1px solid #3b82f6; border-radius: 45px; overflow: hidden; box-shadow: 0 30px 70px rgba(0,0,0,0.7);">
            
            <div style="padding: 60px 40px; text-align: center; background: linear-gradient(to bottom, #1e40af22, transparent);">
              <h1 style="font-size: 42px; font-weight: 900; font-style: italic; margin: 0; text-transform: uppercase; letter-spacing: -2px; color: #ffffff;">Elevate <span style="color: #3b82f6;">Your Career.</span></h1>
              <p style="color: #60a5fa; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; font-size: 12px; margin-top: 15px;">Neural Simulation Status: Active</p>
            </div>

            <div style="padding: 0 50px 50px;">
              <p style="font-size: 18px; color: #f4f4f5; margin-bottom: 20px;">Hello <strong>${data.username}</strong>,</p>
              <p style="color: #a1a1aa; line-height: 1.8; font-size: 15px; margin-bottom: 40px;">Your neural profile has been successfully initialized. You now have full access to our elite career engineering ecosystem. We are excited for your career journey!</p>
              
              <div style="margin: 40px 0; text-align: center;">
                <img src="cid:services_dashboard" alt="ELEVATEAI SERVICES" style="width: 100%; max-width: 520px; border-radius: 30px; border: 1px solid #1e40af; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              </div>

              <div style="background: #111114; border-radius: 30px; padding: 35px; border: 1px solid #27272a;">
                <h4 style="margin: 0 0 20px; color: #ffffff; text-transform: uppercase; font-size: 12px; letter-spacing: 3px; font-weight: 900; border-bottom: 1px solid #27272a; padding-bottom: 10px;">Unlocked Neural Toolset:</h4>
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr><td style="padding: 12px 0; color: #e4e4e7; font-size: 14px; border-bottom: 1px solid #1e293b;"><strong style="color: #3b82f6; margin-right: 10px;">•</strong> AI Resume Architect</td></tr>
                  <tr><td style="padding: 12px 0; color: #e4e4e7; font-size: 14px; border-bottom: 1px solid #1e293b;"><strong style="color: #3b82f6; margin-right: 10px;">•</strong> Mock Interview Arena</td></tr>
                  <tr><td style="padding: 12px 0; color: #e4e4e7; font-size: 14px; border-bottom: 1px solid #1e293b;"><strong style="color: #3b82f6; margin-right: 10px;">•</strong> Aptitude Quizzes & Vault</td></tr>
                  <tr><td style="padding: 12px 0; color: #e4e4e7; font-size: 14px;"><strong style="color: #3b82f6; margin-right: 10px;">•</strong> Personalized Neural Analytics</td></tr>
                </table>
              </div>

              <div style="margin-top: 50px; text-align: center;">
                 <p style="color: #60a5fa; font-size: 16px; font-weight: 800; italic; margin-bottom: 5px;">Let’s elevate your career together!</p>
                 <p style="color: #3f3f46; font-size: 9px; text-transform: uppercase; letter-spacing: 4px;">Powered by ElevateAI Neural Engine</p>
              </div>
            </div>
          </div>
        </div>`,
      attachments: [{ filename: 'Services.png', path: imagePath, cid: 'services_dashboard' }]
    };

    transporter.sendMail(welcomeMailOptions).catch(err => console.error(err));
    res.status(201).json({ message: "Verified!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 3. SECURE LOGIN
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Identity not recognized." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Access denied: Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ 
      token, username: user.username, email: user.email,
      about: user.about, college: user.college, skills: user.skills, profilePic: user.profilePic
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 4. PROFILE UPDATE
 */
router.put('/update-profile', async (req, res) => {
  try {
    const { email, username, about, college, skills } = req.body;
    if (!email) return res.status(400).json({ message: "Email identifier required." });

    const user = await User.findOneAndUpdate(
      { email },
      { username, about, college, skills },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User profile not found." });

    res.status(200).json({ 
      message: "Neural Profile Synchronized",
      username: user.username,
      about: user.about, 
      college: user.college, 
      skills: user.skills 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;