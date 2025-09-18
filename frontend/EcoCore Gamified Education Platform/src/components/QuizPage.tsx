import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { 
  Clock, 
  Award, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Target,
  Star,
  RotateCcw
} from 'lucide-react'

interface QuizPageProps {
  onBack: () => void
}

export function QuizPage({ onBack }: QuizPageProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizzes = [
    {
      id: 'climate-basics',
      title: 'Climate Change Basics',
      description: 'Test your knowledge of climate science fundamentals',
      difficulty: 'Beginner',
      questions: 10,
      timeLimit: 15,
      points: 100,
      thumbnail: '🌍'
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy Sources',
      description: 'Learn about sustainable energy solutions',
      difficulty: 'Intermediate',
      questions: 8,
      timeLimit: 12,
      points: 150,
      thumbnail: '☀️'
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity & Conservation',
      description: 'Explore ecosystems and species protection',
      difficulty: 'Advanced',
      questions: 12,
      timeLimit: 20,
      points: 200,
      thumbnail: '🦋'
    },
    {
      id: 'waste-management',
      title: 'Waste Management',
      description: 'Understand recycling and waste reduction',
      difficulty: 'Beginner',
      questions: 6,
      timeLimit: 10,
      points: 80,
      thumbnail: '♻️'
    }
  ]

  const questions = [
    {
      question: "What is the primary cause of current climate change?",
      options: [
        "Natural climate variations",
        "Increased greenhouse gas emissions from human activities",
        "Solar radiation changes",
        "Volcanic eruptions"
      ],
      correct: 1,
      explanation: "Human activities, particularly burning fossil fuels, have dramatically increased greenhouse gas concentrations in the atmosphere."
    },
    {
      question: "Which of these is NOT a greenhouse gas?",
      options: [
        "Carbon dioxide (CO2)",
        "Methane (CH4)",
        "Nitrogen (N2)",
        "Nitrous oxide (N2O)"
      ],
      correct: 2,
      explanation: "Nitrogen (N2) makes up about 78% of our atmosphere but is not a greenhouse gas. The other options are all significant greenhouse gases."
    },
    {
      question: "What percentage of Earth's water is freshwater?",
      options: [
        "About 50%",
        "About 25%",
        "About 10%",
        "About 3%"
      ],
      correct: 3,
      explanation: "Only about 2.5-3% of Earth's water is freshwater, and most of that is frozen in ice caps and glaciers."
    }
  ]

  const selectedQuizData = quizzes.find(q => q.id === selectedQuiz)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)
      
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
        setQuizCompleted(true)
      }
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || null)
      const newAnswers = answers.slice(0, currentQuestion)
      setAnswers(newAnswers)
    }
  }

  const calculateScore = () => {
    const correct = answers.filter((answer, index) => answer === questions[index].correct).length
    return Math.round((correct / questions.length) * 100)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResults(false)
    setQuizCompleted(false)
  }

  if (showResults) {
    const score = calculateScore()
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length
    
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-foreground">Quiz Complete!</h1>
            <p className="text-muted-foreground">
              Great job on completing the {selectedQuizData?.title} quiz
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">{score}%</div>
                  <p className="text-muted-foreground">
                    {correctAnswers} out of {questions.length} correct
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score</span>
                    <span>{score}%</span>
                  </div>
                  <Progress value={score} className="h-3" />
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Points Earned</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      +{Math.round((selectedQuizData?.points || 100) * (score / 100))} points
                    </Badge>
                  </div>
                  
                  {score >= 80 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Badge Earned</span>
                      <Badge className="bg-primary text-primary-foreground">
                        Quiz Master 🏆
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex gap-4 justify-center">
            <Button onClick={resetQuiz} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button onClick={() => setSelectedQuiz(null)}>
              <Target className="w-4 h-4 mr-2" />
              Try Another Quiz
            </Button>
            <Button onClick={onBack} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (selectedQuiz) {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="p-6 max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setSelectedQuiz(null)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{selectedQuizData?.title}</h1>
              <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>12:45</span>
            </div>
            <Badge variant="outline">{selectedQuizData?.points} points</Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className={`w-full text-left justify-start h-auto p-4 ${
                          selectedAnswer === index 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index 
                              ? 'border-primary-foreground bg-primary-foreground' 
                              : 'border-muted-foreground'
                          }`}>
                            {selectedAnswer === index && (
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index < currentQuestion 
                    ? 'bg-primary' 
                    : index === currentQuestion 
                    ? 'bg-primary/50' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-primary hover:bg-primary/90"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">Environmental Quizzes</h1>
        <p className="text-muted-foreground">
          Test your knowledge and earn points while learning about environmental topics
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedQuiz(quiz.id)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-3">{quiz.thumbnail}</div>
                  <Badge 
                    variant={quiz.difficulty === 'Beginner' ? 'secondary' : quiz.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {quiz.difficulty}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {quiz.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quiz.timeLimit} min
                      </span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      {quiz.points} pts
                    </Badge>
                  </div>
                  
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Start Quiz
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}