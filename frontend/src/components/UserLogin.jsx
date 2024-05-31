import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function LoginDialog({ open, onClose, onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        onLogin(username, password);
        onClose(); // Close dialog after attempt
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
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
                <Button onClick={handleLoginClick} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function UserLogin() {
    const [open, setOpen] = useState(false);

    const handleLogin = (username, password) => {
        console.log('Login Attempt:', username, password);
        // Here you would usually handle authentication
    };

    return (
        <>
            <IconButton onClick={() => setOpen(true)} color="inherit">
                <PersonIcon />
            </IconButton>
            <LoginDialog open={open} onClose={() => setOpen(false)} onLogin={handleLogin} />
        </>
    );
}
