# Animal Selector & File Upload Web Application

A Flask-based web application that demonstrates:
1. Animal selection with checkboxes and image display
2. File upload with detailed file information display

## Features

### Animal Selection Box
- Three checkboxes: Cat, Dog, Elephant
- Displays corresponding animal image when selected
- Only one animal can be selected at a time (radio-like behavior)

### File Upload Box
- Drag and drop or click to select files
- Supports any file type
- Shows file information: name, size (formatted and in bytes), and MIME type
- Files are stored in the `uploads/` directory

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
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # Stylesheet
│   ├── js/
│   │   └── script.js     # JavaScript functionality
│   └── images/
│       ├── cat.jpg       # Cat image (SVG)
│       ├── dog.jpg       # Dog image (SVG)
│       └── elephant.jpg  # Elephant image (SVG)
└── uploads/              # Directory for uploaded files
```

## How to Use

1. **Animal Selection:**
   - Click on any of the three checkboxes (Cat, Dog, Elephant)
   - The corresponding animal image will be displayed
   - Only one animal can be selected at a time

2. **File Upload:**
   - Either click on the upload area or drag and drop a file
   - After upload, you'll see the file's name, size, and type
   - Files are saved to the `uploads/` directory

## Technologies Used

- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Styling:** Modern CSS with gradients and animations
- **File Handling:** Werkzeug for secure file uploads

## Notes

- Maximum file upload size is set to 16MB
- Animal images are created as SVG graphics for demonstration
- The application includes drag-and-drop functionality for file uploads
- Responsive design works on both desktop and mobile devices
