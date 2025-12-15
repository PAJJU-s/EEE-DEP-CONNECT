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

- `POST /api/init/students` - Initialize students with default data

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

- `year`: Year (optional)

## Frontend Configuration

Make sure the frontend is configured to connect to the backend. The API base URL is set in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

If your backend runs on a different port, update this URL accordingly.

## Notes
- `subject`: Subject name (optional)

