import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Paper, Box, Typography } from '@mui/material';

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = localStorage.getItem('username');
    
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/conversations');
                if (!response.ok) {
                    throw new Error('Failed to fetch conversations');
                }
                const data = await response.json();
                setConversations(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <Box sx={{ padding: 2, maxWidth: 800, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Conversations</Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <List>
                    {conversations.map((conversation) => (
                        <ListItem key={conversation.id}>
                            <ListItemText
                                primary={conversation.message}
                                secondary={new Date(conversation.timestamp).toLocaleString()}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default Conversations;
