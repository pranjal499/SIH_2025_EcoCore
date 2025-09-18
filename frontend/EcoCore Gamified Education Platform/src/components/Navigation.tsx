import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Logo from "../../public/Logo.png"
import { 
  Menu, 
  Home, 
  BookOpen, 
  Award, 
  Users, 
  Target,
  User,
  Settings,
  LogOut
} from 'lucide-react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  userRole: 'student' | 'teacher' | 'ngo' | null
  onLogout: () => void
}

export function Navigation({ currentPage, onPageChange, userRole, onLogout }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getNavItems = () => {
    if (!userRole) return []
    
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ]

    switch (userRole) {
      case 'student':
        return [
          ...commonItems,
          { id: 'learn', label: 'Learning Hub', icon: BookOpen },
          { id: 'quiz', label: 'Quizzes', icon: Target },
          { id: 'challenges', label: 'Challenges', icon: Award },
          { id: 'leaderboard', label: 'Leaderboard', icon: Users },
          { id: 'profile', label: 'Profile', icon: User }
        ]
      case 'teacher':
        return [
          ...commonItems,
          { id: 'classroom', label: 'My Classroom', icon: Users },
          { id: 'content', label: 'Content Library', icon: BookOpen },
          { id: 'analytics', label: 'Analytics', icon: Target },
          { id: 'profile', label: 'Profile', icon: User }
        ]
      case 'ngo':
        return [
          ...commonItems,
          { id: 'activities', label: 'Activities', icon: Target },
          { id: 'community', label: 'Community', icon: Users },
          { id: 'profile', label: 'Profile', icon: User }
        ]
      default:
        return commonItems
    }
  }

  const navItems = getNavItems()

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          {/* <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">E</span>
          </div>
          <span className="text-xl font-semibold text-foreground">EcoCore</span> */}
          <div>
            <img src={Logo} alt="" className="h-10"/>
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-12 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => {
                    onPageChange(item.id)
                    setIsOpen(false)
                  }}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-muted-foreground hover:text-foreground"
          onClick={() => {
            onPageChange('settings')
            setIsOpen(false)
          }}
        >
          <Settings className="w-5 h-5" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => {
            onLogout()
            setIsOpen(false)
          }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  )

  if (!userRole) return null

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-card lg:border-r lg:border-border">
        <NavContent />
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-card border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">E</span>
            </div>
            <span className="text-xl font-semibold text-foreground">EcoCore</span>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}