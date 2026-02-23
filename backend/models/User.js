import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  profilePic: {
    type: String,
    default: ""
  },
  about: {
    type: String,
    default: ""
  },
  college: {
    type: String,
    default: ""
  },
  skills: {
    type: [String],
    default: []
  },
  // --- ANALYTICS & ACTIVITY LOG DATA ---
  // Stores the latest calculated ATS score from the Resume Architect
  resumeScore: { 
    type: Number, 
    default: 0 
  },
  // Stores the history of all practice sessions and resume updates
  activities: [{
    category: { type: String }, // e.g., "Aptitude", "Coding", "Resume"
    task: { type: String },     // e.g., "SYLLOGISM", "PORTFOLIO OPTIMIZATION"
    status: { type: String, default: "COMPLETED" },
    time: { type: String, default: "JUST NOW" },
    xp: { type: Number, default: 0 }
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;