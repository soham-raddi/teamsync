import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:5000/api';

const NewEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empid: '',
    empname: '',
    projectname: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post(`${API_URL}/employees`, formData);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add employee');
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Add New Employee</h2>
      
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Employee ID</label>
          <input 
            type="text" 
            name="empid" 
            className="form-control-glass" 
            placeholder="e.g. 07" 
            value={formData.empid} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
          <input 
            type="text" 
            name="empname" 
            className="form-control-glass" 
            placeholder="John Doe" 
            value={formData.empname} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Department</label>
          <input 
            type="text" 
            name="department" 
            className="form-control-glass" 
            placeholder="e.g. Engineering" 
            value={formData.department} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Project Name</label>
          <input 
            type="text" 
            name="projectname" 
            className="form-control-glass" 
            placeholder="e.g. Project Alpha" 
            value={formData.projectname} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="btn-primary-glass" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Adding...' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default NewEmployee;
