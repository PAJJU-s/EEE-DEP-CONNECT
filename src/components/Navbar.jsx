import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, GraduationCap } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/faculty', label: 'Faculty', icon: '👨‍🏫' },
    { path: '/students', label: 'Students', icon: '👥' },
    { path: '/pyq', label: 'PYQ & Papers', icon: '📄' },
    { path: '/notes', label: 'Notes', icon: '📚' },
    { path: '/projects', label: 'Projects', icon: '🔬' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/achievements', label: 'Achievements', icon: '🏆' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-effect sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Zap className="w-8 h-8 text-electric-blue animate-pulse-slow" />
              <motion.div
                className="absolute inset-0 bg-electric-blue rounded-full opacity-20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold electric-glow">EEE Department</h1>
              <p className="text-xs text-gray-400">Tontadarya College of Engineering</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-electric-blue bg-blue-900/30'
                    : 'text-gray-300 hover:text-electric-blue hover:bg-blue-900/20'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-900/30"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-2"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'text-electric-blue bg-blue-900/30'
                      : 'text-gray-300 hover:text-electric-blue hover:bg-blue-900/20'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar

