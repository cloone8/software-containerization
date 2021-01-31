from marshmallow import Schema, fields, ValidationError
from ..models import db, CommentModel

def must_not_be_blank(data):
    if not data:
        raise ValidationError("Field not provided")

class CommentSchema(Schema):
    uid = fields.Int(dump_only=True)
    content = fields.Str(required=True, validate=must_not_be_blank)
    author = fields.Str(required=True, validate=must_not_be_blank)
    createdAt = fields.DateTime(dump_only=True)
    modifiedAt = fields.DateTime(dump_only=True)
