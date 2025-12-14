import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, FileText, Loader } from 'lucide-react'
import { filesAPI } from '../services/api'

const FileUpload = ({ type, onUploadSuccess, onClose }) => {
  const [file, setFile] = useState(null)
  const [metadata, setMetadata] = useState({
    subject: '',
    semester: '',
    scheme: '',
    year: '',
  })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed')
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file')
      return
    }

    setUploading(true)
    setError('')

    try {
      const result = await filesAPI.upload(file, {
        type,
        ...metadata,
      })
      onUploadSuccess(result)
      setFile(null)
      setMetadata({ subject: '', semester: '', scheme: '', year: '' })
      if (onClose) onClose()
    } catch (err) {
      setError(err.message || 'Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-2xl p-8 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-electric-blue">Upload {type.toUpperCase()}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Select PDF File
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-electric-blue transition-colors"
              >
                {file ? (
                  <>
                    <FileText className="w-5 h-5 text-electric-blue" />
                    <span className="text-sm text-gray-300">{file.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-400">Click to select PDF</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Subject
            </label>
            <input
              type="text"
              value={metadata.subject}
              onChange={(e) => setMetadata({ ...metadata, subject: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
              placeholder="e.g., Power Systems"
              disabled={uploading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Semester
              </label>
              <input
                type="number"
                value={metadata.semester}
                onChange={(e) => setMetadata({ ...metadata, semester: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
                placeholder="e.g., 4"
                min="1"
                max="8"
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Scheme
              </label>
              <input
                type="text"
                value={metadata.scheme}
                onChange={(e) => setMetadata({ ...metadata, scheme: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
                placeholder="e.g., 2022"
                disabled={uploading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Year
            </label>
            <input
              type="number"
              value={metadata.year}
              onChange={(e) => setMetadata({ ...metadata, year: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue"
              placeholder="e.g., 2023"
              disabled={uploading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-electric-blue hover:bg-electric-blue/80 rounded-lg transition-colors flex items-center justify-center space-x-2"
              disabled={uploading || !file}
            >
              {uploading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default FileUpload

