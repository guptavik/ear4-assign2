"""
Gemini AI Service for ChatGPT-like functionality
"""
import google.generativeai as genai
import os
from typing import Optional, Dict, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiService:
    """Service class for interacting with Google's Gemini AI"""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize the Gemini service with API key"""
        self.api_key = api_key or os.environ.get('GEMINI_API_KEY')
        
        if not self.api_key:
            raise ValueError("Gemini API key is required. Set GEMINI_API_KEY environment variable.")
        
        # Configure the API
        genai.configure(api_key=self.api_key)
        
        # Initialize the model (using the updated model name)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Chat history for maintaining context
        self.chat_sessions = {}
        
    def get_response(self, message: str, session_id: str = "default") -> Dict[str, Any]:
        """
        Get a response from Gemini AI
        
        Args:
            message (str): The user's message
            session_id (str): Session ID to maintain conversation context
            
        Returns:
            Dict containing response and metadata
        """
        try:
            # Get or create chat session
            if session_id not in self.chat_sessions:
                self.chat_sessions[session_id] = self.model.start_chat(history=[])
            
            chat = self.chat_sessions[session_id]
            
            # Send message and get response
            response = chat.send_message(message)
            
            return {
                'success': True,
                'response': response.text,
                'session_id': session_id,
                'message_count': len(chat.history)
            }
            
        except Exception as e:
            logger.error(f"Error getting Gemini response: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'response': "I'm sorry, I'm having trouble processing your request right now. Please try again."
            }
    
    def clear_session(self, session_id: str = "default") -> bool:
        """Clear a specific chat session"""
        if session_id in self.chat_sessions:
            del self.chat_sessions[session_id]
            return True
        return False
    
    def get_session_history(self, session_id: str = "default") -> list:
        """Get chat history for a session"""
        if session_id in self.chat_sessions:
            return [
                {
                    'role': msg.role,
                    'content': msg.parts[0].text if msg.parts else ''
                }
                for msg in self.chat_sessions[session_id].history
            ]
        return []

# Global instance
_gemini_service = None

def get_gemini_service() -> GeminiService:
    """Get or create the global Gemini service instance"""
    global _gemini_service
    if _gemini_service is None:
        try:
            _gemini_service = GeminiService()
        except ValueError as e:
            logger.error(f"Failed to initialize Gemini service: {e}")
            _gemini_service = None
    return _gemini_service
