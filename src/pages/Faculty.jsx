import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, GraduationCap, Mail, Phone, Linkedin, User } from 'lucide-react'

const facultyData = [
  {
    id: 1,
    name: "Dr. Ramesh K. Patil",
    designation: "Professor & HOD",
    qualification: "Ph.D. in Power Systems",
    email: "hod.eee@tcegadag.ac.in",
    phone: "+91-9876543210",
    achievements: [
      "Published 50+ research papers in international journals",
      "Recipient of Best Teacher Award 2023",
      "Expert in Power System Analysis and Control",
      "Guided 15+ Ph.D. students"
    ],
    image: "👨‍🏫"
  },
  {
    id: 2,
    name: "Prof. Sunita M. Desai",
    designation: "Professor",
    qualification: "M.Tech. in Control Systems",
    email: "sunita.desai@tcegadag.ac.in",
    phone: "+91-9876543211",
    achievements: [
      "30+ years of teaching experience",
      "Published 25+ research papers",
      "Expert in Control Systems and Automation",
      "Member of IEEE"
    ],
    image: "👩‍🏫"
  },
  {
    id: 3,
    name: "Dr. Mahesh S. Kulkarni",
    designation: "Associate Professor",
    qualification: "Ph.D. in Power Electronics",
    email: "mahesh.kulkarni@tcegadag.ac.in",
    phone: "+91-9876543212",
    achievements: [
      "Expert in Power Electronics and Drives",
      "Published 20+ research papers",
      "Industry consultant for 10+ years",
      "Patent holder in Power Converters"
    ],
    image: "👨‍🔬"
  },
  {
    id: 4,
    name: "Prof. Priya N. Reddy",
    designation: "Assistant Professor",
    qualification: "M.Tech. in Electrical Machines",
    email: "priya.reddy@tcegadag.ac.in",
    phone: "+91-9876543213",
    achievements: [
      "Young Faculty Award 2022",
      "Published 10+ research papers",
      "Expert in Electrical Machines",
      "Active researcher in Renewable Energy"
    ],
    image: "👩‍💼"
  },
  {
    id: 5,
    name: "Dr. Anil K. Joshi",
    designation: "Associate Professor",
    qualification: "Ph.D. in Signal Processing",
    email: "anil.joshi@tcegadag.ac.in",
    phone: "+91-9876543214",
    achievements: [
      "Expert in Digital Signal Processing",
      "Published 18+ research papers",
      "IEEE Senior Member",
      "Consultant for DSP applications"
    ],
    image: "👨‍💻"
  },
  {
    id: 6,
    name: "Prof. Kavita R. Shetty",
    designation: "Assistant Professor",
    qualification: "M.Tech. in Microelectronics",
    email: "kavita.shetty@tcegadag.ac.in",
    phone: "+91-9876543215",
    achievements: [
      "Expert in VLSI Design",
      "Published 12+ research papers",
      "Active in industry collaborations",
      "Mentor for student projects"
    ],
    image: "👩‍🔧"
  }
]

const Faculty = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null)

  return (
    <div className="min-h-screen relative overflow-hidden py-8">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 electric-glow">
            Our Faculty
          </h1>
          <p className="text-xl text-gray-300">Meet our experienced and dedicated faculty members</p>
        </motion.div>

        {/* HOD Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-6 mb-8 max-w-4xl mx-auto border-2 border-circuit-gold"
        >
          <div className="flex items-center space-x-6">
            <div className="text-6xl">{facultyData[0].image}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-6 h-6 text-circuit-gold" />
                <span className="text-circuit-gold font-semibold">Head of Department</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{facultyData[0].name}</h2>
              <p className="text-xl text-gray-300 mb-4">{facultyData[0].designation}</p>
              <p className="text-gray-400 mb-4">{facultyData[0].qualification}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a href={`mailto:${facultyData[0].email}`} className="flex items-center space-x-2 text-electric-blue hover:text-circuit-gold">
                  <Mail className="w-4 h-4" />
                  <span>{facultyData[0].email}</span>
                </a>
                <a href={`tel:${facultyData[0].phone}`} className="flex items-center space-x-2 text-electric-blue hover:text-circuit-gold">
                  <Phone className="w-4 h-4" />
                  <span>{facultyData[0].phone}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyData.slice(1).map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setSelectedFaculty(faculty)}
              className="glass-effect rounded-xl p-6 cursor-pointer group"
            >
              <div className="text-5xl mb-4 text-center">{faculty.image}</div>
              <h3 className="text-xl font-bold mb-2 text-center">{faculty.name}</h3>
              <p className="text-electric-blue mb-2 text-center">{faculty.designation}</p>
              <p className="text-gray-400 text-sm mb-4 text-center">{faculty.qualification}</p>
              <div className="flex justify-center space-x-4">
                <a href={`mailto:${faculty.email}`} className="text-electric-blue hover:text-circuit-gold">
                  <Mail className="w-5 h-5" />
                </a>
                <a href={`tel:${faculty.phone}`} className="text-electric-blue hover:text-circuit-gold">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Faculty Detail Modal */}
        {selectedFaculty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedFaculty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{selectedFaculty.image}</div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedFaculty.name}</h2>
                    <p className="text-xl text-electric-blue mb-1">{selectedFaculty.designation}</p>
                    <p className="text-gray-400">{selectedFaculty.qualification}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center text-circuit-gold">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  <p className="text-gray-300">{selectedFaculty.email}</p>
                  <p className="text-gray-300">{selectedFaculty.phone}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-circuit-gold">
                    <Award className="w-5 h-5 mr-2" />
                    Achievements & Expertise
                  </h3>
                  <ul className="space-y-2">
                    {selectedFaculty.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-gray-300">
                        <span className="text-electric-blue mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Faculty

