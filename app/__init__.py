from flask import Flask

app = Flask(__name__)

from app import views 
from app import addmin_views
from app import fetch
