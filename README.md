# EEE Department Website - Tontadarya College of Engineering

![CI](https://github.com/PAJJU-s/EEE-DEP-CONNECT/actions/workflows/ci.yml/badge.svg)

A modern, feature-rich website for the Electrical and Electronics Engineering (EEE) Department at Tontadarya College of Engineering, Gadag.

## Features

### 🏠 Home Page
- Daily inspirational quotes (auto-rotating)
- Motivational notes
- Important EEE formulas in a corner widget (desktop) and dedicated section (mobile)
- Quick access to all features

### 👨‍🏫 Faculty Page
- Complete faculty directory with profiles
- HOD highlight section
- Faculty achievements and expertise
- Contact information
- Detailed faculty profiles with modal view

### 👥 Students Page
- Student directory with enrollment information
- Filter by enrollment year (2020, 2021, 2022, 2023, etc.)
- Filter by scheme (2020, 2021, 2022, 2023 schemes)
- Search by name or USN
- Semester information display

### 📄 PYQ & Question Papers
- Previous Year Question Papers (PYQ)
- Regular question papers
- Filter by semester, scheme, and type
- Download functionality
- Search by subject

### 📚 Notes
- Subject-wise study notes
- Organized by semester
- Topics covered for each subject
- Download functionality
- Search functionality

### 🔬 Projects
- **Major Projects**: Full-scale engineering projects
- **Mini Projects**: Smaller technical projects
- **Daily Works**: Regular assignments and practicals
- Filter by project type and status
- Student information for each project
- Technology stack display

### 📅 Calendar
- Interactive calendar view
- Holiday highlighting
- Important academic dates (exams, deadlines, events)
- Upcoming holidays sidebar
- Important dates sidebar

### 🏆 Achievements
- **Student of the Month**: Featured students selected by HOD and faculty
- **Student Achievements**: Competition wins, research publications, project awards
- Category filtering (Competition, Research, Project, Presentation, Innovation)
- Achievement details with dates and events

## Design Features

- **EEE Theme**: Electrical and Electronics Engineering aesthetic
  - Electric blue, circuit gold, voltage purple color scheme
  - Circuit pattern backgrounds
  - Electrical glow effects
  - Animated elements

- **Modern UI/UX**
  - Glass morphism effects
  - Smooth animations using Framer Motion
  - Responsive design (mobile, tablet, desktop)
  - Interactive hover effects
  - Beautiful gradients

- **Animations**
  - Page transitions
  - Hover animations
  - Loading animations
  - Floating elements
  - Glow effects

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **date-fns** - Date utilities

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Faculty.jsx         # Faculty directory
│   │   ├── Students.jsx        # Student directory
│   │   ├── PYQ.jsx             # Question papers
│   │   ├── Notes.jsx           # Study notes
│   │   ├── Projects.jsx        # Projects showcase
│   │   ├── Calendar.jsx       # Academic calendar
│   │   └── Achievements.jsx   # Achievements page
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Adding New Data

- **Students**: Edit `studentsData` array in `src/pages/Students.jsx`
- **Faculty**: Edit `facultyData` array in `src/pages/Faculty.jsx`
- **PYQ**: Edit `pyqData` array in `src/pages/PYQ.jsx`
- **Notes**: Edit `notesData` array in `src/pages/Notes.jsx`
- **Projects**: Edit `projectsData` array in `src/pages/Projects.jsx`
- **Holidays**: Edit `holidays` array in `src/pages/Calendar.jsx`
- **Achievements**: Edit arrays in `src/pages/Achievements.jsx`

### Styling

- Theme colors are defined in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles use Tailwind utility classes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Tontadarya College of Engineering, Gadag - EEE Department.

## Notes

- This is a demo application with sample data.
- Backend removed: this workspace currently contains frontend-only code. Server implementation and related backend files were removed from the repository.
- File downloads are simulated (alerts shown instead of actual downloads).
- For a production deployment you would typically:
  - Connect to a backend API for data and metadata
  - Implement secure file storage and download (or use a managed storage provider)
  - Add authentication and authorization for admin features
  - Set up a persistent database for dynamic content

