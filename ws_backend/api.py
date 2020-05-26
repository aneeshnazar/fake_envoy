from flask import Flask, has_request_context, request
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
import logging
from flask.logging import default_handler


class RequestFormatter(logging.Formatter):
    def format(self, record):
        if has_request_context():
            record.url = request.url
            record.remote_addr = request.remote_addr
        else:
            record.url = None
            record.remote_addr = None

        return super().format(record)


formatter = RequestFormatter(
    '[%(asctime)s] %(remote_addr)s requested %(url)s\n'
    '%(levelname)s in %(module)s: %(message)s'
)
default_handler.setFormatter(formatter)

app = Flask(__name__)
CORS(app)
socketio = SocketIO()
INDIV_CONNECTIONS = {}
socketio.init_app(app, cors_allowed_origins="http://localhost:3000")


@socketio.on('login', namespace='/notification')
def on_login(data):
    logging.log(logging.INFO, data)
    indiv = data['hash']
    INDIV_CONNECTIONS[indiv] = data
    join_room(indiv)
    emit("doctor")
    emit("patient")


@socketio.on('next', namespace='/notification')
def on_next(data):
    logging.log(logging.INFO, data)
    indiv = data['hash']
    emit("notify", room=indiv)
    del INDIV_CONNECTIONS[indiv]
    leave_room(indiv)
    emit("patient")
    emit("doctor")


if __name__ == '__main__':
    socketio.run(app)
