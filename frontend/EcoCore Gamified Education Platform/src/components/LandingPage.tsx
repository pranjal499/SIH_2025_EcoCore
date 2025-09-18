import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import Logo from '../../public/Logo.png'
import { 
  Leaf, 
  Users, 
  Award, 
  Target,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with comprehensive environmental modules designed for all learning styles."
    },
    {
      icon: Award,
      title: "Gamified Experience", 
      description: "Earn points, unlock badges, and climb leaderboards while learning about the environment."
    },
    {
      icon: Target,
      title: "Real-World Challenges",
      description: "Apply your knowledge through practical environmental action challenges."
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with classmates, teachers, and environmental experts globally."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and insights."
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "See how your actions contribute to real environmental change."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Schools Participating" },
    { number: "50+", label: "Environmental Topics" },
    { number: "1M+", label: "Points Earned" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          {/* <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">EcoCore</span>
          </div> */}


          <div>
            <img src={Logo} alt="" className="h-10"/>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <Button onClick={onGetStarted} className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </motion.nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
              >
                Transform Environmental 
                <span className="text-primary"> Education</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-lg"
              >
                Gamified learning platform that bridges the gap between environmental theory and real-world action through interactive challenges and community engagement.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 group"
              >
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 group"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1611000307564-b43c911a2b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwZWR1Y2F0aW9uJTIwbmF0dXJlJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzU4MDk0MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Environmental education in nature"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -left-4 bg-white rounded-lg p-4 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Live Challenge</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Badge Earned!</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose EcoCore?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with proven educational methods to create an engaging environmental learning experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Environmental Journey?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students, teachers, and environmental advocates who are making a difference through education and action.
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-border">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-foreground">EcoCore</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Transforming environmental education through gamification and real-world action.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">For Students</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">For Teachers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">For NGOs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 EcoCore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}