import Button from '@atlaskit/button'
import SectionMessage from '@atlaskit/section-message'

interface LessonCardProps {
  title: string
  description: string
  duration: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  completed?: boolean
  locked?: boolean
  onStart: () => void
}

const LessonCard = ({
  title,
  description,
  duration,
  difficulty,
  completed = false,
  locked = false,
  onStart,
}: LessonCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'text-green-600 bg-green-100'
      case 'Intermédiaire':
        return 'text-yellow-600 bg-yellow-100'
      case 'Avancé':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = () => {
    if (completed) return '✅'
    if (locked) return '🔒'
    return '▶️'
  }

  return (
    <div
      className={`
      rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-md
      ${completed ? 'border-green-200 bg-green-50' : ''}
      ${locked ? 'border-gray-200 bg-gray-50 opacity-60' : 'border-gray-200 bg-white hover:border-blue-200'}
    `}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getStatusIcon()}</span>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <div className="mt-1 flex items-center space-x-2">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(difficulty)}`}
              >
                {difficulty}
              </span>
              <span className="text-sm text-gray-500">{duration}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-4 leading-relaxed text-gray-600">{description}</p>

      {completed && (
        <SectionMessage appearance="success" title="Leçon terminée">
          Vous avez terminé cette leçon avec succès !
        </SectionMessage>
      )}

      {locked && (
        <SectionMessage appearance="information" title="Leçon verrouillée">
          Terminez les leçons précédentes pour débloquer celle-ci.
        </SectionMessage>
      )}

      <div className="mt-4">
        <Button
          appearance={completed ? 'subtle' : 'primary'}
          isDisabled={locked}
          onClick={onStart}
        >
          {completed ? 'Revoir' : locked ? 'Verrouillé' : 'Commencer'}
        </Button>
      </div>
    </div>
  )
}

export default LessonCard
