import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavigationItem = ({ to, icon, text, onClick }) => (
    <ListItem 
        component={to ? RouterLink : 'a'} 
        to={to} 
        href={to ? undefined : to} 
        target={to ? undefined : '_blank'} 
        onClick={onClick} 
        sx={{
            '&:hover': {
                bgcolor: 'rgba(0, 123, 255, 0.1)',
                transform: 'scale(1.0)',
                transition: 'transform 0.2s ease-in-out',
                '& .MuiTypography-root': {
                    color: '#1f61a2', // Change this to the desired hover color
                },
            }
        }}
    >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#4a4a4a' }}>{text}</Typography>} />
    </ListItem>
);

export default NavigationItem;
