from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from supabase import create_client, Client
from datetime import datetime
import os
from typing import Dict, Any
import uuid

app = Flask(__name__)
CORS(app)

# Initialize Gemini API
genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

# Initialize Supabase client
supabase: Client = create_client(
    os.environ.get('SUPABASE_URL'),
    os.environ.get('SUPABASE_ANON_KEY')
)

# ISH System Prompt
SYSTEM_PROMPT = """You are ISH (Innovatrix Health Bot), an AI-driven public health assistant.

🎯 Goals:
- Educate rural and semi-urban populations about preventive healthcare, common diseases, vaccination, nutrition
- Provide real-time health information when available
- Be concise, clear, and culturally sensitive
- Use simple language for low literacy audiences
- Always respond in the user's selected language

🧭 Guidelines:
1. Keep responses short (2-4 sentences max)
2. If uncertain, say: "Please check with a local health worker for confirmation"
3. Never give harmful advice
4. For emergencies (chest pain, high fever, breathing issues): "Visit nearest hospital or call emergency immediately"
5. Include actionable tips (wash hands, drink clean water, use mosquito nets)
6. Maintain friendly, caring, trustworthy tone

Language: {lang}
User Message: {message}

Respond appropriately in the specified language."""

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handle chat requests with ISH bot
    Input: {"message": string, "lang": string}
    Output: {"reply": string, "session_id": string, "status": string}
    """
    try:
        # Extract request data
        data = request.get_json()
        
        # Validate input
        if not data or 'message' not in data or 'lang' not in data:
            return jsonify({
                'error': 'Missing required fields: message and lang',
                'status': 'error'
            }), 400
        
        user_message = data['message']
        language = data['lang']
        
        # Get or create session ID (for tracking conversation threads)
        session_id = data.get('session_id', str(uuid.uuid4()))
        
        # Prepare prompt with system instructions
        full_prompt = SYSTEM_PROMPT.format(
            lang=language,
            message=user_message
        )
        
        # Generate response from Gemini
        try:
            response = model.generate_content(full_prompt)
            bot_reply = response.text
        except Exception as gemini_error:
            # Fallback response if Gemini fails
            bot_reply = "I'm having trouble connecting right now. Please try again or contact a health worker."
            print(f"Gemini API Error: {gemini_error}")
        
        # Save to Supabase - chat history table
        chat_record = {
            'session_id': session_id,
            'user_message': user_message,
            'bot_reply': bot_reply,
            'language': language,
            'created_at': datetime.utcnow().isoformat(),
            'metadata': {
                'ip': request.remote_addr,
                'user_agent': request.headers.get('User-Agent', 'Unknown')
            }
        }
        
        try:
            # Insert chat record into Supabase
            supabase.table('chat_history').insert(chat_record).execute()
        except Exception as db_error:
            # Log error but don't fail the request
            print(f"Database Error: {db_error}")
            # Continue without saving if DB fails
        
        # Return successful response
        return jsonify({
            'reply': bot_reply,
            'session_id': session_id,
            'status': 'success'
        }), 200
        
    except Exception as e:
        # Handle unexpected errors
        print(f"Unexpected Error: {e}")
        return jsonify({
            'error': 'An unexpected error occurred',
            'status': 'error'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """API health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'ISH Bot API'}), 200

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Endpoint not found', 'status': 'error'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({'error': 'Internal server error', 'status': 'error'}), 500

if __name__ == '__main__':
    # Run in production with gunicorn instead
    app.run(debug=False, host='0.0.0.0', port=5000)
