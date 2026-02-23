import express from 'express';
const router = express.Router();

// Mock data for Interview Practice
const interviewData = [
  {
    id: 1,
    title: "React Lifecycle Hooks",
    category: "Frontend",
    question: "Explain the difference between useEffect and useLayoutEffect.",
    videoUrl: "https://www.youtube.com/watch?v=6Ve9M82C5mE"
  },
  {
    id: 2,
    title: "Node.js Event Loop",
    category: "Backend",
    question: "How does Node.js handle asynchronous operations on a single thread?",
    videoUrl: "https://www.youtube.com/watch?v=JcbKpugOLtY"
  }
];

router.get('/questions', (req, res) => {
  res.status(200).json(interviewData);
});

export default router;