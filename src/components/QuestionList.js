import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';
import axios from 'axios';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [editedQuestions, setEditedQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_predicted_ques_ans');
        setQuestions(response.data);
        setEditedQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchData();
  }, []);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[index].question = value;
    setEditedQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[index].answer = value;
    setEditedQuestions(updatedQuestions);
  };

  const handleAdd = async (index) => {
    try {
      const singleQAPair = [editedQuestions[index]];
      await axios.post('http://127.0.0.1:5000/post_ques_ans_single', singleQAPair);
    } catch (error) {
      console.error('Error posting question-answer pair:', error);
    }
  };

  return (
    <div>
      <List>
        {editedQuestions.map((qa, index) => (
          <React.Fragment key={index}>
            <ListItem>
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
              <Button variant="outlined" color="primary" onClick={() => handleAdd(index)}>
                Add
              </Button>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default QuestionList;
