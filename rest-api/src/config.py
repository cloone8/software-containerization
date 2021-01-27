import os, base64

# test the API against an in-memory db to make sure it works
class Development(object):
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = str(base64.b64decode(os.getenv('DB_URI')), "utf-8")

class Production(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = str(base64.b64decode(os.getenv('DB_URI')), "utf-8")

app_config = {
    'development': Development,
    'production': Production,
}
