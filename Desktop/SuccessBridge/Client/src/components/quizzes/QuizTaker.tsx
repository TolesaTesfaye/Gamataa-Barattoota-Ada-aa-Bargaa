import React, { useState, useEffect } from "react";
import { type Quiz } from "@services/quizService";
import { ChevronRight, ChevronLeft, AlertCircle, Check, X } from "lucide-react";
import { Button } from "@components/common/Button";
import { Loading } from "@components/common/Loading";

interface QuizTakerProps {
  quiz: Quiz;
  onSubmit: (results: {
    score: number;
    totalPoints: number;
    timeSpent: number;
    answers: Record<string, string>;
  }) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const LETTER_OPTIONS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const QuizTaker: React.FC<QuizTakerProps> = ({
  quiz,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentQuestion = quiz.questions[currentIdx];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentIdx < totalQuestions - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else if (e.key === "ArrowLeft" && currentIdx > 0) {
        setCurrentIdx((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx, totalQuestions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleQuestionClick = (index: number) => {
    setCurrentIdx(index);
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const calculateAndSubmit = (finalAnswers = answers) => {
    let score = 0;
    let totalPoints = 0;

    quiz.questions.forEach((q: any) => {
      totalPoints += q.points;
      if (finalAnswers[q.id] === q.correctAnswer) {
        score += q.points;
      }
    });

    const timeSpent = quiz.timeLimit * 60 - timeLeft;
    onSubmit({
      score: Math.round((score / totalPoints) * 100),
      totalPoints,
      timeSpent,
      answers: finalAnswers,
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === quiz.questions.length) {
      calculateAndSubmit();
    } else {
      setShowConfirm(true);
    }
  };

  if (loading) return <Loading message="Analyzing your brilliance..." />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar with Close Button */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          {/* Breadcrumb - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span
              onClick={() => onCancel?.()}
              className="hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer transition-colors"
            >
              Quiz List
            </span>
            <ChevronRight size={14} className="sm:w-4 sm:h-4" />
            <span className="text-teal-600 dark:text-teal-400 font-medium truncate">
              {quiz.title}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={() => onCancel?.()}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ml-auto sm:ml-0"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Title - Hidden on mobile */}
            <div className="hidden sm:block mb-4 md:mb-6 lg:mb-8">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {quiz.title}
              </h1>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 lg:p-10 shadow-sm">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {/* Question Number */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                    Q{currentIdx + 1}/{totalQuestions}
                  </span>
                </div>

                {/* Question */}
                <div>
                  <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed">
                    {currentQuestion.text}
                  </h2>
                </div>

                {/* Answer Options */}
                <div className="space-y-2 sm:space-y-3">
                  {currentQuestion.type === "multiple_choice" && (
                    <>
                      {currentQuestion.options?.map((option, idx) => {
                        const isSelected =
                          answers[currentQuestion.id] === option;
                        const letterLabel = LETTER_OPTIONS[idx];

                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            className={`w-full p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 text-left transition-all duration-200 flex items-start gap-2 sm:gap-3 md:gap-4 ${
                              isSelected
                                ? "bg-teal-50 dark:bg-teal-900/20 border-teal-500 dark:border-teal-500"
                                : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600"
                            }`}
                          >
                            <div
                              className={`flex-shrink-0 w-6 sm:w-8 h-6 sm:h-8 rounded-lg flex items-center justify-center font-semibold text-xs sm:text-sm transition-all ${
                                isSelected
                                  ? "bg-teal-500 text-white"
                                  : "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-slate-300"
                              }`}
                            >
                              {letterLabel}
                            </div>
                            <span className="text-xs sm:text-base font-medium text-gray-900 dark:text-gray-100 pt-0.5 sm:pt-1">
                              {option}
                            </span>
                            {isSelected && (
                              <Check className="w-4 sm:w-5 h-4 sm:h-5 text-teal-500 ml-auto flex-shrink-0 mt-1" />
                            )}
                          </button>
                        );
                      })}
                    </>
                  )}

                  {currentQuestion.type === "short_answer" && (
                    <input
                      type="text"
                      autoFocus
                      className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-teal-500 outline-none text-xs sm:text-base text-gray-900 dark:text-white transition-colors"
                      placeholder="Type your answer here..."
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                    />
                  )}

                  {currentQuestion.type === "essay" && (
                    <textarea
                      autoFocus
                      className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-teal-500 outline-none text-xs sm:text-base text-gray-900 dark:text-white transition-colors min-h-[120px] sm:min-h-[150px] md:min-h-[200px] resize-none"
                      placeholder="Share your detailed thoughts here..."
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                    />
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6 md:pt-8 justify-between md:justify-center">
                  <button
                    onClick={() =>
                      setCurrentIdx((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentIdx === 0}
                    className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-slate-600 flex items-center gap-1 sm:gap-2"
                  >
                    <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="px-3 sm:px-4 md:px-8 py-2 sm:py-2.5 md:py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
                  >
                    <span className="hidden sm:inline">
                      {currentIdx === totalQuestions - 1
                        ? "Submit Answer"
                        : "Next Question"}
                    </span>
                    <span className="sm:hidden text-xs font-bold">
                      {currentIdx === totalQuestions - 1 ? "Submit" : "Next"}
                    </span>
                    {currentIdx !== totalQuestions - 1 && (
                      <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-20 sm:w-24 md:w-32 lg:w-72 flex flex-col gap-2 md:gap-3 lg:gap-6">
            {/* Timer Circle */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-2 md:p-3 lg:p-8 shadow-sm flex flex-col items-center sticky top-8">
              <div className="relative w-16 sm:w-20 md:w-24 lg:w-32 h-16 sm:h-20 md:h-24 lg:h-32 mb-1 md:mb-2 lg:mb-4">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-200 dark:text-slate-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${(timeLeft / (quiz.timeLimit * 60)) * 282.7} 282.7`}
                    className="text-teal-500 transition-all duration-1000"
                    style={{ transitionTimingFunction: "linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs sm:text-sm md:text-base lg:text-3xl font-bold text-teal-600 dark:text-teal-400 font-mono">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium text-center">
                Time
              </p>
            </div>

            {/* Questions List */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-1.5 md:p-2 lg:p-6 shadow-sm flex-1 overflow-hidden flex flex-col">
              <h3 className="hidden lg:block text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quiz Questions
              </h3>
              <div className="space-y-1 md:space-y-1.5 lg:space-y-2 overflow-y-auto flex-1 pr-1 md:pr-1.5 lg:pr-2">
                {quiz.questions.map((_, idx) => {
                  const isAnswered = answers[quiz.questions[idx].id];
                  const isCurrent = idx === currentIdx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuestionClick(idx)}
                      className={`w-full px-1 md:px-1.5 lg:px-4 py-1 md:py-1.5 lg:py-3 rounded text-[9px] md:text-xs lg:text-sm font-medium transition-all flex items-center justify-center lg:justify-between ${
                        isCurrent
                          ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-2 border-teal-500"
                          : isAnswered
                            ? "bg-teal-50 dark:bg-teal-900/10 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/20 border border-teal-200 dark:border-teal-800"
                            : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 border border-transparent"
                      }`}
                      title={`Question ${idx + 1}`}
                    >
                      <span className="lg:flex-1 text-left">{idx + 1}</span>
                      {(isAnswered || isCurrent) && (
                        <Check
                          className={`w-2.5 md:w-3 lg:w-4 h-2.5 md:h-3 lg:h-4 flex-shrink-0 md:ml-0.5 lg:ml-auto ${isCurrent ? "text-teal-700 dark:text-teal-300" : "text-teal-600 dark:text-teal-400"}`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-1 md:mt-1.5 lg:mt-4 pt-1 md:pt-1.5 lg:pt-4 border-t border-gray-200 dark:border-slate-700 hidden lg:block">
                <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    {answeredCount}
                  </span>
                  <span> of {totalQuestions} answered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
              Incomplete Quiz
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 text-center mb-6">
              You've answered {Object.keys(answers).length} of{" "}
              {quiz.questions.length} questions. Submit anyway?
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowConfirm(false)}
                className="flex-1"
              >
                Continue Quiz
              </Button>
              <Button
                variant="primary"
                onClick={() => calculateAndSubmit()}
                className="flex-1 bg-teal-600 hover:bg-teal-700"
              >
                Submit Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
