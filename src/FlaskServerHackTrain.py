from flask import Flask
from flask import request
import json
import string
import random


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


SPORTS_INPUTS = ("sport", "football", "sports", "scoccer")
SPORTS_RESPONSES = ["Welbeck blow for Gunners", "Midfield duo must step up for Reds, says Molby", "Fatigued foxes united in spirit","Football: Lions skipper Hariss Harun leads by example with Man-of-the-Match display"]

WEATHER_INPUTS = ("london", "weather", "raining")
WEATHER_RESPONSES=["13 C with Occasional Rain"]

DELAY_INPUTS = ("late", "delay", "waiting")
DELAY_RESPONSES=["We are experiencing signaling issue trains will be running 15 minute delayed"]

def greeting(sentence):

   for word in sentence.split():
        if word.lower() in SPORTS_INPUTS:
           return random.choice(SPORTS_RESPONSES)
        elif word.lower() in WEATHER_INPUTS:
           return random.choice(WEATHER_RESPONSES)
        elif word.lower() in DELAY_INPUTS:
           return random.choice(DELAY_RESPONSES)
        else:
            return ""

messages = []


app = Flask(__name__)

@app.route('/sendMessage', methods=['POST'])
def sendMessage():
    data = request.data
    data = json.loads(data)
    m = Message(data["room"], data["dateTime"], data["user"], data["message"], "")
    print(m.message)
    messages.append(m)

    if(data["room"] == "conductor"):
        botResponse = greeting(m.message)
        if (botResponse != ""):
            botMessage = Message("conductor", "", "conductor", botResponse, data["user"])
            messages.append(botMessage)
        
    
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