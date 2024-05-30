import React from 'react';
import { Drawer, AppBar, Toolbar, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

function Sidebar() {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                        bgcolor: 'background.paper',
                        boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'fixed', // Fixes the drawer to the viewport
                        height: '100vh', // Full height
                    }
                }}
            >
                <AppBar position="relative" sx={{
                    bgcolor: 'primary.main',
                    backgroundImage: 'linear-gradient(45deg, #f0f0f0 30%, #ffffff 90%)',
                    padding: '20px 0',
                    boxShadow: '5px -5px 10px rgba(0, 0, 0, 0.3), 5px 5px 10px rgba(0, 0, 0, 0.3)',
                    borderRadius: 1,
                    zIndex: 1400,
                }}>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src="/logo_CourseAssist.png" alt="CourseAssist AI Logo" style={{
                            height: 70,
                            filter: 'drop-shadow(2px 4px 6px grey)'
                        }} />
                    </Toolbar>
                </AppBar>
                
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                    <List>
                        {['AI Tutor', 'Course Materials', 'Conversations', 'Go back to courses'].map((text, index) => (
                            <ListItem key={text} component={RouterLink} to={'/' + text.replace(/\s/g, '-').toLowerCase()} sx={{
                                '&:hover': {
                                    bgcolor: 'rgba(0, 123, 255, 0.1)',
                                    transform: 'scale(1.0)',
                                    transition: 'transform 0.2s ease-in-out'
                                }
                            }}>
                                <ListItemIcon>
                                    {[<SchoolIcon />, <BookIcon />, <ChatIcon />, <HomeIcon />][index]}
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '20px', color: '#4a4a4a' }}>{text}</Typography>} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default Sidebar;
