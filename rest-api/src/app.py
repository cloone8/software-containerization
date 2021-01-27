from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from .config import app_config
from .models import db
from .resources import api
from .resources.QuoteResource import QuoteResource

migrate = Migrate()

def create_app(env_name):
    # initialize Flask and libraries

    app = Flask(__name__)
    app.config.from_object(app_config[env_name])
    
    CORS(app)
    db.init_app(app)

    # establish what resources the API can be used with

    api.add_resource(QuoteResource, '/quote', '/quote/<string:uid>')
    #api.add_resource(Quotes, '/quotes')

    from .models.QuoteModel import Quote

    api.init_app(app)
    migrate.init_app(app, db)

    return app
