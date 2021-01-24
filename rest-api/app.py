import os
from flask import Flask, request
from flask-restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# initialize Flask and libraries

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DB_URI')

db = SQLALchemy(app)
ma = Marshmallow(app)

# set up ORM

class QuoteModel(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255))

    def __repr__(self):
        return '<Quote: %s>' % self.content

class CommentModel(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255))
    date = db.Column((db.DateTime, nullable=False))

# set up schemas for serialization/deserialization

class QuoteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Quote

class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment

quote_schema = QuoteSchema()
comment_schema = CommentSchema()

# establish what resources the API can be used with

api.add_resource(Quote, '/quote', '/quote/<string:uid>')
api.add_resource(Comment, '/comment', '/comment/<string:uid>')

# this is terrible but create_all() is idempotent afaik and the alternative
# is setting up alembic and flask-migrate and that's ludicrous overkill

@app.before_first_request
def create_tables():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)
