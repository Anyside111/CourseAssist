import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavigationItem = ({ to, icon, text, onClick, open }) => (
    <ListItem
        component={to && to.startsWith('http') ? 'a' : RouterLink}
        href={to && to.startsWith('http') ? to : undefined}
        target={to && to.startsWith('http') ? '_blank' : undefined}
        to={to && !to.startsWith('http') ? to : undefined}
        onClick={onClick}
        sx={{
            '&:hover': {
                bgcolor: 'rgba(0, 123, 255, 0.1)',
                transition: 'background-color 0.2s ease-in-out',
                '& .MuiTypography-root': {
                    color: '#1f61a2',
                },
            },
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
        }}
    >
        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
            {icon}
        </ListItemIcon>
        {open && <ListItemText primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#4a4a4a' }}>{text}</Typography>} />}
    </ListItem>
);

export default NavigationItem;
