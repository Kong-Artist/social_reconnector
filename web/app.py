from flask import Flask, render_template, request, session
import pdb
import requests
import json

import indicoio

import re

from string import printable
from random import choice

ACCESS = "CAACEdEose0cBACJJvDYf46Xete3Yib9cOsFlMXpAGsGV4X7pZBc2kNYaNLxtnICKlpv0XZCxZCQ8hVB2CzGZAsCovW9zRIHKZANAxkSDDPbCSVZCIYGEQcIgvDPXyMARNH3jIgNDpNIQ1fauIMe9pWhrK0WJi0TueLGTRuhyzYot9uD6PMU3lGC8P4V6xlhuSAXT3p0BemZAbVhrzWyK8S8"

ROOT_URL = "https://graph.facebook.com/v2.4/"

indicoio.config.api_key = 'a904fcec233ed2f418ae32f2ad179000'

END_POINTS = ["likes", "posts", "events", "movies", "music", "tagged_places"]

app = Flask(__name__)
app.secret_key = "".join([choice(printable) for _ in range(16)])

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        session['user-fb-token'] = request.form['user-fb-token']
        return json.dumps({'status': 1})
    return json.dumps({'status': -1})

@app.route('/get_token')
def get_token():
    return json.dumps({'token': session['user-fb-token']}) if 'user-fb-token' in session else json.dumps({'token': -1})

@app.route('/api/friends')
def find_friends():
    friends = get_fb(end_point="friends")
    for friend in friends:
        friend['avatar'] = get_avatar(str(friend['id']), 500)
    return json.dumps(friends)

@app.route('/api/topics/<int:friend_id>')
def topics(friend_id):
    my_topics = get_user_topics()
    friend_topics = get_user_topics(user=str(friend_id))
    return json.dumps(list(intersection(my_topics, friend_topics))[:10])

def get_avatar(user_id, dimension=500):
    request_url = ROOT_URL + user_id + "/picture" + "?height=" + str(dimension) + "&width=" + str(dimension) + "&access_token=" + ACCESS
    request = requests.head(request_url, allow_redirects=True)
    return request.url

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
def get_fb(access_token=ACCESS, user="me", end_point="posts", page_limit=1):
    pages = []
    request_url = ROOT_URL + user + "/" + end_point + "?access_token=" + access_token
    for i in range(0, page_limit):
        data = requests.get(request_url)
        data_json = json.loads(data.text)
        pages.append(data_json['data'])
        if 'paging' not in data_json: break
        if 'next' not in data_json['paging']: break
        request_url = data_json['paging']['next']

    return deflate_list(pages)

def get_images(access_token=ACCESS, photo_id="0000000", fields=[]):
    data = requests.get(ROOT_URL + photo_id + "?fields=" + ",".join([x for x in fields]) + "&access_token=" + access_token)
    return json.loads(data.text)

def get_topics(text):
    if not text: return []
    tag_dictionary = indicoio.text_tags(text)
    return [key for key in sorted(tag_dictionary.keys(), key=lambda x: tag_dictionary[x], reverse=True)]

"""
Get topics that user logged in talks about in his posts

"""
def get_user_topics(user="me", page_limit=1):
    posts = get_fb(user=user, end_point="posts", page_limit=page_limit)

    if not posts:
        return None

    posts = filter(lambda x: 'story' not in x.keys(), [post for post in posts])
    messages = " ".join([x['message'] for x in posts if 'message' in x])
    messages = messages.encode('ascii', 'ignore')
    return sorted(get_topics(messages), key=lambda x: x[1], reverse=True)

def get_user_likes(user="me", page_limit=1):
    likes = get_fb(user=user, end_point="likes", page_limit=page_limit)

    if not likes:
        return None

    likes = filter(lambda x: 'story' not in x.keys(), [like for like in likes])
    messages = " ".join([x['message'] for x in likes])

    return sorted(get_topics(messages), key=lambda x: x[1], reverse=True)

def jaccard(a, b):
    a = set(a)
    b = set(b)
    return len(a.intersection(b))/len(a.union(b))

def intersection(a, b):
    if not a or not b: return set()
    a = set(a)
    b = set(b)
    return a.intersection(b)

def is_link(link):
    pattern = r'[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(\?([-a-zA-Z0-9@:%_\+.~#?&//=]+)|)'
    return bool(re.match(pattern, link, re.M|re.I))

def deflate_list(arrays):
    data = []
    for array in arrays:
        for element in array:
            data.append(element)

    return data

def get_other_interests(user="me", page_limit=1):
    end_points = ["likes", "events", "movies", "music"]
    interests = []
    for point in end_points:
        data = get_fb(ACCESS, user, point, page_limit)
        for datum in data:
            interests.append(datum['name'])

    return interests

def get_locations(user="me", page_limit=1):
    places = []
    places_data = get_fb(ACCESS, user, 'tagged_places', page_limit)
    for place in places_data:
        location = place['place']['location']
        places.append((location['city'], location['country']))

    return places

if __name__ == "__main__":
    app.run(debug=True)
