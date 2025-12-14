import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Trophy, Star, Crown, Medal, Users, Calendar } from 'lucide-react'

const studentOfMonth = [
  {
    id: 1,
    name: "Rahul S. Patil",
    month: "December 2023",
    achievement: "Outstanding performance in Power Systems project and excellent academic results",
    postedBy: "Dr. Ramesh K. Patil (HOD)",
    image: "👨‍🎓"
  },
  {
    id: 2,
    name: "Priya M. Desai",
    month: "November 2023",
    achievement: "Excellence in research work and innovation in renewable energy systems",
    postedBy: "Prof. Sunita M. Desai",
    image: "👩‍🎓"
  },
  {
    id: 3,
    name: "Anil K. Reddy",
    month: "October 2023",
    achievement: "Best project presentation and leadership in technical events",
    postedBy: "Dr. Mahesh S. Kulkarni",
    image: "👨‍🎓"
  }
]

const studentAchievements = [
  {
    id: 1,
    student: "Rahul S. Patil",
    achievement: "First Prize in National Level Technical Symposium",
    event: "TechFest 2023",
    date: "2023-11-15",
    category: "Competition"
  },
  {
    id: 2,
    student: "Priya M. Desai",
    achievement: "Best Paper Award at IEEE Conference",
    event: "IEEE Power & Energy Conference",
    date: "2023-10-20",
    category: "Research"
  },
  {
    id: 3,
    student: "Anil K. Reddy",
    achievement: "Winner - Circuit Design Competition",
    event: "ElectroTech 2023",
    date: "2023-09-10",
    category: "Competition"
  },
  {
    id: 4,
    student: "Sunita R. Shetty",
    achievement: "Published Research Paper in International Journal",
    event: "Journal of Power Electronics",
    date: "2023-08-05",
    category: "Research"
  },
  {
    id: 5,
    student: "Mahesh N. Kulkarni",
    achievement: "Best Project Award - Smart Grid System",
    event: "Project Expo 2023",
    date: "2023-07-22",
    category: "Project"
  },
  {
    id: 6,
    student: "Kavita S. Joshi",
    achievement: "First Place - Hackathon on IoT",
    event: "IoT Hackathon 2023",
    date: "2023-06-18",
    category: "Competition"
  },
  {
    id: 7,
    student: "Vikram P. Naik",
    achievement: "Best Presentation Award",
    event: "Student Technical Conference",
    date: "2023-05-12",
    category: "Presentation"
  },
  {
    id: 8,
    student: "Sneha A. Kamath",
    achievement: "Innovation Award - Power Quality Analyzer",
    event: "Innovation Fest 2023",
    date: "2023-04-08",
    category: "Innovation"
  }
]

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Competition', 'Research', 'Project', 'Presentation', 'Innovation']

  const filteredAchievements = studentAchievements.filter(achievement => {
    return selectedCategory === 'All' || achievement.category === selectedCategory
  })

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Competition': return <Trophy className="w-5 h-5" />
      case 'Research': return <Star className="w-5 h-5" />
      case 'Project': return <Award className="w-5 h-5" />
      case 'Presentation': return <Medal className="w-5 h-5" />
      case 'Innovation': return <Crown className="w-5 h-5" />
      default: return <Award className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Competition': return 'text-circuit-gold bg-circuit-gold/20'
      case 'Research': return 'text-electric-blue bg-electric-blue/20'
      case 'Project': return 'text-power-green bg-power-green/20'
      case 'Presentation': return 'text-voltage-purple bg-voltage-purple/20'
      case 'Innovation': return 'text-current-orange bg-current-orange/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-8">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 electric-glow">
            Achievements & Recognition
          </h1>
          <p className="text-xl text-gray-300">Celebrating excellence and accomplishments</p>
        </motion.div>

        {/* Student of the Month Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center text-circuit-gold">
            <Crown className="w-8 h-8 mr-3" />
            Student of the Month
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentOfMonth.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-xl p-6 border-2 border-circuit-gold/50"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{student.image}</div>
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="w-6 h-6 text-circuit-gold mr-2" />
                    <span className="text-circuit-gold font-semibold">{student.month}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{student.name}</h3>
                </div>
                <p className="text-gray-300 mb-4 text-center">{student.achievement}</p>
                <div className="text-sm text-gray-400 text-center">
                  <p>Posted by:</p>
                  <p className="text-electric-blue font-semibold">{student.postedBy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-3xl font-bold mb-4 md:mb-0 flex items-center text-electric-blue">
              <Trophy className="w-8 h-8 mr-3" />
              Student Achievements
            </h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-electric-blue text-white'
                      : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${getCategoryColor(achievement.category)}`}>
                    {getCategoryIcon(achievement.category)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(achievement.category)}`}>
                    {achievement.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{achievement.achievement}</h3>
                <p className="text-electric-blue mb-2 font-semibold">{achievement.student}</p>
                <p className="text-gray-400 text-sm mb-2">{achievement.event}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(achievement.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-400">No achievements found in this category</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Achievements

