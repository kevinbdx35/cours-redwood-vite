import { render, screen, fireEvent, act } from '@redwoodjs/testing/web'

import CodeEditor from './CodeEditor'

const defaultProps = {
  initialCode: '// Votre code ici',
  expectedOutput: 'Welcome to RedwoodJS!',
  lesson: 'intro',
}

describe('CodeEditor', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("affiche le code initial dans l'éditeur", () => {
    render(<CodeEditor {...defaultProps} />)

    const textarea = screen.getByRole('textbox', { name: /éditeur de code/i })
    expect(textarea).toHaveValue('// Votre code ici')
  })

  it('met à jour le code lors de la saisie', () => {
    render(<CodeEditor {...defaultProps} />)

    const textarea = screen.getByRole('textbox', { name: /éditeur de code/i })
    fireEvent.change(textarea, { target: { value: 'nouveau code' } })

    expect(textarea).toHaveValue('nouveau code')
  })

  it('affiche le compteur de caractères', () => {
    render(<CodeEditor {...defaultProps} />)

    expect(screen.getByText(/\/5000/)).toBeInTheDocument()
  })

  it("affiche une erreur si le code est vide au moment d'exécuter", async () => {
    render(<CodeEditor {...defaultProps} initialCode="" />)

    fireEvent.click(screen.getByRole('button', { name: /exécuter/i }))

    expect(
      screen.getByText('Le code ne peut pas être vide.')
    ).toBeInTheDocument()
  })

  it('valide le code correct pour la leçon intro', async () => {
    const onValidate = jest.fn()
    render(
      <CodeEditor
        {...defaultProps}
        initialCode={`<div className="welcome-container">Welcome to RedwoodJS!</div>`}
        onValidate={onValidate}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /exécuter/i }))

    await act(async () => {
      jest.advanceTimersByTime(1500)
    })

    expect(onValidate).toHaveBeenCalledWith(true)
    expect(screen.getByText('Excellent !')).toBeInTheDocument()
  })

  it('remet le code initial après reset', async () => {
    render(<CodeEditor {...defaultProps} />)

    const textarea = screen.getByRole('textbox', { name: /éditeur de code/i })
    fireEvent.change(textarea, { target: { value: 'code modifié' } })

    fireEvent.click(screen.getByRole('button', { name: /reset/i }))

    expect(textarea).toHaveValue(defaultProps.initialCode)
  })

  it('refuse le code dépassant 5000 caractères', () => {
    render(<CodeEditor {...defaultProps} />)

    const textarea = screen.getByRole('textbox', { name: /éditeur de code/i })
    const longCode = 'a'.repeat(5001)

    fireEvent.change(textarea, { target: { value: longCode } })

    expect(
      screen.getByText(/ne peut pas dépasser 5000 caractères/)
    ).toBeInTheDocument()
    // Le code ne doit pas avoir changé
    expect(textarea).toHaveValue(defaultProps.initialCode)
  })
})
