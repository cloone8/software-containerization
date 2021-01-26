from flask import Flask
from flask-restful import Api, Resource
from flask-cors import CORS
from .config import app_config
from .models import db
from .schemas import ma, QuoteSchema
from .resources import api, Quote, Quotes

def create_app(env_name):
    # initialize Flask and libraries

    app = Flask(__name__)
    app.config.from_object(app_config[env_name])
    
    CORS(app)

    db.init_app(app)
    ma.init_app(app

    # gotta do this here to get marshmallow-sqlalchemy to work
    global quote_schema
    quote_schema = QuoteSchema()

    # establish what resources the API can be used with

    api.add_resource(Quote, '/quote', '/quote/<string:uid>')
    api.add_resource(Quotes, '/quotes')

    return app
