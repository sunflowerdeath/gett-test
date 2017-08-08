from gevent.wsgi import WSGIServer

from gett_test import app

if __name__ == '__main__':
    server = WSGIServer(('', 5000), app)
    server.serve_forever()
