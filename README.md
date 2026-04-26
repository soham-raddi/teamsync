# TeamSync

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite&logoColor=white)

**TeamSync** is a complete full-stack web application designed for dynamic teams. It provides a beautiful, modern, dark-themed glassmorphism interface for managing employees, tracking cross-departmental projects, and assigning priority-based tasks. 

---

## Features

- **Dynamic Dashboard**: Get an eagle-eye view of your organization's workflow. See statistics for total tasks, incomplete tasks, and tasks due *today*.
- **Task Management**: Create new tasks, assign them to employees, set due dates, and specify priority levels. Toggle tasks as complete or incomplete with a single click.
- **Employee Directory**: Manage your company's workforce. Add new employees and track their departments and associated projects.
- **Premium UI/UX**: Built with a sleek dark-mode glassmorphism design, vibrant accent colors, and smooth micro-animations.

---

## Tech Stack

### Frontend
- **React 18** (scaffolded with Vite for lightning-fast HMR)
- **React Router DOM** (for seamless client-side routing)
- **Lucide React** (for modern SVG icons)
- **Vanilla CSS** (custom glassmorphism and modern styling system)

### Backend
- **Python 3 / Flask** (RESTful API)
- **Flask-SQLAlchemy** (ORM for database operations)
- **Flask-CORS** (Handling cross-origin resource sharing)
- **SQLite** (Zero-configuration database)

---

## Getting Started

Follow these steps to get a local copy up and running.

### 1. Start the Backend API

The backend is built with Python and Flask. It uses a SQLite database (`project.db`) which will be automatically created and populated with test data the first time you run it.

```powershell
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask development server
python app.py
```
*The backend API will run on `http://127.0.0.1:5000`.*

### 2. Start the Frontend Application

The frontend is a Vite + React project. Open a **new terminal window** and run:

```powershell
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

*The frontend application will be available at `http://localhost:5173`. Open this URL in your web browser to use the app.*