import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create necessary directories
const uploadsDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
const pyqDir = path.join(uploadsDir, 'pyq');
const notesDir = path.join(uploadsDir, 'notes');
const papersDir = path.join(uploadsDir, 'papers');

[uploadsDir, dataDir, pyqDir, notesDir, papersDir].forEach(dir => {
  fs.ensureDirSync(dir);
});

// Initialize data files
const studentsFile = path.join(dataDir, 'students.json');
const filesFile = path.join(dataDir, 'files.json');

if (!fs.existsSync(studentsFile)) {
  fs.writeJsonSync(studentsFile, []);
}

if (!fs.existsSync(filesFile)) {
  fs.writeJsonSync(filesFile, []);
}

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type || 'papers';
    let uploadPath;
    if (type === 'pyq') uploadPath = pyqDir;
    else if (type === 'notes') uploadPath = notesDir;
    else uploadPath = papersDir;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// ==================== STUDENTS API ====================

// Get all students
app.get('/api/students', (req, res) => {
  try {
    const students = fs.readJsonSync(studentsFile);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
  try {
    const students = fs.readJsonSync(studentsFile);
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new student
app.post('/api/students', (req, res) => {
  try {
    const students = fs.readJsonSync(studentsFile);
    const newStudent = {
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    students.push(newStudent);
    fs.writeJsonSync(studentsFile, students, { spaces: 2 });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
app.put('/api/students/:id', (req, res) => {
  try {
    const students = fs.readJsonSync(studentsFile);
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Student not found' });
    }
    students[index] = {
      ...students[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    fs.writeJsonSync(studentsFile, students, { spaces: 2 });
    res.json(students[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  try {
    const students = fs.readJsonSync(studentsFile);
    const filtered = students.filter(s => s.id !== parseInt(req.params.id));
    if (filtered.length === students.length) {
      return res.status(404).json({ error: 'Student not found' });
    }
    fs.writeJsonSync(studentsFile, filtered, { spaces: 2 });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== FILES API ====================

// Get all files
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readJsonSync(filesFile);
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get files by type
app.get('/api/files/type/:type', (req, res) => {
  try {
    const files = fs.readJsonSync(filesFile);
    const filtered = files.filter(f => f.type === req.params.type);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload file
app.post('/api/files/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const files = fs.readJsonSync(filesFile);
    const newFile = {
      id: files.length > 0 ? Math.max(...files.map(f => f.id)) + 1 : 1,
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: path.join('uploads', req.body.type, req.file.filename), // Store relative path
      type: req.body.type, // 'pyq', 'notes', or 'papers'
      subject: req.body.subject || '',
      semester: req.body.semester || '',
      scheme: req.body.scheme || '',
      year: req.body.year || '',
      size: req.file.size,
      uploadedAt: new Date().toISOString()
    };

    files.push(newFile);
    fs.writeJsonSync(filesFile, files, { spaces: 2 });
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete file
app.delete('/api/files/:id', (req, res) => {
  try {
    const files = fs.readJsonSync(filesFile);
    const file = files.find(f => f.id === parseInt(req.params.id));
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical file
    const filePath = path.join(__dirname, file.path);
    if (fs.existsSync(filePath)) {
      fs.removeSync(filePath);
    }

    // Remove from database
    const filtered = files.filter(f => f.id !== parseInt(req.params.id));
    fs.writeJsonSync(filesFile, filtered, { spaces: 2 });
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download file
app.get('/api/files/:id/download', (req, res) => {
  try {
    const files = fs.readJsonSync(filesFile);
    const file = files.find(f => f.id === parseInt(req.params.id));
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Construct file path - handle both old format (with /) and new format (relative)
    let filePath;
    if (file.path.startsWith('/')) {
      // Old format: remove leading slash
      filePath = path.join(__dirname, file.path.substring(1));
    } else {
      // New format: relative path
      filePath = path.join(__dirname, file.path);
    }

    // Normalize path to handle any issues
    filePath = path.normalize(filePath);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found at path: ${filePath}`);
      console.error(`File record:`, file);
      return res.status(404).json({ error: `File not found on server at: ${filePath}` });
    }

    // Set proper headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.originalName)}"`);
    
    // Send file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to send file: ' + err.message });
        }
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== INITIALIZE WITH EXISTING DATA ====================

// Initialize students from frontend data (optional endpoint)
app.post('/api/init/students', (req, res) => {
  try {
    const students = req.body;
    fs.writeJsonSync(studentsFile, students, { spaces: 2 });
    res.json({ message: 'Students initialized successfully', count: students.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`💾 Data directory: ${dataDir}`);
});

