import os
from flask_script import Manager
from flask_migrate import MigrateCommand
from app.models import *
from app.restapi import create_app

env_name = os.getenv('FLASK_ENV')
app = create_app(env_name)

manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
