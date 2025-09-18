import { motion } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { 
  BookOpen, 
  Award, 
  Target, 
  TrendingUp,
  Users,
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  Trophy,
  Flame
} from 'lucide-react'

interface StudentDashboardProps {
  userData: {
    name: string
    school?: string
    grade?: string
  }
  onNavigate: (page: string) => void
}

export function StudentDashboard({ userData, onNavigate }: StudentDashboardProps) {
  const stats = [
    {
      title: "Eco Points",
      value: "2,450",
      change: "+120 this week",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Badges Earned",
      value: "12",
      change: "+3 this month",
      icon: Award,
      color: "text-primary"
    },
    {
      title: "Challenges Complete",
      value: "8",
      change: "+2 this week",
      icon: Target,
      color: "text-secondary"
    },
    {
      title: "Learning Streak",
      value: "15 days",
      change: "Keep it up!",
      icon: Flame,
      color: "text-accent"
    }
  ]

  const recentBadges = [
    { name: "Recycling Champion", icon: "♻️", earned: "2 days ago" },
    { name: "Energy Saver", icon: "⚡", earned: "1 week ago" },
    { name: "Water Guardian", icon: "💧", earned: "2 weeks ago" }
  ]

  const currentChallenges = [
    {
      title: "Plant a Tree Challenge",
      description: "Document planting and caring for a tree",
      progress: 75,
      deadline: "3 days left",
      points: 500
    },
    {
      title: "Plastic-Free Week",
      description: "Go a full week without single-use plastics",
      progress: 40,
      deadline: "5 days left", 
      points: 300
    }
  ]

  const learningModules = [
    {
      title: "Climate Change Basics",
      progress: 85,
      lessons: 8,
      completed: 7,
      thumbnail: "🌍"
    },
    {
      title: "Renewable Energy",
      progress: 60,
      lessons: 6,
      completed: 4,
      thumbnail: "☀️"
    },
    {
      title: "Biodiversity & Ecosystems",
      progress: 30,
      lessons: 10,
      completed: 3,
      thumbnail: "🦋"
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {userData.name.split(' ')[0]}! 🌱
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your environmental learning journey?
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <motion.div 
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                      className="text-2xl font-bold text-foreground"
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Learning */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Continue Learning
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate('learn')}
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningModules.map((module, index) => (
                  <motion.div
                    key={module.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => onNavigate('learn')}
                  >
                    <div className="text-2xl">{module.thumbnail}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {module.title}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {module.completed}/{module.lessons} lessons
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={module.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          {module.progress}% complete
                        </p>
                      </div>
                    </div>
                    <Play className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Challenges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    Active Challenges
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate('challenges')}
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => onNavigate('challenges')}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {challenge.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-primary">
                        {challenge.points} points
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{challenge.deadline}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBadges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.earned}</p>
                    </div>
                  </motion.div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => onNavigate('profile')}
                >
                  View All Badges
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start gap-3" 
                  onClick={() => onNavigate('quiz')}
                >
                  <Target className="w-4 h-4" />
                  Take a Quiz
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3"
                  onClick={() => onNavigate('leaderboard')}
                >
                  <Users className="w-4 h-4" />
                  View Leaderboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3"
                  onClick={() => onNavigate('challenges')}
                >
                  <Award className="w-4 h-4" />
                  Browse Challenges
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Streak */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-accent" />
                  Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-foreground">15</div>
                  <p className="text-sm text-muted-foreground">Days in a row!</p>
                  <p className="text-xs text-muted-foreground">
                    Keep learning daily to maintain your streak
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}