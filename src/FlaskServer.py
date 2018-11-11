from flask import Flask
from flask import request
import pandas as pd
import numpy as np

app = Flask(__name__)


def df_empty(columns, dtypes, index=None):
    assert len(columns) == len(dtypes)
    df = pd.DataFrame(index=index)
    for c, d in zip(columns, dtypes):
         df[c] = pd.Series(dtype=d)
    return df


df = df_empty(['room', 'dateTime', 'username', 'message'], dtypes=[object, object, object, object])



@app.route('/receivemessage', methods=['POST'])
def receivemessage():
    global df
    data = request.get_json()
    username = data["user"]
    room = data["room"]
    datereceived = data["dateTime"]
    message = data["message"]
    df2 = pd.DataFrame([[room,datereceived,username,message]],columns=['room', 'dateTime', 'username', 'message'])
    df = df.append(df2,ignore_index=True)


    return df.to_json()


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')