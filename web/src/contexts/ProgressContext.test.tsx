import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import { ProgressProvider, useProgress } from './ProgressContext'

// Composant de test pour accéder au contexte
const TestConsumer = () => {
  const {
    markLessonCompleted,
    markExerciseCompleted,
    setQuizScore,
    isLessonCompleted,
    getCompletedLessonsCount,
  } = useProgress()

  return (
    <div>
      <span data-testid="completed-count">{getCompletedLessonsCount()}</span>
      <span data-testid="intro-completed">
        {isLessonCompleted('intro').toString()}
      </span>
      <button onClick={() => markLessonCompleted('intro')}>Mark Lesson</button>
      <button onClick={() => markExerciseCompleted('intro')}>
        Mark Exercise
      </button>
      <button onClick={() => setQuizScore('intro', 80)}>Set Score 80</button>
      <button onClick={() => setQuizScore('intro', 40)}>Set Score 40</button>
    </div>
  )
}

describe('ProgressContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('démarre avec une progression vide', () => {
    render(
      <ProgressProvider>
        <TestConsumer />
      </ProgressProvider>
    )

    expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
    expect(screen.getByTestId('intro-completed')).toHaveTextContent('false')
  })

  it('marque une leçon comme terminée', () => {
    render(
      <ProgressProvider>
        <TestConsumer />
      </ProgressProvider>
    )

    fireEvent.click(screen.getByText('Mark Lesson'))

    expect(screen.getByTestId('intro-completed')).toHaveTextContent('true')
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1')
  })

  it('marque une leçon comme terminée si exercice + score >= 60', () => {
    render(
      <ProgressProvider>
        <TestConsumer />
      </ProgressProvider>
    )

    fireEvent.click(screen.getByText('Mark Exercise'))
    fireEvent.click(screen.getByText('Set Score 80'))

    expect(screen.getByTestId('intro-completed')).toHaveTextContent('true')
  })

  it('ne marque pas comme terminée si score < 60', () => {
    render(
      <ProgressProvider>
        <TestConsumer />
      </ProgressProvider>
    )

    fireEvent.click(screen.getByText('Mark Exercise'))
    fireEvent.click(screen.getByText('Set Score 40'))

    expect(screen.getByTestId('intro-completed')).toHaveTextContent('false')
  })

  it('persiste la progression dans localStorage', () => {
    render(
      <ProgressProvider>
        <TestConsumer />
      </ProgressProvider>
    )

    fireEvent.click(screen.getByText('Mark Lesson'))

    const stored = localStorage.getItem('rw-course-progress')
    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored!)
    expect(parsed.intro.completed).toBe(true)
  })

  it('restaure la progression depuis localStorage', () => {
    localStorage.setItem(
      'rw-course-progress',
      JSON.stringify({
        intro: { completed: true, exerciseCompleted: false, quizScore: null },
      })
    )

    render(
      <ProgressProvider>
        <TestConsumer />
      </ProgressProvider>
    )

    expect(screen.getByTestId('intro-completed')).toHaveTextContent('true')
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1')
  })

  it('lance une erreur si useProgress est utilisé hors du provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestConsumer />)).toThrow(
      'useProgress must be used within a ProgressProvider'
    )

    spy.mockRestore()
  })
})
