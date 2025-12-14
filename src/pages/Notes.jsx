import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Download, Search, FileText, Upload, Loader } from 'lucide-react'
import { filesAPI } from '../services/api'
import FileUpload from '../components/FileUpload'

const Notes = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('All')

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      setLoading(true)
      const notesFiles = await filesAPI.getByType('notes')
      setFiles(notesFiles)
    } catch (error) {
      console.error('Failed to load files:', error)
    } finally {
      setLoading(false)
    }
  }

  const semesters = ['All', ...new Set(files.map(f => f.semester).filter(Boolean))]

  const filteredNotes = files.filter(note => {
    const matchesSearch = note.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.originalName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = semesterFilter === 'All' || note.semester === semesterFilter
    return matchesSearch && matchesSemester
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
                Study Notes
              </h1>
              <p className="text-xl text-gray-300">Comprehensive study materials for all subjects</p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setShowUpload(true)}
                className="px-6 py-3 bg-circuit-gold hover:bg-circuit-gold/80 text-slate-900 rounded-lg transition-all flex items-center space-x-2 font-semibold"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search subject or topic..."
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
                <option key={sem} value={sem}>{sem === 'All' ? 'All Semesters' : `Semester ${sem}`}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Notes Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-circuit-gold" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-circuit-gold to-current-orange flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{note.subject || note.originalName}</h3>
                  <p className="text-sm text-gray-400">Semester {note.semester || 'N/A'} • {note.scheme || 'N/A'} Scheme</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">File: {note.originalName}</p>
                <p className="text-xs text-gray-500">Size: {(note.size / 1024).toFixed(2)} KB</p>
              </div>

              <button
                onClick={() => handleDownload(note.id)}
                className="w-full flex items-center justify-center space-x-2 bg-circuit-gold hover:bg-circuit-gold/80 text-slate-900 py-2 rounded-lg transition-all font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Download Notes</span>
              </button>
            </motion.div>
          ))}
          </div>
        )}

        {!loading && filteredNotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">No notes found matching your criteria</p>
          </motion.div>
        )}

        {showUpload && (
          <FileUpload
            type="notes"
            onUploadSuccess={handleUploadSuccess}
            onClose={() => setShowUpload(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Notes

