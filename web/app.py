from flask import Flask, render_template
import pdb
import requests
import json

ACCESS = "CAACEdEose0cBAHqCZALqKKadWZCoT563wLc2LO3VqzHNrjG9GucmlBtMBG6iHBjZCzFPAjZCK8RZA280qiKzcJrmZBZA0Q9YaPHEmYV0UeXrfVXfdCnRSxCVTWR3HNbcFnMeCRQloNEZB4ItWgk3jyhHaYHMAMZCDHZAkzVFaZBRIOKWGuZCr5yFKaAeLFyjlqQZBC9PZBPfJH99bx2EqIQMxJMbW2"

ROOT_URL = "https://graph.facebook.com/v2.4/"

app = Flask(__name__)

@app.route("/")
def home():
    friends = get_friends()
    return render_template("index.html", friends=friends["data"])

def get_friends(access_token=ACCESS, user="me"):
    data = requests.get(ROOT_URL + user + "friends?access_token=" + access_token)
    return json.loads(data.text)

def get_posts(access_token=ACCESS, user="me"):
    data = requests.get(ROOT_URL + user + "/posts?access_token=" + access_token)
    return json.loads(data.text)

if __name__ == "__main__":
    app.run(debug=True)
