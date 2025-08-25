# ERA-V4 Assignment 2

A Flask-based web application that demonstrates:
- Animal selection and display
- File upload with detailed information
- Word to One-Hot Vector conversion
- Token length checking

## Features

### AI Applications (Single-Page Interface)

- The main page (`index.html`) now hosts all AI-related applications within a single interface.
- Navigation is handled client-side with JavaScript to seamlessly switch between different tools.

#### Animal Selector
- Three checkboxes: Cat, Dog, Elephant
- Displays corresponding animal emoji when selected
- Only one animal can be selected at a time (radio-like behavior)

#### File Upload
- Drag and drop or click to select files
- Supports any file type
- Shows file information: name, size (formatted and in bytes), and MIME type
- Files are stored in the `uploads/` directory

#### Word to One-Hot Vectors
- Converts a list of words into their one-hot vector representations.
- Displays unique words and their corresponding vectors in a table format.
- Supports space or comma-separated input of words.

#### Token Length Checker
- Counts the number of tokens (words, simply split by spaces) in a given paragraph.
- Provides a quick way to estimate text length in terms of tokens.

## How to Use

1. **Open the Application:**
   - Ensure your Flask server is running (use `python app.py` or `python run_server.py`).
   - Open your browser to `http://localhost:5000`.

2. **Navigate Between Applications:**
   - The main page will display tiles for all available AI applications.
   - Click the "Open App" button on any tile to switch to that application's interface.
   - Use the "← Back to Main Applications" link to return to the main tile view.

3. **Using Specific Applications:**

   **Animal Selector:**
   - Click on any of the three checkboxes (Cat, Dog, Elephant) to see the corresponding animal emoji and name.

   **File Upload:**
   - Either click on the upload area or drag and drop a file.
   - After upload, you'll see the file's name, size, and type.

   **Word to One-Hot Vectors:**
   - Enter a list of words in the provided text area (space or comma separated).
   - Click "Get One-Hot Vectors" to see the results in a table.

   **Token Length Checker:**
   - Enter a paragraph or text in the provided text area.
   - Click "Count Tokens" to see the total token count.

## Setup and Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**

   **Option A: Simple run (accessible from any IP)**
   ```bash
   python app.py
   ```

   **Option B: Using the configuration runner**
   ```bash
   # For local development only
   python run_server.py --config development

   # For public access (default)
   python run_server.py --config public

   # For production
   python run_server.py --config production --no-debug

   # Custom host and port
   python run_server.py --host 192.168.1.100 --port 8080
   ```

3. **Access the application:**
   - **Local access:** `http://127.0.0.1:5000`
   - **Network access:** `http://[YOUR_LOCAL_IP]:5000`
   - **Public access:** `http://[YOUR_PUBLIC_IP]:5000`

## Configuration Options

### Environment Variables
You can set these environment variables to configure the server:

- `FLASK_HOST`: Host to bind to (default: '0.0.0.0')
- `FLASK_PORT`: Port to bind to (default: 5000)
- `FLASK_DEBUG`: Enable debug mode (default: 'True')
- `SECRET_KEY`: Secret key for Flask (set in production)

### Configuration Profiles
- **development**: Local development (127.0.0.1)
- **public**: Public access (0.0.0.0) with debug
- **production**: Production deployment (0.0.0.0) without debug

### Network Access Setup

**For Local Network Access:**
1. Find your local IP address: `ipconfig` (Windows) or `ifconfig` (Linux/Mac)
2. Make sure port 5000 is open in your firewall
3. Access via `http://[YOUR_LOCAL_IP]:5000`

**For Public Internet Access:**
1. Configure port forwarding on your router (port 5000)
2. Find your public IP address
3. Ensure your firewall allows incoming connections on port 5000
4. Access via `http://[YOUR_PUBLIC_IP]:5000`

**Security Note:** When running with public access, consider:
- Disabling debug mode in production (`--no-debug`)
- Setting a strong `SECRET_KEY` environment variable
- Using HTTPS in production environments
- Implementing proper authentication if needed

## Project Structure

```
ear4-assign2/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Main HTML template (now includes all app sections)
├── static/
│   ├── css/
│   │   └── style.css     # Stylesheet
│   ├── js/
│   │   └── script.js     # Unified JavaScript for all app functionality
│   └── images/
│       ├── cat.svg       # Cat emoji placeholder
│       ├── dog.svg       # Dog emoji placeholder
│       └── elephant.svg  # Elephant emoji placeholder
└── uploads/              # Directory for uploaded files
```

## Technologies Used

- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla, Single-Page Application style)
- **Styling:** Modern CSS with gradients and animations
- **File Handling:** Werkzeug for secure file uploads
- **AI Features:** Animal Selector, File Upload Information, Word to One-Hot Vector encoding, Token Length Checker

## Notes

- Maximum file upload size is set to 16MB
- Animal images are displayed using emojis for demonstration
- The application includes drag-and-drop functionality for file uploads
- Responsive design works on both desktop and mobile devices