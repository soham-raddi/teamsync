import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle, Clock, ListTodo } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loader"></div>;

  const incomplete = tasks.filter(t => t.status === 'incomplete').length;
  const highPriority = tasks.filter(t => t.priority === 'high' && t.status === 'incomplete').length;
  const completed = tasks.filter(t => t.status === 'complete').length;
  const total = tasks.length;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const dueToday = tasks.filter(t => t.duedate === todayStr && t.status === 'incomplete');

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Overview</h2>
      
      <div className="dashboard-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon">
            <ListTodo size={32} />
          </div>
          <div className="stat-content">
            <p>Total Tasks</p>
            <h3>{total}</h3>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)' }}>
            <Clock size={32} />
          </div>
          <div className="stat-content">
            <p>Incomplete</p>
            <h3>{incomplete}</h3>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)' }}>
            <AlertCircle size={32} />
          </div>
          <div className="stat-content">
            <p>High Priority</p>
            <h3>{highPriority}</h3>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
            <CheckCircle size={32} />
          </div>
          <div className="stat-content">
            <p>Completed</p>
            <h3>{completed}</h3>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={20} color="var(--warning)" /> Tasks Due Today
        </h3>
        
        {dueToday.length > 0 ? (
          <table className="table-glass">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Name</th>
                <th>Employee</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {dueToday.map(task => (
                <tr key={task.taskid}>
                  <td>{task.taskid}</td>
                  <td>{task.taskname}</td>
                  <td>{task.employee_name || task.empid}</td>
                  <td>
                    <span className={`badge badge-${task.priority}`}>
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <CheckCircle size={48} color="var(--success)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>Great job! No tasks due today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
