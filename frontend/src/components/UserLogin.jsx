import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function AuthDialog({ open, onClose, onAuthenticate, isSignUp }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAuthenticate = () => {
        onAuthenticate(username, password, isSignUp);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isSignUp ? 'Sign Up' : 'Login'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAuthenticate} color="primary">
                    {isSignUp ? 'Sign Up' : 'Login'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function UserLogin() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleAuthenticate = (username, password, isSignUp) => {
        const url = `http://localhost:3000/${isSignUp ? 'signup' : 'login'}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'HTTP error! Status: ' + response.status);
                });
            }
            return response.json();
        })
        .then(data => {
            setMessage(data.message);
            setSnackbarOpen(true);
            if (data.authenticated) {
                localStorage.setItem('username', data.username); // Store the username
                setTimeout(() => navigate('/home'), 600); // Delay navigation
            }
        })
        .catch(error => {
            console.error('Authentication failed:', error);
            setMessage('Failed to authenticate. ' + error.message);
            setSnackbarOpen(true);
        });
    };

    return (
        <>
            <IconButton onClick={() => { setDialogOpen(true); setIsSignUp(false); }} color="inherit">
                <PersonIcon />
            </IconButton>
            <Button onClick={() => { setDialogOpen(true); setIsSignUp(true); }} className="button-sign-up">
                Sign Up
            </Button>
            <AuthDialog 
                open={dialogOpen} 
                onClose={() => setDialogOpen(false)} 
                onAuthenticate={handleAuthenticate} 
                isSignUp={isSignUp} 
                setMessage={setMessage} 
                setSnackbarOpen={setSnackbarOpen}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={message}
            />
        </>
    );
}
