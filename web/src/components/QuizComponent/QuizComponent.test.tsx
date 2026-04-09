import { render, screen, fireEvent, act } from '@redwoodjs/testing/web'

import QuizComponent from './QuizComponent'

const mockQuestions = [
  {
    id: 'q1',
    question: 'Quel framework utilise RedwoodJS pour le frontend ?',
    options: ['Vue.js', 'React', 'Angular', 'Svelte'],
    correctAnswer: 1,
    explanation: 'RedwoodJS utilise React pour le frontend.',
  },
  {
    id: 'q2',
    question: 'Quel ORM RedwoodJS utilise-t-il par défaut ?',
    options: ['TypeORM', 'Sequelize', 'Prisma', 'Mongoose'],
    correctAnswer: 2,
    explanation: 'RedwoodJS utilise Prisma comme ORM par défaut.',
  },
]

describe('QuizComponent', () => {
  it('affiche la première question au démarrage', () => {
    render(<QuizComponent questions={mockQuestions} />)

    expect(
      screen.getByText('Quel framework utilise RedwoodJS pour le frontend ?')
    ).toBeInTheDocument()
    expect(screen.getByText('Question 1 sur 2')).toBeInTheDocument()
  })

  it('affiche toutes les options de réponse', () => {
    render(<QuizComponent questions={mockQuestions} />)

    expect(screen.getByText('A.')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('B.')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('désactive le bouton suivant si aucune réponse sélectionnée', () => {
    render(<QuizComponent questions={mockQuestions} />)

    const nextButton = screen.getByRole('button', {
      name: /question suivante/i,
    })
    expect(nextButton).toBeDisabled()
  })

  it("active le bouton suivant après sélection d'une réponse", () => {
    render(<QuizComponent questions={mockQuestions} />)

    fireEvent.click(screen.getByText('React'))

    const nextButton = screen.getByRole('button', {
      name: /question suivante/i,
    })
    expect(nextButton).toBeEnabled()
  })

  it('appelle onComplete avec le bon score quand le quiz est terminé', async () => {
    const onComplete = jest.fn()
    render(<QuizComponent questions={mockQuestions} onComplete={onComplete} />)

    // Question 1 : bonne réponse (React = index 1)
    fireEvent.click(screen.getByText('React'))
    fireEvent.click(screen.getByRole('button', { name: /question suivante/i }))

    // Attendre l'animation (2s dans le composant)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100))
    })

    // Question 2 : bonne réponse (Prisma = index 2)
    fireEvent.click(screen.getByText('Prisma'))
    fireEvent.click(screen.getByRole('button', { name: /terminer le quiz/i }))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100))
    })

    expect(onComplete).toHaveBeenCalledWith(100)
  })

  it("affiche l'écran de résultat à la fin du quiz", async () => {
    render(<QuizComponent questions={mockQuestions} />)

    // Question 1 : mauvaise réponse
    fireEvent.click(screen.getByText('Vue.js'))
    fireEvent.click(screen.getByRole('button', { name: /question suivante/i }))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100))
    })

    // Question 2 : bonne réponse
    fireEvent.click(screen.getByText('Prisma'))
    fireEvent.click(screen.getByRole('button', { name: /terminer le quiz/i }))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100))
    })

    expect(screen.getByText('Quiz terminé !')).toBeInTheDocument()
    expect(screen.getByText(/50%/)).toBeInTheDocument()
  })

  it('permet de refaire le quiz', async () => {
    render(<QuizComponent questions={mockQuestions} />)

    fireEvent.click(screen.getByText('Vue.js'))
    fireEvent.click(screen.getByRole('button', { name: /question suivante/i }))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100))
    })
    fireEvent.click(screen.getByText('Prisma'))
    fireEvent.click(screen.getByRole('button', { name: /terminer le quiz/i }))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100))
    })

    fireEvent.click(screen.getByRole('button', { name: /refaire le quiz/i }))

    expect(
      screen.getByText('Quel framework utilise RedwoodJS pour le frontend ?')
    ).toBeInTheDocument()
    expect(screen.getByText('Question 1 sur 2')).toBeInTheDocument()
  })
})
