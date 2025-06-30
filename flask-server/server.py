from flask import Flask
from flask_cors import CORS
from app.database.database import init_database
from app.routes.inventory import inventory_bp

def create_app():
    app = Flask(__name__)
    
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:5173"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Initialize database
    init_database()
    
    # Register blueprints
    app.register_blueprint(inventory_bp, url_prefix='/api/inventory')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)