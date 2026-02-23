import express from "express";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: "demo-token-123",
      user: {
        username: "Elevate User",
        email: email,
        profilePic: "",
        about: "",
        college: "",
        skills: [],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        username: name,
        email: email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

export default router;