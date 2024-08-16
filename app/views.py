from app import app
from flask import render_template, request, redirect, session
from werkzeug.security import check_password_hash, generate_password_hash
from .tables import db, Users, Models
from .helpers import login_required
import json

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    
app.config["SECRET_KEY"] = "MRY0_Cd49ZwrXKS3Zpd3bw"


@app.route("/")
@login_required
def index():
    return render_template("public/index.html")


@app.route("/about")
@login_required
def about():
    return render_template("public/about.html")


@app.route("/sign_up", methods=["GET", "POST"])
def sign_up():

    if request.method == "POST":

        req = request.form
        username = req["username"]
        email = req["email"]
        password = req["password"]
        confirm_password = req["confirm_password"]

        if not username:
            return "Must provide username"
        if not email:
            return "Must provide email"
        if not password:
            return "Must provide password"
        if not confirm_password:
            return "Must confirm password"

        hash = generate_password_hash(password)

        if check_password_hash(hash, confirm_password) == False:
            return "Password is not matched"
        
        #add user to db
        found_username = Users.query.filter_by(username=username).first()
        found_email = Users.query.filter_by(email=email).first()
        if found_username:
            return "Username already exist"
        elif found_email:
            return "Email already exist"
        else:
            usr = Users(username=username, email=email, password=hash)
            db.session.add(usr)
            db.session.commit()

        usr = Users.query.filter_by(email=email).first()

        session["user_id"] = usr._id

        return redirect("/")

    return render_template("public/sign_up.html")



@app.route("/login", methods=["GET", "POST"])
def login():

    #clears the session 
    # But if we want to store model if user has created on and then get redirected to login on 
    #we are gunna want to save that info in cookies or session. In wich case we would not want to clear it 

    if request.method == "POST":
        req = request.form
        email = req["email"]
        password = req["password"]

        if not email:
            return "Must provide email"
        if not password:
            return "Must provide password"
        
        found_email = Users.query.filter_by(email=email).first()
        
        if found_email:
            if check_password_hash(found_email.password, password) == False:
                return "Incorect Password"
        else:
            return "Not valid email"
        

        session["user_id"] = found_email._id
        print(session["user_id"])

        return render_template("/public/index.html")

    return render_template("/public/login.html")



    
@app.route("/profile", methods=['GET', 'POST'])
def creat_profile_contence():

    if request.method == "POST":
        req = request.form
        id = req["id"]

        #query table and render template passing positions array
        mods = Models.query.filter(Models._id == id).first()
        
        return render_template("/public/index.html", mod=mods.positions)
    else:

        user_name = Users.query.with_entities(Users.username, Users._id).filter(Users._id == session["user_id"]).first()

        return render_template("/public/profile.html", user_name=user_name)

@app.route("/explore", methods=['GET', 'POST'])
def create_explore_content():

    if request.method == "POST":
        req = request.form
        id = req["id"]

        #query table and render template passing positions array
        mods = Models.query.filter(Models._id == id).first()
        
        return render_template("/public/index.html", mod=mods.positions)
    else:

        return render_template("/public/explore.html")

