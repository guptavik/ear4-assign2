from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_animal_image/<animal>')
def get_animal_image(animal):
    """Return the animal image data or placeholder"""
    animal_emojis = {
        'cat': '🐱',
        'dog': '🐶', 
        'elephant': '🐘'
    }
    
    if animal in animal_emojis:
        # Return emoji and name for client-side display
        return jsonify({
            'emoji': animal_emojis[animal],
            'name': animal.capitalize(),
            'success': True
        })
    return jsonify({'error': 'Invalid animal'}), 400

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and return file information"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file selected'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Get file information
        file_size = os.path.getsize(file_path)
        file_type = file.content_type or 'Unknown'
        
        return jsonify({
            'name': filename,
            'size': file_size,
            'type': file_type,
            'size_formatted': format_file_size(file_size)
        })

def format_file_size(size_bytes):
    """Convert bytes to human readable format"""
    if size_bytes == 0:
        return "0 B"
    size_names = ["B", "KB", "MB", "GB"]
    i = 0
    while size_bytes >= 1024 and i < len(size_names) - 1:
        size_bytes /= 1024.0
        i += 1
    return f"{size_bytes:.1f} {size_names[i]}"



if __name__ == '__main__':
    # Configuration for public IP access
    # You can override these with environment variables
    host = os.environ.get('FLASK_HOST', '0.0.0.0')  # Listen on all interfaces by default
    port = int(os.environ.get('FLASK_PORT', 5000))   # Default port 5000
    debug = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    
    print(f"Starting Flask server on {host}:{port}")
    print(f"Access the application at: http://{host}:{port}")
    if host == '0.0.0.0':
        print("Note: Server is accessible from any IP address on the network")
    
    app.run(
        host=host,
        port=port,
        debug=debug
    )
