from .quote import QuoteSchema
from .comment import CommentSchema

quote_schema = QuoteSchema()
quotes_schema = QuoteSchema(many=True)

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
