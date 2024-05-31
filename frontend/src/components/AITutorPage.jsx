import React, { useState } from 'react';
import { Typography, Button, TextField, List, ListItem, ListItemText, Box } from '@mui/material';

function AITutorPage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        const newMessage = { sender: 'You', text: message };
        setMessages(prev => [...prev, newMessage]); // Display the user's message
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/ai-tutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message }) // Send the message to the backend
            });
            const data = await response.json();
            setMessages(prev => [...prev, { sender: 'AI', text: data.message }]); // Display AI's response
        } catch (error) {
            console.error('Failed to fetch response:', error);
            setMessages(prev => [...prev, { sender: 'AI', text: 'Failed to fetch response.' }]);
        } finally {
            setLoading(false);
            setMessage(''); // Clear the message input after sending
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>Hello, User!</Typography>
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
                    if (e.key === 'Enter' && !loading) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
                disabled={loading}
                sx={{ marginTop: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                disabled={loading || !message.trim()}
                sx={{ marginTop: 2 }}
            >
                Submit
            </Button>
        </Box>
    );
}

export default AITutorPage;
