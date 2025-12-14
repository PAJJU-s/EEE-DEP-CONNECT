import { useState } from 'react'
import { motion } from 'framer-motion'
import { FlaskConical, Rocket, Briefcase, Search, Filter, ExternalLink } from 'lucide-react'

const projectsData = [
  {
    id: 1,
    title: "Smart Grid Management System",
    type: "Major Project",
    students: ["Rahul Patil", "Priya Desai"],
    year: 2023,
    description: "IoT-based smart grid system for efficient power distribution and monitoring",
    technologies: ["IoT", "Python", "Arduino", "Cloud Computing"],
    status: "Completed"
  },
  {
    id: 2,
    title: "Solar Panel Efficiency Optimizer",
    type: "Major Project",
    students: ["Anil Reddy", "Sunita Shetty"],
    year: 2023,
    description: "MPPT-based solar panel optimization system for maximum power extraction",
    technologies: ["Power Electronics", "MPPT", "Microcontroller"],
    status: "Completed"
  },
  {
    id: 3,
    title: "Home Automation System",
    type: "Mini Project",
    students: ["Mahesh Kulkarni"],
    year: 2023,
    description: "Voice-controlled home automation using IoT and AI",
    technologies: ["IoT", "AI", "Raspberry Pi"],
    status: "In Progress"
  },
  {
    id: 4,
    title: "Electric Vehicle Charging Station",
    type: "Major Project",
    students: ["Kavita Joshi", "Vikram Naik"],
    year: 2022,
    description: "Design and implementation of fast charging station for EVs",
    technologies: ["Power Electronics", "Battery Management", "Control Systems"],
    status: "Completed"
  },
  {
    id: 5,
    title: "Power Quality Analyzer",
    type: "Mini Project",
    students: ["Sneha Kamath"],
    year: 2023,
    description: "Real-time power quality monitoring and analysis system",
    technologies: ["DSP", "Microcontroller", "Sensors"],
    status: "Completed"
  },
  {
    id: 6,
    title: "Wind Energy Conversion System",
    type: "Major Project",
    students: ["Rajesh Gowda", "Meera Rao"],
    year: 2022,
    description: "Efficient wind energy harvesting and grid integration",
    technologies: ["Power Electronics", "Control Systems", "Renewable Energy"],
    status: "Completed"
  },
  {
    id: 7,
    title: "Daily Work: LED Display Controller",
    type: "Daily Work",
    students: ["Arjun Bhat"],
    year: 2023,
    description: "Microcontroller-based LED matrix display controller",
    technologies: ["8051", "Embedded C"],
    status: "Completed"
  },
  {
    id: 8,
    title: "Daily Work: Temperature Monitoring",
    type: "Daily Work",
    students: ["Divya Hegde"],
    year: 2023,
    description: "IoT-based temperature monitoring system",
    technologies: ["IoT", "Sensors", "Arduino"],
    status: "Completed"
  },
  {
    id: 9,
    title: "Battery Management System",
    type: "Major Project",
    students: ["Rahul Patil", "Anil Reddy"],
    year: 2023,
    description: "Advanced BMS for lithium-ion batteries with safety features",
    technologies: ["Battery Technology", "Control Systems", "Safety"],
    status: "In Progress"
  },
  {
    id: 10,
    title: "Daily Work: Motor Speed Control",
    type: "Daily Work",
    students: ["Priya Desai"],
    year: 2023,
    description: "PWM-based DC motor speed control system",
    technologies: ["PWM", "Microcontroller", "Motor Control"],
    status: "Completed"
  }
]

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const types = ['All', 'Major Project', 'Mini Project', 'Daily Work']
  const statuses = ['All', 'Completed', 'In Progress']

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'All' || project.type === typeFilter
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeIcon = (type) => {
    if (type === 'Major Project') return <Rocket className="w-6 h-6" />
    if (type === 'Mini Project') return <FlaskConical className="w-6 h-6" />
    return <Briefcase className="w-6 h-6" />
  }

  const getTypeColor = (type) => {
    if (type === 'Major Project') return 'from-electric-blue to-voltage-purple'
    if (type === 'Mini Project') return 'from-circuit-gold to-current-orange'
    return 'from-power-green to-electric-blue'
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
            Projects Showcase
          </h1>
          <p className="text-xl text-gray-300">Explore student projects: Major, Mini, and Daily Works</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getTypeColor(project.type)} flex items-center justify-center mb-4`}>
                {getTypeIcon(project.type)}
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  project.type === 'Major Project' ? 'bg-electric-blue/20 text-electric-blue' :
                  project.type === 'Mini Project' ? 'bg-circuit-gold/20 text-circuit-gold' :
                  'bg-power-green/20 text-power-green'
                }`}>
                  {project.type}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  project.status === 'Completed' ? 'bg-power-green/20 text-power-green' : 'bg-current-orange/20 text-current-orange'
                }`}>
                  {project.status}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Students:</p>
                <p className="text-sm text-electric-blue">{project.students.join(', ')}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-800/50 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Year: {project.year}</span>
                <button className="text-electric-blue hover:text-circuit-gold flex items-center space-x-1">
                  <span>View Details</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">No projects found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Projects

