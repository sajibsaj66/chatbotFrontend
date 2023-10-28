import React, { useState, useEffect, useRef } from 'react';
import { Paper } from '@mui/material';

const RightChatWindow = ({ messages, onSendMessage }) => {
  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');

  const chatContainerRef = useRef(null);

  const handleSend = () => {
    if (userInput.trim() !== '') {
      onSendMessage(userInput);
      setUserInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Simulate a chatbot response (you can replace this with API integration)
    if (userInput) {
      setTimeout(() => {
        setChatbotResponse(`Chatbot response to "${userInput}"`);
      }, 1000);
    }
  }, [userInput]);

  useEffect(() => {
    // Scroll to the bottom when new message comes in
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Paper elevation={3} style={{ position: 'fixed', bottom: '20px', right: '20px', width: '90%', height: '90%' }}>
      <div ref={chatContainerRef} style={{ maxHeight: 'calc(100% - 120px)', overflowY: 'scroll', height: '100%' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ padding: '10px', textAlign: message.type === 'user' ? 'right' : 'left' }}>
            <span style={{ backgroundColor: message.type === 'user' ? '#ccf2ff' : '#f0f0f0', padding: '5px 10px', borderRadius: '5px', display: 'inline-block' }}>
              {message.text}
            </span>
          </div>
        ))}
        {/* Display chatbot response */}
        {chatbotResponse && (
          <div style={{ padding: '10px', textAlign: 'left' }}>
            <span style={{ backgroundColor: '#f0f0f0', padding: '5px 10px', borderRadius: '5px', display: 'inline-block' }}>
              {chatbotResponse}
            </span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default RightChatWindow;
