from flask import request
from flask_restful import Resource
from ..models.QuoteModel import Quote
from ..models import db
from ..schemas import quotes_schema

class QuotesResource(Resource):
    #GET: gets all quotes or 404 otherwise

    def get(self):
        quotes_result = Quote.query.all()
        if quotes_result:
            return quotes_schema.dump(quotes_result), 200
        else:
            return '', 404
