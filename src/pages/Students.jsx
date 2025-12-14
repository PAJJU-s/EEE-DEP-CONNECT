import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, GraduationCap, Calendar, BookOpen, Loader } from 'lucide-react'
import { studentsAPI } from '../services/api'

// Initial students data (for first-time initialization)
const initialStudentsData = [
  { id: 1, name: "Prajwal Haggad", year: 2024, scheme: "2022", semester: 3, usn: "2TG24EE013" },
  { id: 2, name: "Rahul S. Patil", year: 2022, scheme: "2022", semester: 4, usn: "4TG22EE001" },
  { id: 3, name: "Priya M. Desai", year: 2023, scheme: "2023", semester: 2, usn: "4TG23EE002" },
  { id: 4, name: "Hitesh K. Reddy", year: 2021, scheme: "2021", semester: 6, usn: "4TG21EE003" },
  { id: 5, name: "Sunita R. Shetty", year: 2022, scheme: "2022", semester: 4, usn: "4TG22EE004" },
  { id: 6, name: "Mahesh N. Kulkarni", year: 2020, scheme: "2020", semester: 8, usn: "4TG20EE001" },
  { id: 7, name: "Kavita S. Joshi", year: 2023, scheme: "2023", semester: 2, usn: "4TG23EE003" },
  { id: 8, name: "Vikram P. Naik", year: 2021, scheme: "2021", semester: 6, usn: "4TG21EE004" },
  { id: 9, name: "Sneha A. Kamath", year: 2022, scheme: "2022", semester: 4, usn: "4TG22EE005" },
  { id: 10, name: "Rajesh B. Gowda", year: 2020, scheme: "2020", semester: 8, usn: "4TG20EE002" },
  { id: 11, name: "Meera C. Rao", year: 2023, scheme: "2023", semester: 2, usn: "4TG23EE004" },
  { id: 12, name: "Arjun D. Bhat", year: 2021, scheme: "2021", semester: 6, usn: "4TG21EE005" },
  { id: 13, name: "Divya E. Hegde", year: 2022, scheme: "2022", semester: 4, usn: "4TG22EE006" },
  { id: 14, name: "Suresh F. Kumar", year: 2020, scheme: "2020", semester: 8, usn: "4TG20EE003" },
  { id: 15, name: "Lakshmi G. Nair", year: 2023, scheme: "2023", semester: 2, usn: "4TG23EE005" },
  { id: 16, name: "Rohit H. Sharma", year: 2021, scheme: "2021", semester: 6, usn: "4TG21EE006" },
  { id: 17, name: "Ananya I. Iyer", year: 2022, scheme: "2022", semester: 4, usn: "4TG22EE007" },
  { id: 18, name: "Kiran J. Menon", year: 2020, scheme: "2020", semester: 8, usn: "4TG20EE004" },
  { id: 19, name: "Nikhil K. Verma", year: 2023, scheme: "2023", semester: 2, usn: "4TG23EE006" },
  { id: 20, name: "Shreya L. Pandey", year: 2021, scheme: "2021", semester: 6, usn: "4TG21EE007" },
  { id: 21, name: "Amit M. Singh", year: 2022, scheme: "2022", semester: 4, usn: "4TG22EE008" },
  { id: 22, name: "Deepika N. Agarwal", year: 2020, scheme: "2020", semester: 8, usn: "4TG20EE005" },
  { id: 23, name: "Varun O. Reddy", year: 2023, scheme: "2023", semester: 2, usn: "4TG23EE007" },
  { id: 24, name: "Pooja P. Shah", year: 2021, scheme: "2021", semester: 6, usn: "4TG21EE008" },
]

const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [yearFilter, setYearFilter] = useState('All')
  const [schemeFilter, setSchemeFilter] = useState('All')

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setLoading(true)
      const data = await studentsAPI.getAll()
      if (data.length === 0) {
        // Initialize with default data if empty
        await studentsAPI.initialize(initialStudentsData)
        setStudents(initialStudentsData)
      } else {
        setStudents(data)
      }
    } catch (error) {
      console.error('Failed to load students:', error)
      // Fallback to local data if API fails
      setStudents(initialStudentsData)
    } finally {
      setLoading(false)
    }
  }

  const years = ['All', ...new Set(students.map(s => s.year.toString()))]
  const schemes = ['All', ...new Set(students.map(s => s.scheme))]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.usn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = yearFilter === 'All' || student.year.toString() === yearFilter
    const matchesScheme = schemeFilter === 'All' || student.scheme === schemeFilter
    return matchesSearch && matchesYear && matchesScheme
  })

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
            Students Directory
          </h1>
          <p className="text-xl text-gray-300">Browse enrolled students by year and scheme</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or USN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue"
              />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue appearance-none"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year === 'All' ? 'All Years' : `Year ${year}`}</option>
                ))}
              </select>
            </div>

            {/* Scheme Filter */}
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={schemeFilter}
                onChange={(e) => setSchemeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue appearance-none"
              >
                {schemes.map(scheme => (
                  <option key={scheme} value={scheme}>{scheme === 'All' ? 'All Schemes' : `${scheme} Scheme`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </motion.div>

        {/* Students Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-electric-blue" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue to-voltage-purple flex items-center justify-center text-2xl">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{student.name}</h3>
                  <p className="text-sm text-gray-400">{student.usn}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Enrollment Year:</span>
                  <span className="text-electric-blue font-semibold">{student.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Scheme:</span>
                  <span className="text-circuit-gold font-semibold">{student.scheme}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Semester:</span>
                  <span className="text-power-green font-semibold">Sem {student.semester}</span>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">No students found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Students

