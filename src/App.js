import React, { useState } from 'react';
import { CssBaseline, Container, Grid, Paper } from '@mui/material';
import QuestionList from './components/QuestionList';
import EditableQuestionList from './components/EditableQuestionList';
import ChatButton from './components/ChatButton';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <CssBaseline />
      {isChatOpen && <ChatWindow onClose={toggleChat} />}
      <ChatButton onClick={toggleChat} />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <QuestionList />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <EditableQuestionList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
