import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, ChevronLeft, ChevronRight, Flag, Send } from "lucide-react";

const AptitudeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Mock Questions Data
  const questions = [
    {
      id: 1,
      question: "What is the time complexity of a binary search algorithm on a sorted array of size 'n'?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correct: 1
    },
    {
      id: 2,
      question: "A train 150m long is running at 54 km/hr. How much time will it take to cross a platform 250m long?",
      options: ["20 seconds", "26.6 seconds", "30 seconds", "25 seconds"],
      correct: 1
    },
    // Add more questions as needed
  ];

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 pb-10">
      {/* Left Column: Question Area */}
      <div className="lg:col-span-3 space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <span className="px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-sm font-bold border border-blue-600/20">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2 text-zinc-400">
              <Timer size={18} className="text-orange-500" />
              <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-white leading-relaxed mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleOptionSelect(index)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-blue-600 bg-blue-600/10 text-white"
                    : "border-zinc-800 bg-zinc-800/30 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  selectedAnswers[currentQuestion] === index ? "border-blue-500 bg-blue-500" : "border-zinc-600"
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                {option}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <button 
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white disabled:opacity-50 transition-all"
          >
            <ChevronLeft size={20} /> Previous
          </button>
          <div className="flex gap-4">
            <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-yellow-500 hover:bg-yellow-500/10 transition-all">
              <Flag size={20} />
            </button>
            <button 
              onClick={() => currentQuestion < questions.length - 1 ? setCurrentQuestion(prev => prev + 1) : null}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all"
            >
              {currentQuestion === questions.length - 1 ? "Review All" : "Next Question"} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Status Grid */}
      <div className="space-y-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <h3 className="font-bold text-white mb-4">Question Status</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentQuestion(i)}
                className={`h-10 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-all ${
                  currentQuestion === i ? "ring-2 ring-blue-500 bg-blue-600 text-white" :
                  selectedAnswers[i] !== undefined ? "bg-green-600/20 text-green-500 border border-green-600/30" :
                  "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-zinc-500">Attempted</span>
              <span className="text-green-500">{Object.keys(selectedAnswers).length} Questions</span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-900/20">
              <Send size={18} /> Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeQuiz;