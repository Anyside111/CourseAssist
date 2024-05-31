import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignup = () => {
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.message);
            setSnackbarOpen(true);
            if (data.authenticated) {
                setTimeout(() => navigate('/home'), 2000); // Delay navigation to ensure message is read
            }
        })
        .catch(err => {
            console.error('Error:', err);
            setMessage('Failed to register. ' + err.message);
            setSnackbarOpen(true);
        });
    };

    return (
        <Box sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSignup}>
                Sign Up
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={message}
            />
        </Box>
    );
}
