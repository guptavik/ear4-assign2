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

@app.route('/one_hot_vectors')
def one_hot_vectors():
    return render_template('one_hot_vectors.html')

@app.route('/api/one_hot_encode', methods=['POST'])
def one_hot_encode():
    data = request.get_json()
    if not data or 'words' not in data:
        return jsonify({'error': 'No words provided'}), 400

    words = data['words']
    unique_words = sorted(list(set(words)))
    
    word_to_index = {word: i for i, word in enumerate(unique_words)}
    
    one_hot_vectors = []
    for word in words:
        vector = [0] * len(unique_words)
        if word in word_to_index:
            vector[word_to_index[word]] = 1
        one_hot_vectors.append(vector)
            
    return jsonify({
        'unique_words': unique_words,
        'one_hot_vectors': one_hot_vectors
    })

@app.route('/token_checker')
def token_checker():
    return render_template('token_checker.html')

@app.route('/api/count_tokens', methods=['POST'])
def count_tokens():
    data = request.get_json()
    if not data or 'paragraph' not in data:
        return jsonify({'error': 'No paragraph provided'}), 400

    paragraph = data['paragraph'].strip()
    if not paragraph:
        return jsonify({'count': 0})

    # Simple tokenization by splitting by spaces
    tokens = paragraph.split()
    token_count = len(tokens)
            
    return jsonify({
        'token_count': token_count
    })

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
