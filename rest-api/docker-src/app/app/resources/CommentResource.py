from flask import request
from flask_restful import Resource
from ..models.CommentModel import Comment
from ..models import db
from ..schemas import comment_schema

class CommentResource(Resource):
    #GET w/ ID: gets quote with ID, or 404 otherwise
    
    def get(self, uid):
        comment_result = Comment.query.get_or_404(uid)
        return comment_schema.dump(comment_result), 200

    #POST: adds new quote to database
    def post(self):
        new_comment = Comment(
                content=request.json['content'],
                author=request.json['author']
                )
        db.session.add(new_comment)
        db.session.commit()
        return comment_schema.dump(new_comment), 201

    #PUT: updates quote at id or 404 otherwise
    def put(self, uid):
        comment_update = Comment.query.get_or_404(uid)

        if 'content' in request.json:
            comment_update.content = request.json['content']
        if 'author' in request.json:
            comment_update.author = request.json['author']
        if 'createdAt' in request.json:
            comment_update.createdAt = request.json['createdAt']
        if 'modifiedAt' in request.json:
            comment_update.modifiedAt = request.json['modifiedAt']

        db.session.commit()
        return comment_schema.dump(comment_update), 205

    #DELETE: removes quote at id
    def delete(self, uid):
        comment_update = Comment.query.get_or_404(uid)
        db.session.delete(comment_update)
        db.session.commit()
        return '', 204
