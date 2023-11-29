import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import"./script.css"

const socket = io('http://localhost:9002');

function ChatSystem() {
  const [user] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);

  // Listen for new messages
  useEffect(() => {
    socket.on('receive-message', (data) => {
      // Update the chat history with the new message
      setMessages((prevMessages) => [...prevMessages, data]);
      // Scroll to the latest message
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    });
  }, []);

  const sendMessage = () => {
    const newMessage = { user, message };

     // Update the local chat history
  setMessages([...messages, newMessage]);

    // Send the message to the server
    socket.emit('send-message',  newMessage );
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat App</h1>
        <div className="user-info">
          <span>Welcome {user}!</span>
        </div>
      </div>
      <div className="message-container" ref={messageContainerRef}>
        {/* Display chat history */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === user ? 'own-message' : ''}`}
          >
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatSystem;
