import { useState } from 'react'

import Button from '@atlaskit/button'
import SectionMessage from '@atlaskit/section-message'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizComponentProps {
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
}

const QuizComponent = ({ questions, onComplete }: QuizComponentProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    setShowResult(true)

    setTimeout(() => {
      if (isLastQuestion) {
        const score = calculateScore()
        setQuizCompleted(true)
        if (onComplete) {
          onComplete(score)
        }
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setShowResult(false)
      }
    }, 2000)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return (correct / questions.length) * 100
  }

  const isCorrectAnswer = () => {
    return (
      selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
    )
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setShowResult(false)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    const score = calculateScore()
    return (
      <div className="rounded-lg border bg-white p-6">
        <div className="text-center">
          <h3 className="mb-4 text-2xl font-bold">Quiz terminé !</h3>
          <div className="mb-4 text-6xl">
            {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
          </div>
          <p className="mb-4 text-xl">
            Votre score: {score.toFixed(0)}% (
            {
              selectedAnswers.filter(
                (answer, index) => answer === questions[index].correctAnswer
              ).length
            }
            /{questions.length})
          </p>

          {score >= 80 ? (
            <SectionMessage appearance="success" title="Excellent travail !">
              Vous maîtrisez parfaitement cette section. Vous pouvez passer au
              module suivant.
            </SectionMessage>
          ) : score >= 60 ? (
            <SectionMessage appearance="warning" title="Bon travail !">
              Vous avez une bonne compréhension. Vous pourriez revoir quelques
              concepts avant de continuer.
            </SectionMessage>
          ) : (
            <SectionMessage appearance="error" title="Continuez vos efforts !">
              Il serait bénéfique de revoir le contenu de cette section avant de
              continuer.
            </SectionMessage>
          )}

          <div className="mt-6">
            <Button onClick={resetQuiz}>Refaire le quiz</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          Question {currentQuestionIndex + 1} sur {questions.length}
        </h3>
        <div className="h-2 w-32 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h4 className="mb-4 text-lg font-medium">{currentQuestion.question}</h4>

      <div className="mb-6 space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`
              w-full rounded-lg border-2 p-4 text-left transition-all duration-200
              ${
                selectedAnswers[currentQuestionIndex] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }
              ${showResult && index === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50' : ''}
              ${showResult && selectedAnswers[currentQuestionIndex] === index && index !== currentQuestion.correctAnswer ? 'border-red-500 bg-red-50' : ''}
            `}
            disabled={showResult}
          >
            <span className="mr-2 font-medium">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mb-4">
          {isCorrectAnswer() ? (
            <SectionMessage appearance="success" title="Correct !">
              {currentQuestion.explanation}
            </SectionMessage>
          ) : (
            <SectionMessage appearance="error" title="Incorrect">
              {currentQuestion.explanation}
            </SectionMessage>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          appearance="primary"
          onClick={handleNext}
          isDisabled={
            selectedAnswers[currentQuestionIndex] === undefined || showResult
          }
        >
          {isLastQuestion ? 'Terminer le quiz' : 'Question suivante'}
        </Button>
      </div>
    </div>
  )
}

export default QuizComponent
