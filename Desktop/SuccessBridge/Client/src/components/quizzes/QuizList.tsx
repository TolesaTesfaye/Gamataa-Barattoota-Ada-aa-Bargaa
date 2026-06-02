import React from "react";
import { type Quiz } from "@types";
import { Pagination } from "@components/common/Pagination";
import { Loading } from "@components/common/Loading";
import {
  Target,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Edit2,
  Trash2,
} from "lucide-react";

interface QuizListProps {
  quizzes: Quiz[];
  loading?: boolean;
  onStart?: (quiz: Quiz) => void;
  onEdit?: (quiz: Quiz) => void;
  onDelete?: (quiz: Quiz) => void;
  showActions?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  userScores?: Record<string, number>;
  completedQuizzes?: string[];
}

export const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  loading = false,
  onStart,
  onEdit,
  onDelete,
  showActions = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  userScores = {},
  completedQuizzes = [],
}) => {
  if (loading) {
    return <Loading message="Loading quizzes..." />;
  }

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mb-6">
          <Target size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          No Assessments Built Yet
        </h3>
        <p className="text-slate-500 font-medium max-w-md">
          You're currently all caught up on your assessments. Check back later
          for new tests.
        </p>
      </div>
    );
  }

  const getDifficulty = (quiz: Quiz) => {
    const questionCount = quiz.questions?.length || 0;
    return questionCount > 10 ? "Hard" : questionCount > 5 ? "Medium" : "Easy";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Hard":
        return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10";
      case "Medium":
        return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10";
      default:
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10";
    }
  };

  const colorPalettes = [
    {
      bg: "from-blue-400 to-blue-600",
      accent: "bg-blue-500",
      button: "bg-blue-600 hover:bg-blue-700",
      text: "text-white",
      header: "bg-blue-500/20",
    },
    {
      bg: "from-emerald-400 to-emerald-600",
      accent: "bg-emerald-500",
      button: "bg-emerald-600 hover:bg-emerald-700",
      text: "text-white",
      header: "bg-emerald-500/20",
    },
    {
      bg: "from-orange-400 to-orange-600",
      accent: "bg-orange-500",
      button: "bg-orange-600 hover:bg-orange-700",
      text: "text-white",
      header: "bg-orange-500/20",
    },
    {
      bg: "from-amber-400 to-amber-600",
      accent: "bg-amber-500",
      button: "bg-amber-600 hover:bg-amber-700",
      text: "text-white",
      header: "bg-amber-500/20",
    },
    {
      bg: "from-red-400 to-red-600",
      accent: "bg-red-500",
      button: "bg-red-600 hover:bg-red-700",
      text: "text-white",
      header: "bg-red-500/20",
    },
    {
      bg: "from-cyan-400 to-cyan-600",
      accent: "bg-cyan-500",
      button: "bg-cyan-600 hover:bg-cyan-700",
      text: "text-white",
      header: "bg-cyan-500/20",
    },
    {
      bg: "from-pink-400 to-pink-600",
      accent: "bg-pink-500",
      button: "bg-pink-600 hover:bg-pink-700",
      text: "text-white",
      header: "bg-pink-500/20",
    },
    {
      bg: "from-lime-400 to-lime-600",
      accent: "bg-lime-500",
      button: "bg-lime-600 hover:bg-lime-700",
      text: "text-white",
      header: "bg-lime-500/20",
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Card Grid View */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-2.5 lg:gap-3">
        {quizzes.map((quiz, index) => {
          const difficulty = getDifficulty(quiz);
          const completed = completedQuizzes.includes(quiz.id);
          const userScore = userScores[quiz.id];
          const isPassed =
            completed &&
            userScore !== undefined &&
            userScore >= quiz.passingScore;
          const colorPalette = colorPalettes[index % colorPalettes.length];

          return (
            <div
              key={quiz.id}
              className={`bg-gradient-to-br ${colorPalette.bg} rounded-lg p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-white flex flex-col h-full`}
            >
              {/* Content Wrapper */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-2 md:mb-2.5 pb-2 md:pb-2.5 border-b border-white/20 gap-1.5">
                  <div className="flex items-start gap-1.5 md:gap-2 flex-1">
                    <div
                      className={`w-6 md:w-7 h-6 md:h-7 rounded ${colorPalette.header} text-white flex items-center justify-center shrink-0`}
                    >
                      <FileText size={12} className="md:w-4 md:h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-[9px] md:text-xs leading-tight line-clamp-2">
                        {quiz.title}
                      </h3>
                      <p className="text-[7px] md:text-[10px] text-white/80 mt-0.5 line-clamp-1">
                        {quiz.description}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 px-1.5 md:px-2 py-0.5 text-[7px] md:text-[9px] font-bold rounded text-center whitespace-nowrap bg-white/20 text-white border border-white/30">
                    {difficulty}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-2 md:mb-2.5 pb-2 md:pb-2.5 border-b border-white/20">
                  <div className="text-center">
                    <div className="text-[7px] md:text-[9px] text-white/80 font-medium mb-0.5">
                      Questions
                    </div>
                    <div className="text-[8px] md:text-xs font-bold text-white">
                      {quiz.questions?.length || 0}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[7px] md:text-[9px] text-white/80 font-medium mb-0.5">
                      Time
                    </div>
                    <div className="flex items-center justify-center gap-0.5 text-[8px] md:text-xs font-bold text-white">
                      <Clock size={8} className="md:w-2.5 md:h-2.5" />
                      {quiz.timeLimit}m
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[7px] md:text-[9px] text-white/80 font-medium mb-0.5">
                      Pass
                    </div>
                    <div className="text-[8px] md:text-xs font-bold text-white">
                      {quiz.passingScore}%
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-2 md:mb-2.5">
                  {completed && userScore !== undefined ? (
                    <div
                      className={`flex items-center justify-between px-1.5 md:px-2 py-1 md:py-1.5 rounded text-[7px] md:text-[9px] font-bold ${
                        isPassed
                          ? "bg-white/30 text-white border border-white/50"
                          : "bg-black/20 text-white border border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-0.5 md:gap-1">
                        {isPassed ? (
                          <CheckCircle size={10} className="md:w-3 md:h-3" />
                        ) : (
                          <XCircle size={10} className="md:w-3 md:h-3" />
                        )}
                        {isPassed ? "Passed" : "Failed"}
                      </div>
                      <span className="font-black">{userScore}%</span>
                    </div>
                  ) : (
                    <div className="text-[7px] md:text-[9px] font-semibold text-white/80 px-1.5 md:px-2 py-1 md:py-1.5">
                      Not Started
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {showActions && onStart && (
                <button
                  onClick={() => onStart(quiz)}
                  className={`w-full flex items-center justify-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-1.5 md:py-2 rounded text-[7px] md:text-xs font-bold transition-all duration-200 text-white shadow-lg ${
                    completed
                      ? "bg-black/30 hover:bg-black/40 border border-white/20"
                      : `${colorPalette.button} shadow-lg shadow-black/30`
                  }`}
                >
                  {completed ? (
                    <>
                      <RotateCcw size={14} className="md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Retake Quiz</span>
                      <span className="sm:hidden">Retake</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} className="md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Start Quiz</span>
                      <span className="sm:hidden">Start</span>
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
