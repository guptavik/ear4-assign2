"""
Flask Application Configuration
"""
import os

class Config:
    """Base configuration class"""
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Upload settings
    UPLOAD_FOLDER = 'uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Server settings
    HOST = os.environ.get('FLASK_HOST', '0.0.0.0')
    PORT = int(os.environ.get('FLASK_PORT', 5000))
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    HOST = '127.0.0.1'  # Local development

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    HOST = '0.0.0.0'  # Accept connections from any IP

class PublicConfig(Config):
    """Public access configuration"""
    DEBUG = True  # Can be disabled for production
    HOST = '0.0.0.0'  # Accept connections from any IP
    PORT = 5000

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'public': PublicConfig,
    'default': PublicConfig
}
