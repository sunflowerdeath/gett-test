import gevent
from gevent.queue import Queue

from gett_test import app
from gett_test.db import engine, Task, Session

from flask import Response, json

subscriptions = []

def task_to_dict(task):
    return {
        'id': task.id,
        'name': task.name,
        'priority': task.priority,
        'description': task.description
    }

@app.route('/')
def create_task():
    session = Session()
    task = Task(name='Task', priority=1, description='Description')
    session.add(task)
    session.commit()
    msg = json.dumps(task_to_dict(task))
    def notify():
        for sub in subscriptions[:]:
            sub.put(msg)
    gevent.spawn(notify)
    return 'OK'

@app.route('/tasks')
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
                result = q.get()
                msg = 'event: test\n' + \
                    'data: %s\n' % str(q.get()) + \
                    '\n\n'
                yield msg
        except GeneratorExit:
            subscriptions.remove(q)

    return Response(gen(), mimetype='text/event-stream')

@app.route('/static/<path:path>')
def static_files(path):
    return app.send_static_file('index.html')
