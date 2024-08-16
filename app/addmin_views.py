from app import app
from flask import render_template, request, redirect

@app.route("/admin/dashboard")
def admin_dashboard():
    return render_template("admin/admin_dashboard.html")

@app.route("/admin/profile")
def admin_profile():
    return "<h1 style='color: red'>Admin profile!</h1>"