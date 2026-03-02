# 🚀 Elevate AI – Placement Preparation Platform

> An AI-powered full-stack placement preparation platform with AI Resume Assistant, Aptitude Practice, Analytics Dashboard, and Coding Support.

---

## 🌟 Overview

**Elevate AI** is a full-stack web application designed to help students prepare for placements through AI-powered resume analysis, aptitude practice, coding preparation, and performance analytics.

The platform integrates modern frontend technologies, a secure backend, and Generative AI features to deliver a smart and personalized learning experience for placement preparation.

This project is built as a major portfolio project to showcase:
- Full Stack Development
- Generative AI Integration
- Real-world Product Architecture

---

## ⚠️ Important Note (Deployment Issue)

🚧 The deployed version of this project currently has some runtime and configuration issues.  
After deployment, the application may not run perfectly and can show errors related to:
- Environment variables configuration
- API base URL mismatch
- CORS policy issues
- Backend hosting configuration

✅ The project works properly in the **local development environment**.  
I am actively working on fixing the production deployment stability.

---

## 🧠 Key Features

- 🔐 JWT Based Authentication (Login & Signup)
- 🤖 AI Resume Assistant (Generative AI Integration)
- 📊 Analytics Dashboard
- 🧮 Aptitude Practice Module
- 💻 Coding Practice Section
- 📈 Performance Tracking
- 📄 Resume Upload & AI Analysis (PDF Support)
- 📩 Email & OTP Support
- 🔒 Security Middleware (Helmet, Auth Middleware)
- 🎨 Modern UI with Tailwind CSS & Framer Motion
- 🌐 Full Stack Architecture (React + Node + MongoDB)

---

## 🏗️ Tech Stack

### 🎨 Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Upload)
- Nodemailer
- PDF-Parse

### 🤖 AI & Integrations
- Google Generative AI API
- OpenRouter API
- AI Resume Analysis System

### 🛠️ Tools & Libraries
- Concurrently
- Nodemon
- Dotenv
- Helmet
- CORS
- ESLint

---

## 📁 Project Folder Structure

```bash
placement-prep/
│
├── backend/
│   ├── config/          # Database & environment configs
│   ├── controllers/     # Business logic (Auth, Resume, etc.)
│   ├── middleware/      # Auth & error handling middleware
│   ├── models/          # MongoDB Schemas (User, Question)
│   ├── routes/          # API Routes
│   └── server.js        # Backend entry point
│
├── src/
│   ├── api/             # Axios API configuration
│   ├── components/      # Reusable UI Components
│   ├── pages/           # Dashboard, Practice, Analytics, etc.
│   ├── hooks/           # Custom Hooks
│   └── main.jsx         # Frontend entry point
│
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 💻 How to Run This Project Locally (Step-by-Step)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/elevate-ai.git
cd placement-prep
```

### 2️⃣ Install Dependencies
```bash
npm install
```

## 3️⃣ Setup Environment Variables (Very Important)
```bash
Create a .env file in the root folder and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_ai_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

4️⃣ Run Frontend + Backend Together
```bash

npm run dev

```
