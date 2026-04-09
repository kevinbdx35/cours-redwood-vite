interface SimpleLessonCardProps {
  title: string
  description: string
  duration: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  completed?: boolean
  locked?: boolean
  onStart: () => void
}

const SimpleLessonCard = ({
  title,
  description,
  duration,
  difficulty,
  completed = false,
  locked = false,
  onStart,
}: SimpleLessonCardProps) => {
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
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-green-400">✓</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Leçon terminée
              </p>
              <p className="text-sm text-green-700">
                Vous avez terminé cette leçon avec succès !
              </p>
            </div>
          </div>
        </div>
      )}

      {locked && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-blue-400">ℹ</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">
                Leçon verrouillée
              </p>
              <p className="text-sm text-blue-700">
                Terminez les leçons précédentes pour débloquer celle-ci.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          className={`
            rounded-lg px-4 py-2 font-medium transition-colors
            ${
              completed
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : locked
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
          disabled={locked}
          onClick={onStart}
        >
          {completed ? 'Revoir' : locked ? 'Verrouillé' : 'Commencer'}
        </button>
      </div>
    </div>
  )
}

export default SimpleLessonCard
