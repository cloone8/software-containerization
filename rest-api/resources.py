from flask import request
from flask_restful import Resource
from app import db, quote_schema, QuoteModel

#define verbs

class QuoteResource(Resource):
    #GET w/ ID: gets quote with ID, or 404 otherwise
    def get(self, uid):
        quote = QuoteModel.query.get_or_404(uid)
        return quote_schema.dump(quote)

    #POST: adds new quote to database
    def post(self):
        new_quote = QuoteModel(
                content=request.json['content'],
                author=request.json['author']
                )
            db.session.add(new_quote)
            db.session.commit()
            return quote_schema.dump(new_quote)

    #PUT: updates quote at id or 404 otherwise
    def put(self, uid):
        quote = QuoteModel.query.get_or_404(uid)

        if 'content' in request.json:
            quote.content = request.json['content']
        if 'author' in request.json:
            quote.author = request.json['author']

        db.session.commit()
        return quote_schema.dump(quote)

    #DELETE: removes quote at id
    def delete(self, uid):
        quote = QuoteModel.query.get_or_404(uid)
        db.session.delete(quote)
        db.session.commit()
        return '', 204
