from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)


genai.configure(api_key="YOUR_API_KEY_HERE")


college_data = """
You are the official, professional virtual assistant for the College of Applied Science, Vadakkencherry (CASVDY).
Your job is to answer student and visitor questions politely, warmly, and professionally.

Here is the only information you know about the college:
- Location: Erassankulam PO, NH544, Vadakkencherry, Palakkad, Kerala - 678683.
- Courses offered: Undergraduate and Postgraduate programs in Computer Science, Electronics, and Commerce.
- Contact: +91 8547 005 042.
- Departments: Computer Science, Electronics, and Commerce.
- Fees: Varies by course, generally around INR 13,000 to 20,000 per year for undergraduate programs.

Rules:
1. If a user asks a question unrelated to the college (like "how to code" or "what is the capital of France"), politely decline to answer and remind them you are the CASVDY college assistant.
2. Keep your answers concise, conversational, and helpful. 
3. Do not use special formatting (like bolding or bullet points), just return plain text.
"""

# Initialize the Gemini AI model 
model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    system_instruction=college_data
)

#  The Chat Endpoint
@app.route('/chat', methods=['POST'])
def chat():
    user_data = request.json
    user_message = user_data.get("message", "")
    
    if not user_message:
        return jsonify({"response": "Please say something!"})
        
    try:
        # Send the user's message to our customized Gemini AI
        response = model.generate_content(user_message)
        bot_response = response.text
    except Exception as e:
        print(f"Error: {e}")
        bot_response = "I am having a little trouble connecting to my servers right now. Please try again later or call the college office."
        
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)