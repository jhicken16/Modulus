
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    _id = db.Column("id", db.Integer, primary_key=True)
    username = db.Column("username", db.String(50))
    email = db.Column("email", db.String(100))
    password = db.Column("password", db.String(50))

    def __init__(self, username, email, password):
        self.username=username
        self.email=email
        self.password=password

class Models(db.Model):
    _id = db.Column("id", db.Integer, primary_key=True)
    model_name = db.Column("name", db.String(50))
    description = db.Column("description", db.String(100))
    positions = db.Column("positions", db.JSON)
    image = db.Column("image", db.LargeBinary(None))
    user_id = db.Column("user_id", db.ForeignKey(_id) )

    def __init__(self, model_name, description, positions, image, user_id):

        self.model_name=model_name
        self.description=description
        self.positions=positions
        self.image=image
        self.user_id=user_id

