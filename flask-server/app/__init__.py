# This can be empty for now, or you can move the create_app function here
# if you want to use the app factory pattern

from flask import Flask

def create_app():
    app = Flask(__name__)
    
    # Import and register blueprints here
    from app.routes.inventory import inventory_bp
    app.register_blueprint(inventory_bp, url_prefix='/api/inventory')
    
    return app