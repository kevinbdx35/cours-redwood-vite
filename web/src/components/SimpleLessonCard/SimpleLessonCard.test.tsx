import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import SimpleLessonCard from './SimpleLessonCard'

const defaultProps = {
  title: 'Introduction à RedwoodJS',
  description: 'Apprenez les bases de RedwoodJS',
  duration: '15 min',
  difficulty: 'Débutant' as const,
  onStart: jest.fn(),
}

describe('SimpleLessonCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('affiche les informations de la leçon', () => {
    render(<SimpleLessonCard {...defaultProps} />)

    expect(screen.getByText('Introduction à RedwoodJS')).toBeInTheDocument()
    expect(
      screen.getByText('Apprenez les bases de RedwoodJS')
    ).toBeInTheDocument()
    expect(screen.getByText('15 min')).toBeInTheDocument()
    expect(screen.getByText('Débutant')).toBeInTheDocument()
  })

  it('affiche le bouton "Commencer" par défaut', () => {
    render(<SimpleLessonCard {...defaultProps} />)

    expect(
      screen.getByRole('button', { name: /commencer/i })
    ).toBeInTheDocument()
  })

  it('appelle onStart au clic sur "Commencer"', () => {
    render(<SimpleLessonCard {...defaultProps} />)

    fireEvent.click(screen.getByRole('button', { name: /commencer/i }))
    expect(defaultProps.onStart).toHaveBeenCalledTimes(1)
  })

  it('affiche "Revoir" quand la leçon est terminée', () => {
    render(<SimpleLessonCard {...defaultProps} completed />)

    expect(screen.getByRole('button', { name: /revoir/i })).toBeInTheDocument()
    expect(screen.getByText('Leçon terminée')).toBeInTheDocument()
  })

  it('affiche "Verrouillé" quand la leçon est verrouillée', () => {
    render(<SimpleLessonCard {...defaultProps} locked />)

    const button = screen.getByRole('button', { name: /verrouillé/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('ne déclenche pas onStart quand la leçon est verrouillée', () => {
    render(<SimpleLessonCard {...defaultProps} locked />)

    fireEvent.click(screen.getByRole('button', { name: /verrouillé/i }))
    expect(defaultProps.onStart).not.toHaveBeenCalled()
  })

  it('applique le bon badge de difficulté pour "Intermédiaire"', () => {
    render(<SimpleLessonCard {...defaultProps} difficulty="Intermédiaire" />)

    expect(screen.getByText('Intermédiaire')).toBeInTheDocument()
  })

  it('applique le bon badge de difficulté pour "Avancé"', () => {
    render(<SimpleLessonCard {...defaultProps} difficulty="Avancé" />)

    expect(screen.getByText('Avancé')).toBeInTheDocument()
  })
})
