import type { ComponentType, ReactNode } from 'react'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { ProgressProvider } from 'src/contexts/ProgressContext'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import './index.css'

interface AppProps {
  children?: ReactNode
}

// Cast nécessaire : incompatibilité de types entre FatalErrorPage (généré par RedwoodJS)
// et la signature attendue par FatalErrorBoundary dans cette version du framework.
const FatalErrorPageCast = FatalErrorPage as ComponentType<{ error?: Error }>

const App = ({ children }: AppProps) => (
  <FatalErrorBoundary page={FatalErrorPageCast}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>
        <ProgressProvider>{children}</ProgressProvider>
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
