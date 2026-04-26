from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date, datetime, timedelta
import os

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'project.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Employee(db.Model):
    __tablename__ = 'employees'
    empid = db.Column(db.String(10), primary_key=True)
    empname = db.Column(db.String(50), nullable=False)
    projectname = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    tasks = db.relationship('Task', backref='employee', lazy=True)

    def to_dict(self):
        return {
            'empid': self.empid,
            'empname': self.empname,
            'projectname': self.projectname,
            'department': self.department
        }

class Task(db.Model):
    __tablename__ = 'tasks'
    taskid = db.Column(db.String(10), primary_key=True)
    taskname = db.Column(db.String(100), nullable=False)
    duedate = db.Column(db.Date, nullable=False)
    empid = db.Column(db.String(10), db.ForeignKey('employees.empid'), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='incomplete')
    priority = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            'taskid': self.taskid,
            'taskname': self.taskname,
            'duedate': self.duedate.strftime('%Y-%m-%d'),
            'empid': self.empid,
            'status': self.status,
            'priority': self.priority,
            'employee_name': self.employee.empname if self.employee else None
        }

with app.app_context():
    db.create_all()
    # Seed data if empty
    if not Employee.query.first():
        employees = [
            Employee(empid='01', empname='Emp1', projectname='project1', department='R&D'),
            Employee(empid='02', empname='Emp2', projectname='project1', department='Finance'),
            Employee(empid='03', empname='Emp3', projectname='project1', department='Management'),
            Employee(empid='04', empname='Emp4', projectname='project1', department='HR'),
            Employee(empid='05', empname='Emp5', projectname='project1', department='Senior Manager'),
            Employee(empid='06', empname='Emp6', projectname='none', department='Senior Manager')
        ]
        db.session.bulk_save_objects(employees)
        db.session.commit()
    
    if not Task.query.first():
        today = date.today()
        tomorrow = today + timedelta(days=1)
        yesterday = today - timedelta(days=1)
        next_week = today + timedelta(days=7)

        tasks = [
            Task(taskid='T1', taskname='Prepare Q3 Presentation', duedate=yesterday, empid='02', status='complete', priority='high'),
            Task(taskid='T2', taskname='Update Financial Models', duedate=today, empid='02', status='incomplete', priority='high'),
            Task(taskid='T3', taskname='Review Pull Requests', duedate=today, empid='01', status='incomplete', priority='high'),
            Task(taskid='T4', taskname='Onboard New Hire', duedate=tomorrow, empid='04', status='incomplete', priority='low'),
            Task(taskid='T5', taskname='Weekly Team Sync', duedate=today, empid='03', status='complete', priority='low'),
            Task(taskid='T6', taskname='Audit Cloud Infrastructure', duedate=next_week, empid='01', status='incomplete', priority='high'),
            Task(taskid='T7', taskname='Draft Marketing Copy', duedate=yesterday, empid='05', status='complete', priority='low'),
            Task(taskid='T8', taskname='Client Strategy Meeting', duedate=today, empid='06', status='incomplete', priority='high'),
            Task(taskid='T9', taskname='Fix Critical Bug in Prod', duedate=today, empid='01', status='incomplete', priority='high'),
            Task(taskid='T10', taskname='Update Employee Handbook', duedate=next_week, empid='04', status='incomplete', priority='low')
        ]
        db.session.bulk_save_objects(tasks)
        db.session.commit()

# --- Routes ---

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "message": "Welcome to the TeamSync Backend API!",
        "status": "running",
        "frontend_instructions": "Please visit the Vite development server (usually http://localhost:5173) in your browser to view the frontend application."
    })

@app.route('/api/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    return jsonify([e.to_dict() for e in employees])

@app.route('/api/employees', methods=['POST'])
def add_employee():
    data = request.json
    empid = data.get('empid')
    empname = data.get('empname')
    projectname = data.get('projectname')
    department = data.get('department')
    
    if Employee.query.get(empid):
        return jsonify({'error': 'Employee already exists'}), 400
        
    emp = Employee(empid=empid, empname=empname, projectname=projectname, department=department)
    db.session.add(emp)
    db.session.commit()
    return jsonify(emp.to_dict()), 201

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    status_filter = request.args.get('status')
    priority_filter = request.args.get('priority')
    empid_filter = request.args.get('empid')
    today_filter = request.args.get('today')
    
    query = Task.query
    if status_filter:
        query = query.filter_by(status=status_filter)
    if priority_filter:
        query = query.filter_by(priority=priority_filter)
    if empid_filter:
        query = query.filter_by(empid=empid_filter)
    if today_filter == 'true':
        query = query.filter_by(duedate=date.today())
        
    tasks = query.order_by(Task.duedate.desc()).all()
    return jsonify([t.to_dict() for t in tasks])

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    taskid = data.get('taskid')
    taskname = data.get('taskname')
    duedate_str = data.get('duedate')
    empid = data.get('empid')
    status = data.get('status', 'incomplete')
    priority = data.get('priority')
    
    if not Employee.query.get(empid):
        return jsonify({'error': 'Employee id is invalid'}), 400
    if Task.query.get(taskid):
        return jsonify({'error': 'Task already exists'}), 400
        
    try:
        duedate = datetime.strptime(duedate_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format, use yyyy-mm-dd'}), 400
        
    task = Task(taskid=taskid, taskname=taskname, duedate=duedate, empid=empid, status=status, priority=priority)
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@app.route('/api/tasks/<taskid>/status', methods=['PATCH'])
def update_task_status(taskid):
    task = Task.query.get(taskid)
    if not task:
        return jsonify({'error': 'Task id is invalid'}), 404
        
    data = request.json
    status = data.get('status')
    if status:
        task.status = status
        db.session.commit()
    return jsonify(task.to_dict())

if __name__ == '__main__':
    app.run(debug=True, port=5000)
