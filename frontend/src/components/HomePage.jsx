import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserLogin from './UserLogin';

function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform any necessary cleanup or state reset here
        setIsAuthenticated(false);
        navigate('/'); // Navigate back to the login page
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                bgcolor: '#f5f5f5',
                padding: 3,
            }}
        >
            <Typography variant="h4">Welcome to CourseAssist AI</Typography>
            {!isAuthenticated ? (
                <UserLogin setIsAuthenticated={setIsAuthenticated} />
            ) : (
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Log Out
                </Button>
            )}
        </Box>
    );
}

export default HomePage;
