from diagrams import Diagram, Cluster
from diagrams.generic.web import Browser
from diagrams.generic.database import SQL

with Diagram("Real Estate Web App Architecture", show=False):
    with Cluster("Frontend"):
        frontend = Browser("React.js")

    with Cluster("Backend"):
        backend = SQL("Django (Python)")

    with Cluster("Database"):
        database = SQL("MySQL")

    frontend - backend - database
