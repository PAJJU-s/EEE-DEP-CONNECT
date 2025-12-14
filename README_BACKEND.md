# Backend Setup Instructions

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:3001`

## API Endpoints

### Students API
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `POST /api/init/students` - Initialize students with default data

### Files API
- `GET /api/files` - Get all files
- `GET /api/files/type/:type` - Get files by type (pyq, notes, papers)
- `POST /api/files/upload` - Upload a PDF file
- `GET /api/files/:id/download` - Download a file
- `DELETE /api/files/:id` - Delete a file

## File Structure

```
server/
├── server.js          # Main server file
├── package.json       # Dependencies
├── uploads/           # Uploaded PDF files (created automatically)
│   ├── pyq/          # Previous year questions
│   ├── notes/        # Study notes
│   └── papers/       # Question papers
└── data/              # JSON data files (created automatically)
    ├── students.json  # Student data
    └── files.json     # File metadata
```

## File Upload

Files are uploaded using `multipart/form-data` with the following fields:
- `file`: The PDF file
- `type`: File type ('pyq', 'notes', or 'papers')
- `subject`: Subject name (optional)
- `semester`: Semester number (optional)
- `scheme`: Scheme year (optional)
- `year`: Year (optional)

## Frontend Configuration

Make sure the frontend is configured to connect to the backend. The API base URL is set in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

If your backend runs on a different port, update this URL accordingly.

## Notes

- Files are stored in the `uploads/` directory
- Data is stored in JSON files in the `data/` directory
- Maximum file size: 10MB
- Only PDF files are accepted
- The server automatically creates necessary directories on startup

