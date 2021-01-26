import datetime
from . import db

class QuoteModel(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime)
    modifiedAt = db.Column(db.DateTime)

    def __repr__(self):
        return '<Quote: %s>' % self.content
