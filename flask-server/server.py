# from flask import Flask, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify({"message": "Hello from Flask!", "data": [1, 2, 3]})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)

from app import create_app
import os

# Create Flask application
app = create_app()

if __name__ == '__main__':
    # Get configuration from environment
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    port = int(os.getenv('FLASK_PORT', 5000))
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    
    print(f"Starting Botibot on {host}:{port}")
    app.run(host=host, port=port, debug=debug_mode)