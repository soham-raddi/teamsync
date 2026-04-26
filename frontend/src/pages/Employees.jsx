import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div className="glass-card">
      <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Employees Directory</h2>
      
      {employees.length > 0 ? (
        <table className="table-glass">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Project</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.empid}>
                <td><strong>{emp.empid}</strong></td>
                <td>{emp.empname}</td>
                <td>{emp.department}</td>
                <td>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    {emp.projectname}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <p>No employees found.</p>
        </div>
      )}
    </div>
  );
};

export default Employees;
