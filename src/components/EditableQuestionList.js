import React, { useState, useEffect } from 'react';
import {Box, List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';
import axios from 'axios';

const EditableQuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [editedQuestions, setEditedQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_ques_ans');
        setQuestions(response.data.response);
        setEditedQuestions(response.data.response);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchData();
  }, []);

  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[index].answer = value;
    setEditedQuestions(updatedQuestions);
  };
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[index].question = value;
    setEditedQuestions(updatedQuestions);
  };

  

  const handlePost = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/post_ques_ans', editedQuestions);
      setQuestions(editedQuestions);
    } catch (error) {
      console.error('Error posting questions:', error);
    }
  };

  return (
    <div>
      <List>
        {editedQuestions.map((qa, index) => (
          <React.Fragment key={index}>
            <ListItem  >
              <ListItemText
                primary={
                  <TextField
                    fullWidth
                    label="Question"
                    value={qa.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                  />
                }

                 
                secondary={
                <div style={{ marginTop: '10px' }}>
                  <TextField
                    fullWidth
                    label="Answer"
                    value={qa.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                  </div>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handlePost}>
        Post
      </Button>
    </div>
  );
};

export default EditableQuestionList;
