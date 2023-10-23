import os
from pickle import APPEND
from pydoc import cli
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
db_username = os.environ.get('DB_USERNAME')
db_password = os.environ.get('DB_PASSWORD')

base_url = '/api/v1'

app = Flask(__name__)

client = MongoClient(f"mongodb+srv://{db_username}:{db_password}@pts.mlprddc.mongodb.net/?retryWrites=true&w=majority")
db = client.ztis

ItemsCollection = db.products
OrdersCollection = db.orders
PaymentCollection = db.payments
UsersCollection = db.users


CORS(app)

import routs

#run -> python -m flask --debug run