import AppLayout from '@cloudscape-design/components/app-layout'
import SideNavigation from '@cloudscape-design/components/side-navigation'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import ClusterDetailsPage from './pages/ClusterDetailsPage'
import ProjectFormPage from './pages/ProjectFormPage'
import ProjectWizardPage from './pages/ProjectWizardPage'
import ResourcesPage from './pages/ResourcesPage'

function Shell() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <AppLayout
      toolsHide
      navigation={
        <SideNavigation
          activeHref={location.pathname}
          header={{ href: '/resources', text: 'Cloudscape Preview' }}
          items={[
            { type: 'link', text: 'Resources Table', href: '/resources' },
            { type: 'link', text: 'Create Project Form', href: '/projects/new' },
            { type: 'link', text: 'Policy Wizard', href: '/policies/wizard' },
            { type: 'link', text: 'Cluster Details', href: '/clusters/details' },
          ]}
          onFollow={(event) => {
            if (!event.detail.external) {
              event.preventDefault()
              navigate(event.detail.href)
            }
          }}
        />
      }
      content={
        <Routes>
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/projects/new" element={<ProjectFormPage />} />
          <Route path="/policies/wizard" element={<ProjectWizardPage />} />
          <Route path="/clusters/details" element={<ClusterDetailsPage />} />
          <Route path="*" element={<Navigate to="/resources" replace />} />
        </Routes>
      }
    />
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
