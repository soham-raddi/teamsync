import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:5000/api';

const NewTask = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    taskid: '',
    taskname: '',
    duedate: '',
    empid: '',
    priority: 'low'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_URL}/employees`);
        setEmployees(response.data);
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, empid: response.data[0].empid }));
        }
      } catch (err) {
        console.error("Error fetching employees", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post(`${API_URL}/tasks`, formData);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Assign New Task</h2>
      
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Task ID</label>
          <input 
            type="text" 
            name="taskid" 
            className="form-control-glass" 
            placeholder="e.g. T5" 
            value={formData.taskid} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Task Name</label>
          <input 
            type="text" 
            name="taskname" 
            className="form-control-glass" 
            placeholder="What needs to be done?" 
            value={formData.taskname} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Due Date</label>
          <input 
            type="date" 
            name="duedate" 
            className="form-control-glass" 
            value={formData.duedate} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Assign To</label>
          <select 
            name="empid" 
            className="form-control-glass" 
            value={formData.empid} 
            onChange={handleChange} 
            required
          >
            {employees.map(emp => (
              <option key={emp.empid} value={emp.empid} style={{ background: 'var(--bg-color)' }}>
                {emp.empname} ({emp.department})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Priority</label>
          <select 
            name="priority" 
            className="form-control-glass" 
            value={formData.priority} 
            onChange={handleChange}
          >
            <option value="low" style={{ background: 'var(--bg-color)' }}>Low</option>
            <option value="high" style={{ background: 'var(--bg-color)' }}>High</option>
          </select>
        </div>

        <button type="submit" className="btn-primary-glass" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default NewTask;
