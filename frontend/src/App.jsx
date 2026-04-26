import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Users, PlusCircle, UserPlus } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Employees from './pages/Employees';
import NewTask from './pages/NewTask';
import NewEmployee from './pages/NewEmployee';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header glass-card" style={{ padding: '1rem 2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LayoutDashboard size={32} color="#818cf8" />
            <h1>TeamSync</h1>
          </div>
          
          <nav className="nav-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LayoutDashboard size={18} /> Dashboard
              </div>
            </NavLink>
            <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CheckSquare size={18} /> Tasks
              </div>
            </NavLink>
            <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={18} /> Employees
              </div>
            </NavLink>
            <NavLink to="/new-task" className={({ isActive }) => isActive ? 'active' : ''}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <PlusCircle size={18} /> Add Task
              </div>
            </NavLink>
            <NavLink to="/new-employee" className={({ isActive }) => isActive ? 'active' : ''}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <UserPlus size={18} /> Add Employee
              </div>
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/new-employee" element={<NewEmployee />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
