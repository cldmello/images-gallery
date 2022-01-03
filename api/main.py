import os
import requests
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from dotenv import load_dotenv
from mongo_client import mongoClient

# from bson import json_util
# from bson.objectid import ObjectId

gallery = mongoClient.gallery
images_collection = gallery.images

load_dotenv()
app = Flask(__name__)
CORS(app)  # Cross-origin Resource Sharing enabled

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Environment variables .env file are missing or could not find environmnent variable UNSPLASH_KEY!"
    )


@app.route("/")
def hello():
    return "<h1>Hello World from Flask!</h1>"


# app.route('/')(hello) -- Above decorator expands to this line


@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    cheaders = {"Accept-Version": "v1", "Authorization": "Client-ID " + UNSPLASH_KEY}
    payload = {"query": word}
    res = requests.get(url=UNSPLASH_URL, headers=cheaders, params=payload)
    data = res.json()

    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read image
        images = images_collection.find({})
        image_list = list(images)
        return jsonify(image_list)

    if request.method == "POST":
        image = request.get_json()
        image["_id"] = image.get("id")
        res = images_collection.insert_one(image).inserted_id
        return {"inserted_id": res}


@app.route("/images/<image_id>", methods=["DELETE"])
def delete_image(image_id):
    if request.method == "DELETE":
        res = images_collection.delete_one({"_id": image_id})
        if not res:
            return {"error": "server error, please try again"}, 500
        if res and not res.deleted_count:
            return {"error": "not found"}, 404
        return {"deleted_id": image_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
