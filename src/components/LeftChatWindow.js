import React, { useState } from 'react';
import { Paper, TextField, Button, SendIcon } from '@mui/material';

const LeftChatWindow = ({ onSendMessage }) => {
  const [userInput, setUserInput] = useState('');

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

  return (
    <Paper elevation={3} style={{ position: 'fixed', bottom: '20px', left: '20px', width: '300px' }}>
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
          endIcon={<SendIcon />}
          style={{ marginLeft: '10px' }}
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default LeftChatWindow;
