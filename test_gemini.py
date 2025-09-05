#!/usr/bin/env python3
"""
Test script for Gemini API integration
"""
import os
import sys
from dotenv import load_dotenv
from gemini_service import get_gemini_service

# Load environment variables from .env file
load_dotenv()

def test_gemini_connection():
    """Test the Gemini API connection"""
    print("Testing Gemini API connection...")
    
    # Check if API key is set
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        print("❌ GEMINI_API_KEY is not set")
        print("\nTo set it:")
        print("1. Edit the .env file in the project root")
        print("2. Replace 'your_gemini_api_key_here' with your actual API key")
        print("3. Save the file and run this test again")
        print("\nAlternatively, set environment variable:")
        print("Windows: set GEMINI_API_KEY=your_api_key_here")
        print("Linux/macOS: export GEMINI_API_KEY=your_api_key_here")
        return False
    
    print(f"✅ API key found: {api_key[:10]}...")
    
    try:
        # Initialize service
        service = get_gemini_service()
        if not service:
            print("❌ Failed to initialize Gemini service")
            return False
        
        print("✅ Gemini service initialized successfully")
        
        # Test a simple query
        print("\nTesting with a simple message...")
        result = service.get_response("Hello! Can you respond with just 'Hello from Gemini'?")
        
        if result['success']:
            print(f"✅ Response received: {result['response']}")
            return True
        else:
            print(f"❌ Error: {result['error']}")
            return False
            
    except Exception as e:
        print(f"❌ Exception occurred: {str(e)}")
        return False

def main():
    """Main test function"""
    print("=" * 50)
    print("Gemini API Integration Test")
    print("=" * 50)
    
    success = test_gemini_connection()
    
    print("\n" + "=" * 50)
    if success:
        print("✅ All tests passed! Gemini integration is working.")
        print("\nYou can now run the Flask app with: python app.py")
    else:
        print("❌ Tests failed. Please check your configuration.")
        print("\nMake sure to:")
        print("1. Set your GEMINI_API_KEY environment variable")
        print("2. Install dependencies: pip install -r requirements.txt")
        print("3. Check your internet connection")
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
