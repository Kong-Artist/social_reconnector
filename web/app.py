from flask import Flask, render_template
import pdb
import requests
import json

import indicoio

import re

ACCESS = "CAACEdEose0cBAMva4ZBPE3mtyZARA10C01RbuMBhaOZCBbtZAFkw8k1TqGJ05lA0s8F8FEJDHKOu4trcwhqQJu3ZCZCHAoxH08DMzc372KMhcGiMhhxea4VEXHExWiU9XvprxdZCKOyKvrioZC2w3cUP52X6HfcGrmpuX9NNFXCtu9N2ZAaF5s5GQZBoIfZBgBsSFpuQ4IHjuGnGlYj1RfZBB7cZBcXrlYiXg20EZD"

ROOT_URL = "https://graph.facebook.com/v2.4/"

indicoio.config.api_key = 'a904fcec233ed2f418ae32f2ad179000'

app = Flask(__name__)

@app.route("/")
def home():
    get_user_topics()
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
def get_fb(access_token=ACCESS, user="me", end_point="posts"):
    data = requests.get(ROOT_URL + user + "/" + end_point + "?access_token=" + access_token)
    return json.loads(data.text)

def get_images(access_token=ACCESS, photo_id="0000000", fields=[]):
    data = requests.get(ROOT_URL + photo_id + "?fields=" + ",".join([x for x in fields]) + "&access_token=" + access_token)
    return json.loads(data.text)

def get_topics(text):
    tag_dictionary = indicoio.text_tags(text)
    return [(key, tag_dictionary[key]) for key in sorted(tag_dictionary.keys(), key=lambda x: tag_dictionary[x], reverse=True)]

"""
Get topics that user logged in talks about in his posts

"""
def get_user_topics():
    posts = get_fb(end_point="posts")
    if not posts:
        return None
    posts = filter(lambda x: 'story' not in x.keys(), posts['data'])
    messages = [x['message'] for x in posts]
#     messages = filter(lambda x: not is_link(x), messages)
    topics = []
    for message in messages:
        topics.append(get_topics(message))

    pdb.set_trace()

    return topics

def is_link(link):
    pattern = r'[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(\?([-a-zA-Z0-9@:%_\+.~#?&//=]+)|)'
    return bool(re.match(pattern, link, re.M|re.I))

if __name__ == "__main__":
    app.run(debug=True)
