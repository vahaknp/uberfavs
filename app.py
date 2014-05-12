import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import json_util
from flask import Flask, render_template, url_for, json, request

app = Flask(__name__)
client = MongoClient('localhost', 27017)
favorites = client['demo']['favorites']

def json_load(data):
    return json.loads(data, object_hook=json_util.object_hook)

def json_dump(data):
    return json.dumps(data, default=json_util.default)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/api')
def api():
    return "API working"

@app.route('/favorites')
def list_favorites():
    return json_dump(list(favorites.find()))
    
@app.route('/favorites', methods=['POST'])
def new_favorite():
    favorite = json_load(request.data)
    favorites.save(favorite)
    return json_dump(favorite)

@app.route('/favorites/<favorite_id>', methods=['PUT'])
def update_favorite(favorite_id):
    favorite = json_load(request.data)
    favorites.save(favorite)
    return json_dump(favorite)

@app.route('/favorites/<favorite_id>', methods=['DELETE'])
def delete_favorite(favorite_id):
    favorites.remove(ObjectId(favorite_id))
    return ""


if __name__ == '__main__':
    app.run(debug=True)


