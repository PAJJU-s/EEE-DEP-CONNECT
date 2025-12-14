import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Search, Filter, BookOpen, Upload, Loader } from 'lucide-react'
import { filesAPI } from '../services/api'
import FileUpload from '../components/FileUpload'

const PYQ = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [schemeFilter, setSchemeFilter] = useState('All')

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      setLoading(true)
      const pyqFiles = await filesAPI.getByType('pyq')
      const paperFiles = await filesAPI.getByType('papers')
      const allFiles = [...pyqFiles, ...paperFiles].map(file => ({
        ...file,
        type: file.type === 'papers' ? 'Question Paper' : 'PYQ'
      }))
      setFiles(allFiles)
    } catch (error) {
      console.error('Failed to load files:', error)
    } finally {
      setLoading(false)
    }
  }

  const semesters = ['All', ...new Set(files.map(f => f.semester).filter(Boolean))]
  const types = ['All', 'PYQ', 'Question Paper']
  const schemes = ['All', ...new Set(files.map(f => f.scheme).filter(Boolean))]

  const filteredPYQ = files.filter(item => {
    const matchesSearch = item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.originalName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = semesterFilter === 'All' || item.semester === semesterFilter
    const matchesType = typeFilter === 'All' || item.type === typeFilter
    const matchesScheme = schemeFilter === 'All' || item.scheme === schemeFilter
    return matchesSearch && matchesSemester && matchesType && matchesScheme
  })

  const handleDownload = async (fileId) => {
    try {
      await filesAPI.download(fileId)
    } catch (error) {
      alert('Failed to download file: ' + error.message)
    }
  }

  const handleUploadSuccess = () => {
    loadFiles()
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 electric-glow">
                Previous Year Questions & Papers
              </h1>
              <p className="text-xl text-gray-300">Access question papers and previous year question papers</p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setShowUpload(true)}
                className="px-6 py-3 bg-electric-blue hover:bg-electric-blue/80 text-white rounded-lg transition-all flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue"
              />
            </div>

            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem === 'All' ? 'All Semesters' : `Sem ${sem}`}</option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
            >
              {types.map(type => (
                <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
              ))}
            </select>

            <select
              value={schemeFilter}
              onChange={(e) => setSchemeFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
            >
              {schemes.map(scheme => (
                <option key={scheme} value={scheme}>{scheme === 'All' ? 'All Schemes' : `${scheme} Scheme`}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* PYQ Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-electric-blue" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPYQ.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-electric-blue to-voltage-purple flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.subject || item.originalName}</h3>
                    <p className="text-sm text-gray-400">Semester {item.semester || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Type:</span>
                  <span className={`px-2 py-1 rounded ${
                    item.type === 'PYQ' ? 'bg-electric-blue/20 text-electric-blue' : 'bg-circuit-gold/20 text-circuit-gold'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Year:</span>
                  <span className="text-white font-semibold">{item.year}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Scheme:</span>
                  <span className="text-power-green font-semibold">{item.scheme}</span>
                </div>
              </div>

              <button
                onClick={() => handleDownload(item.id)}
                className="w-full flex items-center justify-center space-x-2 bg-electric-blue hover:bg-electric-blue/80 text-white py-2 rounded-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </motion.div>
          ))}
          </div>
        )}

        {!loading && filteredPYQ.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">No papers found matching your criteria</p>
          </motion.div>
        )}

        {showUpload && (
          <FileUpload
            type="pyq"
            onUploadSuccess={handleUploadSuccess}
            onClose={() => setShowUpload(false)}
          />
        )}
      </div>
    </div>
  )
}

export default PYQ

