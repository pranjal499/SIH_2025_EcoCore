import { useState } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp,
  Users,
  School,
  Crown,
  Star,
  Target,
  Calendar
} from 'lucide-react'

interface LeaderboardPageProps {
  userData: {
    name: string
    school?: string
  }
}

export function LeaderboardPage({ userData }: LeaderboardPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const globalLeaders = [
    {
      rank: 1,
      name: "Alex Chen",
      school: "Green Valley High",
      points: 12450,
      badges: 24,
      avatar: "AC",
      change: "+5",
      isCurrentUser: false
    },
    {
      rank: 2,
      name: "Maya Patel",
      school: "Eco Academy",
      points: 11890,
      badges: 22,
      avatar: "MP",
      change: "+2",
      isCurrentUser: false
    },
    {
      rank: 3,
      name: "Jordan Smith",
      school: "Riverside School",
      points: 11340,
      badges: 20,
      avatar: "JS",
      change: "-1",
      isCurrentUser: false
    },
    {
      rank: 4,
      name: userData.name,
      school: userData.school || "Your School",
      points: 10950,
      badges: 18,
      avatar: userData.name.split(' ').map(n => n[0]).join(''),
      change: "+3",
      isCurrentUser: true
    },
    {
      rank: 5,
      name: "Sam Johnson",
      school: "Mountain View High",
      points: 10720,
      badges: 17,
      avatar: "SJ",
      change: "-2",
      isCurrentUser: false
    }
  ]

  const schoolLeaders = [
    {
      rank: 1,
      name: "Greenwood Academy",
      totalPoints: 245600,
      students: 340,
      avgPoints: 722,
      change: "+2"
    },
    {
      rank: 2,
      name: "Eco International School",
      totalPoints: 198750,
      students: 280,
      avgPoints: 710,
      change: "+1"
    },
    {
      rank: 3,
      name: userData.school || "Your School",
      totalPoints: 187300,
      students: 265,
      avgPoints: 707,
      change: "-1",
      isCurrentSchool: true
    }
  ]

  const weeklyStats = [
    {
      title: "Points This Week",
      value: "1,240",
      change: "+15%",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Global Rank",
      value: "#4",
      change: "+3 positions",
      icon: Trophy,
      color: "text-primary"
    },
    {
      title: "School Rank", 
      value: "#1",
      change: "Unchanged",
      icon: School,
      color: "text-secondary"
    },
    {
      title: "Challenges Won",
      value: "3",
      change: "+2 this week",
      icon: Target,
      color: "text-accent"
    }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground font-bold text-sm">#{rank}</span>
    }
  }

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600'
    if (change.startsWith('-')) return 'text-red-600'
    return 'text-muted-foreground'
  }

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">Leaderboard 🏆</h1>
        <p className="text-muted-foreground">
          See how you rank among environmental champions worldwide
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weeklyStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
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
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      className="text-2xl font-bold text-foreground"
                    >
                      {stat.value}
                    </motion.div>
                    <p className={`text-sm ${getChangeColor(stat.change)}`}>
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Leaderboard Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="students" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="students" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Students
              </TabsTrigger>
              <TabsTrigger value="schools" className="flex items-center gap-2">
                <School className="w-4 h-4" />
                Schools
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Period:</span>
              <Button
                variant={selectedPeriod === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('week')}
              >
                Week
              </Button>
              <Button
                variant={selectedPeriod === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('month')}
              >
                Month
              </Button>
              <Button
                variant={selectedPeriod === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('all')}
              >
                All Time
              </Button>
            </div>
          </div>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Top Environmental Champions
                </CardTitle>
                <CardDescription>
                  Leading students making a difference through learning and action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {globalLeaders.map((leader, index) => (
                    <motion.div
                      key={leader.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        leader.isCurrentUser 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getRankIcon(leader.rank)}
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="" alt={leader.name} />
                          <AvatarFallback className={leader.isCurrentUser ? 'bg-primary text-primary-foreground' : ''}>
                            {leader.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-medium ${leader.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                            {leader.name}
                            {leader.isCurrentUser && (
                              <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                            )}
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{leader.school}</p>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{leader.points.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award className="w-3 h-3" />
                          <span>{leader.badges} badges</span>
                        </div>
                      </div>

                      <div className={`text-sm font-medium ${getChangeColor(leader.change)}`}>
                        {leader.change}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schools" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="w-5 h-5 text-secondary" />
                  Top Schools
                </CardTitle>
                <CardDescription>
                  Schools leading the way in environmental education
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schoolLeaders.map((school, index) => (
                    <motion.div
                      key={school.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        school.isCurrentSchool 
                          ? 'bg-secondary/10 border border-secondary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getRankIcon(school.rank)}
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                          school.isCurrentSchool ? 'from-secondary to-secondary/80' : 'from-muted to-muted/80'
                        } flex items-center justify-center`}>
                          <School className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-medium ${school.isCurrentSchool ? 'text-secondary' : 'text-foreground'}`}>
                            {school.name}
                            {school.isCurrentSchool && (
                              <Badge variant="secondary" className="ml-2 text-xs">Your School</Badge>
                            )}
                          </h4>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{school.students} students</span>
                          <span>Avg: {school.avgPoints} pts/student</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-medium text-foreground">
                          {school.totalPoints.toLocaleString()} pts
                        </div>
                        <div className={`text-sm ${getChangeColor(school.change)}`}>
                          {school.change}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Achievement Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle>Your Progress This Week</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+1,240</div>
                <p className="text-sm text-muted-foreground">Points Earned</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">+3</div>
                <p className="text-sm text-muted-foreground">Rank Improvement</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">2</div>
                <p className="text-sm text-muted-foreground">New Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}