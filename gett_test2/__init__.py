from gett_test2.app import app
from gett_test2.extensions.db import db
from gett_test2.extensions.socketio import socketio
import gett_test2.models
import gett_test2.views

def run_app():
    db.init_app(app)
    db.create_all(app=app)
    socketio.run(app)
