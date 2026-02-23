import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Frontend', 'Backend', 'HR', 'System Design'] },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  content: { type: String, required: true },
  videoUrl: { type: String }, 
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);