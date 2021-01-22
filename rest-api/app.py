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

class Quote(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255))

    def __repr__(self):
        return '<Quote: %s>' % self.content

class Comment(db.Model):
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
commend_schema = CommentSchema()

# establish what resources the API can be used with

class QuoteResource(Resource):
    #GET w/ ID: gets quote with ID, or 404 otherwise
    def get(self, uid):
        quote = Quote.query.get_or_404(uid)
        return quote_schema.dump(quote)

    #POST: adds new quote to database
    def post(self):
        new_quote = Quote(
                content=request.json['content'],
                author=request.json['author']
                )
            db.session.add(new_quote)
            db.session.commit()
            return quote_schema.dump(new_quote)

    #PUT: updates quote at id or 404 otherwise
    def put(self, uid):
        quote = Quote.query.get_or_404(uid)

        if 'content' in request.json:
            quote.content = request.json['content']
        if 'author' in request.json:
            quote.author = request.json['author']

        db.session.commit()
        return post_schema.dump(quote)

    #DELETE: removes quote at id
    def delete(self, uid):
        quote = Quote.query.get_or_404(uid)
        db.session.delete(quote)
        db.session.commit()
        return '', 204

api.add_resource(Quote, '/quote', '/quote/<string:uid>')
api.add_resource(Comment, '/comment', '/comment/<string:uid>')

if __name__ == '__main__':
    app.run(debug=True)
