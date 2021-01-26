import os, base64

# test the API against an in-memory db to make sure it works
class Development(object):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite://"

class Production(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = base64.decode(os.getenv('DB_URI'))

app_config = {
    'development': Development,
    'production': Production,
}
