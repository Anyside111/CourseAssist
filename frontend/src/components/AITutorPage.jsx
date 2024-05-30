// src/components/AITutorPage.jsx
import React, { useState } from 'react';
import { Typography, Button, TextField, List, ListItem, ListItemText, Box } from '@mui/material';

function AITutorPage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        const newMessage = { sender: 'You', text: message };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setMessage('');

        const aiResponse = { sender: 'AI', text: 'This is a simulated response from the AI.' };
        setTimeout(() => {
            setMessages([...newMessages, aiResponse]);
        }, 1000);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Hello, User!
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>SIGN OUT</Button>
            <Button variant="contained" color="secondary" sx={{ marginRight: 1 }}>SEND EMAIL VERIFICATION</Button>
            <Button variant="contained" color="secondary">SEND PASSWORD RESET EMAIL</Button>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                Hi! I'm CourseAssist AI, your AI-powered course assistant. I can answer questions about your course content. Let me know what I can help you with today!
            </Typography>

            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${msg.sender}: ${msg.text}`} />
                    </ListItem>
                ))}
            </List>

            <TextField
                variant="outlined"
                fullWidth
                placeholder="What can I help you with? Ask your question here."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
                sx={{ marginTop: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                sx={{ marginTop: 2 }}
            >
                Submit
            </Button>
        </Box>
    );
}

export default AITutorPage;
