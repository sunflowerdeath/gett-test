from flask import json, request

from gett_test2.app import app
from gett_test2.extensions.db import db
from gett_test2.extensions.socketio import socketio
from gett_test2.models import Task

def task_to_dict(task):
    return {
        'id': task.id,
        'name': task.name,
        'priority': task.priority,
        'description': task.description
    }

@app.route('/tasks')
def index():
    return app.send_static_file('index.html')

@app.route('/tasks/get')
def get_tasks():
    tasks = Task.query.all()
    return json.jsonify([task_to_dict(task) for task in tasks])

@app.route('/tasks', methods=['POST'])
def create_task():
    task_json = request.get_json()
    task = Task(
        name=task_json['name'],
        priority=task_json['priority'],
        description=task_json['description']
    )
    db.session.add(task)
    db.session.commit()
    socketio.emit('create-task', json.dumps(task_to_dict(task)))
    return 'OK'
