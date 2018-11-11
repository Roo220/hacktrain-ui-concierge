from flask import Flask
from flask import request
from flask import jsonify
import pandas as pd
import numpy as np
import json


class Message(object):
    room = ""
    dateTime = ""
    user = ""
    message = ""
    to = ""

    def __init__(self, room, dateTime, user, message, to):
        self.room = room
        self.dateTime = dateTime
        self.user = user
        self.message = message
        self.to = to

    def serialize(self):
        return {
            'room': self.room, 
            'dateTime': self.dateTime,
            'user': self.user,
            'message': self.message
        }


def df_empty(columns, dtypes, index=None):
    assert len(columns) == len(dtypes)
    df = pd.DataFrame(index=index)
    for c, d in zip(columns, dtypes):
         df[c] = pd.Series(dtype=d)
    return df


df = df_empty(['room', 'dateTime', 'username', 'message','to'], dtypes=[object, object, object, object,object])

SPORTS_INPUTS = ("sport", "football", "sports", "scoccer")
SPORTS_RESPONSES = ["Welbeck blow for Gunners", "Midfield duo must step up for Reds, says Molby", "Fatigued foxes united in spirit","Football: Lions skipper Hariss Harun leads by example with Man-of-the-Match display"]

WEATHER_INPUTS = ("london", "weather", "raining")
WEATHER_RESPONSES=("13 C with Occasional Rain")

def greeting(sentence):

   for word in sentence.split():
       if word.lower() in SPORTS_INPUTS:
           return random.choice(SPORTS_RESPONSES)
       elif word.lower() in WEATHER_INPUTS:
           return random.choice(WEATHER_RESPONSES)

messages = []


app = Flask(__name__)

@app.route('/sendMessage', methods=['POST'])
def sendMessage():
    global df
    data = request.data
    data = json.loads(data)
    m = Message(data["room"], data["dateTime"], data["user"], data["message"], "")
    print(m.message)
    messages.append(m)
    payload = m2=[message.serialize() for message in messages]
    payload = json.dumps(payload)
    print(payload)

    response = app.response_class(
        response=payload,
        status=200,
        mimetype='application/json'
    )

    return response

@app.route('/getMessages', methods=['GET'])
def getMessages():
    payload = m2=[message.serialize() for message in messages]
    payload = json.dumps(payload)
    print(payload)

    response = app.response_class(
        response=payload,
        status=200,
        mimetype='application/json'
    )

    return response

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')