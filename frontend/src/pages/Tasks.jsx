import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Circle, RefreshCw } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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

  const toggleStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'complete' ? 'incomplete' : 'complete';
    try {
      await axios.patch(`${API_URL}/tasks/${taskId}/status`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'complete';
    if (filter === 'incomplete') return task.status === 'incomplete';
    if (filter === 'high') return task.priority === 'high';
    return true;
  });

  if (loading) return <div className="loader"></div>;

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>All Tasks</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            className="form-control-glass" 
            style={{ width: 'auto', margin: 0 }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
            <option value="high">High Priority</option>
          </select>
          <button className="btn-primary-glass" onClick={fetchTasks} style={{ padding: '0.75rem' }}>
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <table className="table-glass">
          <thead>
            <tr>
              <th>Status</th>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Employee</th>
              <th>Due Date</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.taskid} style={{ opacity: task.status === 'complete' ? 0.6 : 1 }}>
                <td style={{ cursor: 'pointer' }} onClick={() => toggleStatus(task.taskid, task.status)}>
                  {task.status === 'complete' ? 
                    <CheckCircle color="var(--success)" size={24} /> : 
                    <Circle color="var(--text-secondary)" size={24} />
                  }
                </td>
                <td>{task.taskid}</td>
                <td style={{ textDecoration: task.status === 'complete' ? 'line-through' : 'none' }}>
                  {task.taskname}
                </td>
                <td>{task.employee_name || task.empid}</td>
                <td>{task.duedate}</td>
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
          <p>No tasks found.</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
