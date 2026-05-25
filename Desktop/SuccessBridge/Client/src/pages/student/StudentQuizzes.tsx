import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { QuizList } from '@components/quizzes/QuizList'
import { QuizTaker } from '@components/quizzes/QuizTaker'
import { QuizResults } from '@components/quizzes/QuizResults'
import { AIQuizGenerator } from '@components/quizzes/AIQuizGenerator'
import { quizService } from '@services/quizService'
import { Quiz } from '@types'
import { Loading } from '@components/common/Loading'
import { useAuthStore } from '@store/authStore'
import { BookOpen, Sparkles, BrainCircuit, Target } from 'lucide-react'

interface ResultData {
  score: number
  totalPoints: number
  timeSpent: number
  questionsAnswered: number
  totalQuestions: number
  passingScore: number
}

export const StudentQuizzes: React.FC = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [resultData, setResultData] = useState<ResultData | null>(null)
  const [activeTab, setActiveTab] = useState<'official' | 'ai'>('official')

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      const params = {
        educationLevel: user?.studentType,
        grade: user?.studentType === 'university' ? user?.universityLevel : user?.highSchoolGrade,
        stream: user?.studentType === 'high_school' ? user?.highSchoolStream : undefined,
      }
      const data = await quizService.getAll(params)
      setQuizzes(data)
    } catch (error) {
      console.error('Failed to fetch quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz)
  }

  const handleSubmitQuiz = async (results: any) => {
    try {
      if (!activeQuiz) return
      await quizService.submitResult(activeQuiz.id, {
        score: results.score,
        totalPoints: results.totalPoints,
        timeSpent: results.timeSpent,
        answers: results.answers
      })
      setResultData({
        score: results.score,
        totalPoints: results.totalPoints,
        timeSpent: results.timeSpent,
        questionsAnswered: Object.keys(results.answers).length,
        totalQuestions: activeQuiz.questions.length,
        passingScore: activeQuiz.passingScore,
      })
      
      navigate('/student/progress')
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      alert('Failed to save your results. Please try again.')
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex-1 flex items-center justify-center min-h-[60vh] animate-pulse">
          <Loading message="Curating your assessments..." />
        </div>
      </DashboardLayout>
    );
  }

  if (activeQuiz && !resultData) {
    return (
      <DashboardLayout title={activeQuiz.title} subtitle="Stay focused, you're doing great!">
        <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <QuizTaker
            quiz={activeQuiz}
            onSubmit={handleSubmitQuiz}
            onCancel={() => setActiveQuiz(null)}
          />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10 pb-12 pt-6 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Premium Hero Section */}
        <div className="relative rounded-3xl overflow-hidden glass-panel shadow-2xl border border-white/20 dark:border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 opacity-90" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow -translate-x-1/3 translate-y-1/3" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative p-8 md:p-12 z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
                <Target className="w-4 h-4 text-amber-300" />
                Master Your Subjects
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight drop-shadow-md">
                Academic Assessments
              </h1>
              <p className="text-indigo-100 text-lg md:text-xl font-medium leading-relaxed max-w-xl drop-shadow">
                Challenge yourself with official curriculum quizzes or generate custom AI practice sets tailored perfectly to your weaknesses.
              </p>
            </div>
            
            <div className="hidden lg:flex items-center justify-center p-6 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <BrainCircuit className="w-32 h-32 text-white opacity-90 drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Premium Segmented Tabs */}
        <div className="flex justify-center">
          <div className="flex p-1.5 bg-slate-200/50 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-300/50 dark:border-slate-700/50 shadow-inner w-full md:w-auto">
            <button
              onClick={() => setActiveTab('official')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeTab === 'official'
                  ? 'text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {activeTab === 'official' && (
                <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-sm" />
              )}
              <BookOpen className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Official Quizzes</span>
            </button>
            
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                activeTab === 'ai'
                  ? 'text-fuchsia-600 dark:text-fuchsia-400 shadow-lg shadow-fuchsia-500/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {activeTab === 'ai' && (
                <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-sm" />
              )}
              <Sparkles className="w-5 h-5 relative z-10" />
              <span className="relative z-10">AI Custom Practice</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="transition-all duration-500 ease-in-out">
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/60 dark:border-slate-700/50 shadow-xl p-6 md:p-8">
            {activeTab === 'official' ? (
              <QuizList
                quizzes={quizzes}
                loading={loading}
                onStart={handleStartQuiz}
              />
            ) : (
              <AIQuizGenerator />
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}
