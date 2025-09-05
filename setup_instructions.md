# AI Chat Assistant Setup Instructions

This application now includes a ChatGPT-like interface powered by Google Gemini AI.

## Prerequisites

1. Python 3.7 or higher
2. A Google Gemini API key

## Installation Steps

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 3. Configure Your Gemini API Key

**✅ IMPORTANT: The .env file has been created for you!**

A `.env` file has been created in the project root with a placeholder API key. You need to:

1. **Edit the `.env` file** in the project root
2. **Replace `your_gemini_api_key_here`** with your actual API key from Google AI Studio
3. **Save the file**

The `.env` file should look like this:
```
GEMINI_API_KEY=AIzaSyB...your_actual_key_here...
```

**Alternative: Set environment variable directly**
```bash
# Windows (Command Prompt)
set GEMINI_API_KEY=your_actual_api_key_here

# Windows (PowerShell)
$env:GEMINI_API_KEY="your_actual_api_key_here"

# Linux/macOS
export GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Test the Setup (Optional but Recommended)

```bash
python test_gemini.py
```

This will verify your API key is working correctly.

### 5. Run the Application

```bash
python app.py
```

The application will be available at `http://localhost:5000`

**🎉 Success! You should see:**
- Server starting message
- Access the app at `http://localhost:5000`
- Click "AI Chat Assistant" to start chatting!

## Features

The AI Chat Assistant includes:

- **ChatGPT-like Interface**: Modern chat UI with message bubbles
- **Real-time Responses**: Powered by Google Gemini AI
- **Session Management**: Maintains conversation context
- **Typing Indicators**: Shows when AI is thinking
- **Message History**: Scrollable chat history
- **Clear Chat**: Option to reset conversation
- **Responsive Design**: Works on desktop and mobile
- **Auto-resize Input**: Text area grows as you type

## Usage

1. Open the application in your browser
2. Click on "AI Chat Assistant" from the main menu
3. Type your message in the input field
4. Press Enter or click the send button
5. Wait for the AI response
6. Continue the conversation!

## Troubleshooting

### API Key Issues
- Make sure your Gemini API key is valid
- Check that the environment variable is set correctly
- Restart the application after setting the API key

### Connection Issues
- Check your internet connection
- Verify the Gemini API service is available
- Check the browser console for error messages

### UI Issues
- Clear your browser cache
- Try a different browser
- Check that JavaScript is enabled

## Features Overview

The application now includes 5 main features:

1. **Animal Selector**: Choose animals and see their emojis
2. **File Upload**: Upload files and see their information
3. **Word to One-Hot Vectors**: Convert words to vector representations
4. **Token Length Checker**: Count tokens in text
5. **AI Chat Assistant**: Chat with Google Gemini AI (NEW!)

Enjoy chatting with your AI assistant! 🤖
