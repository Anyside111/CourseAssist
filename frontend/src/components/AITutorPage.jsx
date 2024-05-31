import React, { useState } from 'react';
import { Typography, Button, TextField, List, ListItem, ListItemText, Box, Paper, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonIcon from '@mui/icons-material/Person';
import UserLogin from './UserLogin';


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

    const handleRefresh = () => {
        setMessage('');
        setMessages([]); // Clear conversation
    };

    return (
        <Box sx={{ padding: 2, maxWidth: 1500, margin: 'auto' }}>
            <Paper elevation={3} sx={{ padding: 2 }}>Welcome, User!
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <UserLogin />
                    <Typography variant="h5" gutterBottom></Typography>
                </Box>
                <List sx={{ maxHeight: 500, overflow: 'auto', bgcolor: 'background.paper' }}>
                    {messages.map((msg, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${msg.sender}: ${msg.text}`} />
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !loading) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <IconButton color="primary" onClick={handleSendMessage} disabled={loading || !message.trim()}>
                        <SendIcon />
                    </IconButton>
                </Box>
                <Button startIcon={<RefreshIcon />} variant="outlined" onClick={handleRefresh} sx={{ mt: 2 }}>
                    Reset
                </Button>
            </Paper>
        </Box>
    );
}

export default AITutorPage;
