import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface LessonProgress {
  [lessonId: string]: {
    completed: boolean
    exerciseCompleted: boolean
    quizScore: number | null
  }
}

interface ProgressContextType {
  progress: LessonProgress
  markLessonCompleted: (lessonId: string) => void
  markExerciseCompleted: (lessonId: string) => void
  setQuizScore: (lessonId: string, score: number) => void
  isLessonCompleted: (lessonId: string) => boolean
  getCompletedLessonsCount: () => number
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
)

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

interface ProgressProviderProps {
  children: ReactNode
}

const STORAGE_KEY = 'rw-course-progress'

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [progress, setProgress] = useState<LessonProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as LessonProgress) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // localStorage indisponible (mode privé, quota dépassé, etc.)
    }
  }, [progress])

  const markLessonCompleted = (lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        completed: true,
      },
    }))
  }

  const markExerciseCompleted = (lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        exerciseCompleted: true,
      },
    }))
  }

  const setQuizScore = (lessonId: string, score: number) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        [lessonId]: {
          ...prev[lessonId],
          quizScore: score,
        },
      }

      // Marquer la leçon comme terminée si exercice ET quiz sont faits avec score >= 60
      const lessonProgress = newProgress[lessonId]
      if (lessonProgress?.exerciseCompleted && score >= 60) {
        newProgress[lessonId].completed = true
      }

      return newProgress
    })
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress[lessonId]?.completed || false
  }

  const getCompletedLessonsCount = () => {
    return Object.values(progress).filter((lesson) => lesson?.completed).length
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonCompleted,
        markExerciseCompleted,
        setQuizScore,
        isLessonCompleted,
        getCompletedLessonsCount,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export default ProgressContext
