from . import ma
from ..models import QuoteModel

class QuoteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = QuoteModel
