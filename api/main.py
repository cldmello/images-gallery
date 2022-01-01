import os
import requests
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)  # Cross-origin Resource Sharing enabled

UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
UNSPLASH_KEY = os.environ.get('UNSPLASH_KEY', "")

if not UNSPLASH_KEY:
  raise EnvironmentError(".env file is missing or could not find environmnent variable UNSPLASH_KEY!")

@app.route('/')
def hello():
  return "<h1>Hello World from Flask!</h1>"


@app.route('/new-image')
def new_image():
  word = request.args.get('query')

  cheaders = {
    'Accept-Version': 'v1',
    'Authorization': 'Client-ID ' + UNSPLASH_KEY
  }
  payload = {'query': word}

  res = requests.get(url=UNSPLASH_URL, headers=cheaders, params=payload)
  data = res.json()

  return data

# app.route('/')(hello) -- Above decorator expands to this line

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5050)
