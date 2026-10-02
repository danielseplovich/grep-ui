import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ComponentPage } from './pages/ComponentPage'
import { IntroPage } from './pages/IntroPage'
import { PrototypesIndexPage, PrototypePage } from './pages/PrototypesPage'
import { ComponentsIndexPage } from './pages/ComponentsIndexPage'
import { FoundationsIndexPage } from './pages/FoundationsIndexPage'
import { InstallationPage } from './pages/InstallationPage'
import { RulesPage, ContradictionsPage } from './pages/LibraryPages'
import { ColorPage } from './pages/foundations/ColorPage'
import { TypographyPage } from './pages/foundations/TypographyPage'
import { SpacingPage } from './pages/foundations/SpacingPage'
import { EffectsPage } from './pages/foundations/EffectsPage'

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/installation" element={<InstallationPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/contradictions" element={<ContradictionsPage />} />
        <Route path="/foundations" element={<FoundationsIndexPage />} />
        <Route path="/foundations/color" element={<ColorPage />} />
        <Route path="/foundations/typography" element={<TypographyPage />} />
        <Route path="/foundations/spacing" element={<SpacingPage />} />
        <Route path="/foundations/effects" element={<EffectsPage />} />
        <Route path="/components/:slug" element={<ComponentPage />} />
        <Route path="/components" element={<ComponentsIndexPage />} />
        <Route path="/prototypes" element={<PrototypesIndexPage />} />
        <Route path="/prototypes/:slug" element={<PrototypePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
