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
   ```bash
   python app.py
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:5000
   ```

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
