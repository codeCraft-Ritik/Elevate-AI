import express from 'express';
import multer from 'multer';
import { createRequire } from 'module';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- STABLE BRIDGE LOGIC ---
// This creates a 'require' function that works inside ES Modules
const require = createRequire(import.meta.url);
const pdfParseLibrary = require('pdf-parse');

// Robust initialization to handle different export patterns of the library
const pdfParse = typeof pdfParseLibrary === 'function' 
  ? pdfParseLibrary 
  : (pdfParseLibrary.default || pdfParseLibrary);

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// --- INITIALIZE GEMINI AI ---
// Initializing with your specific model: gemini-3-flash-preview
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

// Global variable to maintain context for the PrepAI Assistant
let currentResumeText = "";

/**
 * 1. ANALYZE RESUME ENDPOINT
 * Extracts text from PDF and generates structured JSON for the dashboard
 */
router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const pdfBuffer = req.file.buffer;
    
    // SAFETY CHECK: Ensure the engine initialized as a function
    if (typeof pdfParse !== 'function') {
      throw new Error("Neural Engine (pdf-parse) failed to initialize correctly.");
    }

    const data = await pdfParse(pdfBuffer); 
    currentResumeText = data.text;

    // Prompt updated to return structured JSON for Skills Matching and Action Cards
    const prompt = `
      Analyze this resume text: "${currentResumeText.substring(0, 3000)}"
      Return ONLY a JSON object with this exact structure:
      {
        "extractedSkills": ["skill1", "skill2", "skill3"],
        "suggestions": [
          {"id": 1, "task": "Add a professional summary", "impact": "High"},
          {"id": 2, "task": "Quantify experience with metrics", "impact": "Medium"},
          {"id": 3, "task": "Highlight MERN stack projects", "impact": "High"}
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean potential markdown formatting from AI response
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(cleanJson));
  } catch (err) {
    console.error("PDF/AI Error:", err);
    res.status(500).json({ error: "Neural Engine failed to process document. Ensure it is a valid PDF." });
  }
});

/**
 * 2. PREPAI ASSISTANT CHAT ENDPOINT
 * Acts as a STAR Method Coach and now handles dynamic Aptitude Question Generation.
 */
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Enhanced logic: If the message looks like a practice request, prioritize question generation
    const isPracticeRequest = message.toLowerCase().includes("generate") || message.toLowerCase().includes("questions");

    const chatPrompt = isPracticeRequest 
      ? message // If it's the specific 20-question prompt from AptitudePractice, use it directly
      : `
      You are PrepAI, a world-class HR Interview Architect.
      User Resume Background: ${currentResumeText ? currentResumeText.substring(0, 1500) : "No resume uploaded yet."}
      User Input: "${message}"
      
      INSTRUCTIONS:
      1. If the user is answering an interview question, grade them specifically on the STAR method (Situation, Task, Action, Result).
      2. Provide a "Professionalism Score" (1-10) for their input.
      3. Give one "Killer Tip" to make their answer stand out to an HR Manager.
      
      Keep the response high-tech, professional, and encouraging.
    `;

    const result = await model.generateContent(chatPrompt);
    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error("AI Chat Error:", err);
    res.status(500).json({ reply: "Connection to PrepAI engine failed. Please try again." });
  }
});

export default router;