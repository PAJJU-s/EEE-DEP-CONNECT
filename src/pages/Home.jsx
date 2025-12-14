import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, BookOpen, Award, Users, Calendar, FileText, Lightbulb } from 'lucide-react'

const quotes = [
  "Electricity is really just organized lightning. - George Carlin",
  "The best way to predict the future is to invent it. - Alan Kay",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "Engineering is the closest thing to magic that exists in the world. - Elon Musk",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Electricity is the power that transforms dreams into reality.",
  "In the world of electronics, every problem has a solution waiting to be discovered.",
  "Engineering is not just about building things, it's about building the future.",
]

const formulas = [
  { name: "Ohm's Law", formula: "V = I × R", desc: "Voltage = Current × Resistance" },
  { name: "Power", formula: "P = V × I", desc: "Power = Voltage × Current" },
  { name: "Energy", formula: "E = P × t", desc: "Energy = Power × Time" },
  { name: "Resistance (Series)", formula: "R = R₁ + R₂ + ...", desc: "Total resistance in series" },
  { name: "Resistance (Parallel)", formula: "1/R = 1/R₁ + 1/R₂ + ...", desc: "Total resistance in parallel" },
  { name: "Capacitance (Series)", formula: "1/C = 1/C₁ + 1/C₂ + ...", desc: "Total capacitance in series" },
  { name: "Capacitance (Parallel)", formula: "C = C₁ + C₂ + ...", desc: "Total capacitance in parallel" },
  { name: "Inductive Reactance", formula: "X_L = 2πfL", desc: "Reactance of inductor" },
  { name: "Capacitive Reactance", formula: "X_C = 1/(2πfC)", desc: "Reactance of capacitor" },
  { name: "Impedance", formula: "Z = √(R² + (X_L - X_C)²)", desc: "Total impedance" },
]

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [currentFormula, setCurrentFormula] = useState(0)

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 5000)

    const formulaInterval = setInterval(() => {
      setCurrentFormula((prev) => (prev + 1) % formulas.length)
    }, 4000)

    return () => {
      clearInterval(quoteInterval)
      clearInterval(formulaInterval)
    }
  }, [])

  const features = [
    { icon: <FileText className="w-8 h-8" />, title: "PYQ & Papers", desc: "Previous year question papers", color: "electric-blue" },
    { icon: <BookOpen className="w-8 h-8" />, title: "Study Notes", desc: "Comprehensive study materials", color: "circuit-gold" },
    { icon: <Users className="w-8 h-8" />, title: "Faculty Info", desc: "Meet our expert faculty", color: "voltage-purple" },
    { icon: <Award className="w-8 h-8" />, title: "Achievements", desc: "Student & faculty achievements", color: "power-green" },
    { icon: <Calendar className="w-8 h-8" />, title: "Calendar", desc: "Holidays & important dates", color: "current-orange" },
    { icon: <Zap className="w-8 h-8" />, title: "Projects", desc: "Mini & major projects showcase", color: "electric-blue" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 via-transparent to-voltage-purple/10"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 electric-glow"
            animate={{ textShadow: [
              "0 0 10px rgba(0, 102, 255, 0.8)",
              "0 0 20px rgba(0, 102, 255, 0.8), 0 0 30px rgba(123, 44, 191, 0.6)",
              "0 0 10px rgba(0, 102, 255, 0.8)"
            ] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Electrical & Electronics
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-gray-300 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Engineering Department
          </motion.p>
          <p className="text-lg text-gray-400">Tontadarya College of Engineering, Gadag</p>
        </motion.div>

        {/* Daily Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto"
        >
          <div className="flex items-start space-x-4">
            <Lightbulb className="w-8 h-8 text-circuit-gold flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-3 text-circuit-gold">Daily Inspiration</h2>
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg text-gray-200 italic"
              >
                "{currentQuote}"
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-xl p-6 cursor-pointer group"
            >
              <div className={`text-${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Important Formulas - Fixed Corner */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-6 right-6 w-80 glass-effect rounded-xl p-4 shadow-2xl z-50 hidden lg:block"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-electric-blue flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Important Formulas
            </h3>
            <div className="flex space-x-1">
              {formulas.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === currentFormula ? 'bg-electric-blue' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <motion.div
            key={currentFormula}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-l-4 border-electric-blue pl-4"
          >
            <h4 className="font-semibold text-circuit-gold mb-1">
              {formulas[currentFormula].name}
            </h4>
            <p className="text-2xl font-mono text-electric-blue mb-1">
              {formulas[currentFormula].formula}
            </p>
            <p className="text-sm text-gray-400">
              {formulas[currentFormula].desc}
            </p>
          </motion.div>
        </motion.div>

        {/* Mobile Formulas Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:hidden glass-effect rounded-xl p-6 mt-8"
        >
          <h3 className="text-xl font-semibold text-electric-blue mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2" />
            Important Formulas
          </h3>
          <div className="space-y-4">
            {formulas.slice(0, 3).map((formula, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-l-4 border-electric-blue pl-4"
              >
                <h4 className="font-semibold text-circuit-gold mb-1">{formula.name}</h4>
                <p className="text-xl font-mono text-electric-blue mb-1">{formula.formula}</p>
                <p className="text-sm text-gray-400">{formula.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home

