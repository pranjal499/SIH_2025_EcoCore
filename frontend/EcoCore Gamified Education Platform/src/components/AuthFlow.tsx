import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Users, 
  Heart,
  GraduationCap,
  ChevronRight
} from 'lucide-react'

interface AuthFlowProps {
  onComplete: (userData: { 
    name: string
    email: string
    role: 'student' | 'teacher' | 'ngo'
    school?: string
    grade?: string
    organization?: string
  }) => void
  onBack: () => void
}

export function AuthFlow({ onComplete, onBack }: AuthFlowProps) {
  const [step, setStep] = useState(1)
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'student' | 'teacher' | 'ngo' | '',
    school: '',
    grade: '',
    organization: ''
  })

  const roles = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Learn and participate in environmental challenges',
      icon: GraduationCap,
      color: 'from-primary to-primary/80'
    },
    {
      id: 'teacher' as const,
      title: 'Teacher',
      description: 'Manage classrooms and track student progress',
      icon: Users,
      color: 'from-secondary to-secondary/80'
    },
    {
      id: 'ngo' as const,
      title: 'NGO Volunteer',
      description: 'Guide real-world environmental activities',
      icon: Heart,
      color: 'from-accent to-accent/80'
    }
  ]

  const handleRoleSelect = (role: 'student' | 'teacher' | 'ngo') => {
    setFormData(prev => ({ ...prev, role }))
    setStep(3)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.role) {
      onComplete(formData)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Welcome to EcoCore</h2>
              <p className="text-muted-foreground">Choose how you'd like to continue</p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => {
                  setIsLogin(false)
                  setStep(2)
                }}
                className="w-full h-14 text-left justify-between group"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Create Account</div>
                  <div className="text-sm text-muted-foreground">Join the environmental learning community</div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={() => {
                  setIsLogin(true)
                  setStep(2)
                }}
                className="w-full h-14 text-left justify-between group"
                variant="outline"
              >
                <div>
                  <div className="font-medium">Sign In</div>
                  <div className="text-sm text-muted-foreground">Continue your learning journey</div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )

      case 2:
        if (isLogin) {
          return (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to continue your journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value: 'student' | 'teacher' | 'ngo') => setFormData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="ngo">NGO Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={!formData.email || !formData.password || !formData.role}>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>
          )
        }

        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Choose Your Role</h2>
              <p className="text-muted-foreground">Select how you'll use EcoCore</p>
            </div>

            <div className="grid gap-4">
              {roles.map((role, index) => {
                const Icon = role.icon
                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      onClick={() => handleRoleSelect(role.id)}
                      className="w-full h-20 p-4 text-left justify-start group relative overflow-hidden"
                      variant="outline"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{role.title}</div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Complete Your Profile</h2>
              <p className="text-muted-foreground">Tell us a bit about yourself</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              {formData.role === 'student' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="school">School</Label>
                    <Input
                      id="school"
                      placeholder="Enter your school name"
                      value={formData.school}
                      onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>Grade {i + 1}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {formData.role === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    placeholder="Enter your school name"
                    value={formData.school}
                    onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                  />
                </div>
              )}

              {formData.role === 'ngo' && (
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    placeholder="Enter your organization name"
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={!formData.name || !formData.email || !formData.password}>
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            {step > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep(step - 1)}
                className="h-8 w-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            {step === 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i <= step ? 'bg-primary' : 'bg-muted'
                  } ${i === step ? 'scale-125' : ''}`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}