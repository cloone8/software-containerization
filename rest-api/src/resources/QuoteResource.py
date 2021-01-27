from flask import request
from flask_restful import Resource
from ..models.QuoteModel import Quote
from ..models import db
from ..schemas import quote_schema

class QuoteResource(Resource):
    #GET w/ ID: gets quote with ID, or 404 otherwise
    
    def get(self, uid):
        quote_result = Quote.query.get_or_404(uid)
        return quote_schema.dump(quote_result), 200

    #POST: adds new quote to database
    def post(self):
        new_quote = Quote(
                content=request.json['content'],
                author=request.json['author']
                )
        db.session.add(new_quote)
        db.session.commit()
        return quote_schema.dump(new_quote), 201

    #PUT: updates quote at id or 404 otherwise
    def put(self, uid):
        quote_update = Quote.query.get_or_404(uid)

        if 'content' in request.json:
            quote_update.content = request.json['content']
        if 'author' in request.json:
            quote_update.author = request.json['author']

        db.session.commit()
        return quote_schema.dump(quote_update), 205

    #DELETE: removes quote at id
    def delete(self, uid):
        quote_update = Quote.query.get_or_404(uid)
        db.session.delete(quote_update)
        db.session.commit()
        return '', 204
