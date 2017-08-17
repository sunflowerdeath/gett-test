from gett_test2.extensions.db import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    priority = db.Column(db.Integer)
    description = db.Column(db.String)
