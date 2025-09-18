import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LandingPage } from './components/LandingPage'
import { AuthFlow } from './components/AuthFlow'
import { Navigation } from './components/Navigation'
import { StudentDashboard } from './components/StudentDashboard'
import { QuizPage } from './components/QuizPage'
import { LeaderboardPage } from './components/LeaderboardPage'
import { Toaster } from './components/ui/sonner'

interface UserData {
  name: string
  email: string
  role: 'student' | 'teacher' | 'ngo'
  school?: string
  grade?: string
  organization?: string
}

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'app'>('landing')
  const [currentPage, setCurrentPage] = useState<string>('dashboard')
  const [userData, setUserData] = useState<UserData | null>(null)

  const handleAuthComplete = (data: UserData) => {
    setUserData(data)
    setCurrentView('app')
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setUserData(null)
    setCurrentView('landing')
    setCurrentPage('dashboard')
  }

  const renderCurrentPage = () => {
    if (!userData) return null

    switch (currentPage) {
      case 'dashboard':
        if (userData.role === 'student') {
          return <StudentDashboard userData={userData} onNavigate={setCurrentPage} />
        }
        // Add teacher and NGO dashboards here
        return <StudentDashboard userData={userData} onNavigate={setCurrentPage} />
      
      case 'quiz':
        return <QuizPage onBack={() => setCurrentPage('dashboard')} />
      
      case 'leaderboard':
        return <LeaderboardPage userData={userData} />
      
      case 'learn':
        // Learning hub component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Learning Hub</h1>
            <p className="text-muted-foreground">Interactive learning modules coming soon...</p>
          </div>
        )
      
      case 'challenges':
        // Challenges component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Environmental Challenges</h1>
            <p className="text-muted-foreground">Real-world action challenges coming soon...</p>
          </div>
        )
      
      case 'profile':
        // Profile component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Profile</h1>
            <p className="text-muted-foreground">User profile and achievements coming soon...</p>
          </div>
        )
      
      case 'classroom':
        // Teacher classroom component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">My Classroom</h1>
            <p className="text-muted-foreground">Classroom management coming soon...</p>
          </div>
        )
      
      case 'content':
        // Content library component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Content Library</h1>
            <p className="text-muted-foreground">Educational content management coming soon...</p>
          </div>
        )
      
      case 'analytics':
        // Analytics component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Analytics</h1>
            <p className="text-muted-foreground">Student progress analytics coming soon...</p>
          </div>
        )
      
      case 'activities':
        // NGO activities component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Environmental Activities</h1>
            <p className="text-muted-foreground">Activity coordination coming soon...</p>
          </div>
        )
      
      case 'community':
        // Community component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Community</h1>
            <p className="text-muted-foreground">Community features coming soon...</p>
          </div>
        )
      
      case 'settings':
        // Settings component would go here
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Settings</h1>
            <p className="text-muted-foreground">Account settings coming soon...</p>
          </div>
        )
      
      default:
        return <StudentDashboard userData={userData} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onGetStarted={() => setCurrentView('auth')} />
          </motion.div>
        )}
        
        {currentView === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <AuthFlow 
              onComplete={handleAuthComplete}
              onBack={() => setCurrentView('landing')}
            />
          </motion.div>
        )}
        
        {currentView === 'app' && userData && (
          <motion.div
            key="app"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-screen"
          >
            <Navigation 
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              userRole={userData.role}
              onLogout={handleLogout}
            />
            
            <main className="flex-1 lg:ml-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-screen"
                >
                  {renderCurrentPage()}
                </motion.div>
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Toaster />
    </div>
  )
}