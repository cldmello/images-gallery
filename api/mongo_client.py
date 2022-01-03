import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USER = os.environ.get("MONGO_USER", "root")
MONGO_PASS = os.environ.get("MONGO_PASS", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)

mongoClient = MongoClient(
    host=MONGO_URL,
    username=MONGO_USER,
    password=MONGO_PASS,
    port=MONGO_PORT,
)


def insert_text_doc():
    """Inserts a sample document to the `test_collection` in `test` db"""
    db = mongoClient.test
    test_collection = db.test_collection
    result = test_collection.insert_one({"name": "Collin", "student": True})
    print(result)
