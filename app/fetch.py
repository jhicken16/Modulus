from app import app
from flask import request, make_response, session, jsonify
from .tables import db, Models


@app.route("/create-entry", methods=['POST'])
def create_entry():
            
        image_blob = request.files['image'].read()

        model = Models(model_name=request.form["name"], description=request.form["description"], positions=request.form["positions"], image=image_blob, user_id=session["user_id"])
        db.session.add(model)
        db.session.commit()
        res = make_response(jsonify({"message": "JSON received"}), 200)
        
        return res

@app.route("/profile_model", methods=["POST"])
def model_respoce():
        
    req = request.form["get"]
    skip = request.form["skip"]

    mods = Models.query.filter(Models.user_id == session["user_id"]).limit(req).offset(skip)
    
    dict_array = []

    for mod in mods:
        
        responce_dict = {
          "id": mod._id,
          "name": mod.model_name,
          "description": mod.description,
        }    

        dict_array.append(responce_dict)

    res = make_response(dict_array)

    return res


@app.route("/profile_images", methods=["POST"])
def image_responce():
     
     req = request.get_json()
     
     mods = Models.query.filter(Models.user_id == session["user_id"]).offset(int(req)).first()
     
     res = make_response(mods.image)

     return res

@app.route("/explore_model", methods=["POST"])
def explore_model_respoce():
        
    req = request.form["get"]
    skip = request.form["skip"]

    mods = Models.query.limit(req).offset(skip)
    
    dict_array = []

    for mod in mods:
        
        responce_dict = {
          "id": mod._id,
          "name": mod.model_name,
          "description": mod.description,
        }    

        dict_array.append(responce_dict)

    res = make_response(dict_array)
    return res


@app.route("/explore_images", methods=["POST"])
def explore_image_responce():
     req = request.get_json()
     
     mods = Models.query.offset(int(req)).first()
     
     res = make_response(mods.image)

     return res
