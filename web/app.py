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

"""
End points:

"friends": List of friends of "user"
"likes": Pages that "user" has liked
"posts": Posts on the user's front page
"events": Events that the user has attended. Useful location info for recommendations
"movies": Movies that the user has watched
"music": Artists that the user likes
"tagged_places": Locations the user was tagged in
"""
def get_fb(access_token=ACCESS, user="me", end_point):
    data = requests.get(ROOT_URL + user + "/" + end_point + "?access_token=" + access_token)
    return json.loads(data.text)

if __name__ == "__main__":
    app.run(debug=True)
