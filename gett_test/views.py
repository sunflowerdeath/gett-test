from flask import Response, json
import gevent
from gevent.queue import Queue
from flask import request

from gett_test import app
from gett_test.db import Task, Session

subscriptions = []

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

@app.route('/tasks', methods=['POST'])
def create_task():
    session = Session()
    task_json = request.json
    task = Task(
        name=task_json['name'],
        priority=task_json['priority'],
        description=task_json['description']
    )
    session.add(task)
    session.commit()
    msg = json.dumps(task_to_dict(task))
    def notify():
        for sub in subscriptions:
            sub.put(msg)
    gevent.spawn(notify)
    return 'OK'

@app.route('/tasks/get')
def get_tasks():
    session = Session()
    tasks = session.query(Task).all()
    return json.jsonify([task_to_dict(task) for task in tasks])

@app.route('/subscribe')
def subscribe():
    def gen():
        q = Queue()
        subscriptions.append(q)
        try:
            while True:
                msg = 'event: task\n' + \
                    'data: %s\n' % str(q.get()) + \
                    '\n'
                yield msg
        except GeneratorExit:
            subscriptions.remove(q)

    return Response(gen(), mimetype='text/event-stream')

#  @app.route('/static/<path:path>')
#  def static_files(path):
    #  return app.send_static_file('index.html')
