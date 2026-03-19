import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you with CASVDY today?' }
  ]);
  const [input, setInput] = useState('');
  
  // NEW: A switch to track if the AI is currently thinking
  const [isLoading, setIsLoading] = useState(false); 
  
  // NEW: An automatic scroller to keep the chat at the bottom
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput(''); 
    
    // Turn the loading switch ON right before we ask the Python server
    setIsLoading(true); 

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: data.response }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Error: Cannot connect to Python server.' }]);
    } finally {
      // Turn the loading switch OFF whether it succeeded or failed
      setIsLoading(false); 
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>College of Applied Science, Vadakkencherry</h1>
        <p>Professional AI Portal</p>
      </header>

      <div className="main-content">
        <h2>Welcome to the official CASVDY Assistant</h2>
        <p>Our AI is trained specifically on college data to help answer your queries instantly.</p>
      </div>
      
      <div className="chat-container">
        <div className="chat-header">CASVDY Assistant</div>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}-message`}>
              {msg.text}
            </div>
          ))}
          
          {/* NEW: If isLoading is true, show this cool typing animation */}
          {isLoading && (
            <div className="message bot-message typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
          
          <div ref={chatEndRef} /> {/* Invisible element to scroll to */}
        </div>
        
        <div className="input-area">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask a question..."
            disabled={isLoading} /* Prevent typing while bot is thinking */
          />
          <button onClick={sendMessage} disabled={isLoading}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;