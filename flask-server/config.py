import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'ondababy'
    
    DATABASE_PATH = BASE_DIR / 'data' / 'botibot.db'
    DATABASE_URL = f'sqlite:///{DATABASE_PATH}'
    
    SERVO_PINS = {
        'compartment_1': 18,
        'compartment_2': 19,
        'compartment_3': 20,
        'compartment_4': 21
    }
    LOG_DIR = BASE_DIR / 'logs'
    LOG_LEVEL = 'INFO'
    
    API_PREFIX = '/api/v1'
    CORS_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']
    
class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    LOG_LEVEL = 'DEBUG'

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DATABASE_PATH = ':memory:'  # In-memory database for tests

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}