import React from 'react';
import { Drawer, AppBar, Toolbar, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';

function SidebarScorll() {
    return (
        // Combined the AppBar and Drawer inside a single Box to ensure they are treated as a single vertical layout.
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBar position="static" sx={{
                bgcolor: 'primary.main',
                backgroundImage: 'linear-gradient(45deg, #f0f0f0 30%, #ffffff 90%)',
                padding: '20px 0',
                // boxShadow: 'inset 5px 5px 10px rgba(0, 0, 0, 0.5), inset -5px -5px 10px rgba(255, 255, 255, 0.5)',
                // boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
                boxShadow: '5px -5px 10px rgba(0, 0, 0, 0.3), 5px 5px 10px rgba(0, 0, 0, 0.3)',
                borderRadius: 1, 
                zIndex: 1400,
                position: 'relative'
            }}>
                <Toolbar sx={{
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center' 
                }}>
                     <img src="/logo_CourseAssist.png" alt="CourseAssist AI Logo" style={{ 
                        height: 70,
                        filter: 'drop-shadow(2px 4px 6px grey)' // Adds a subtle shadow to make the logo pop
                    }} />
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                        position: 'relative',
                        bgcolor: 'background.paper',
                        boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
                        borderRadius: 2,
                        top: 0, // Ensures the drawer starts from the top
                        height: '100vh', // Full height
                        mt: 0 // Removes top margin
                    }
                }}
            >
                <Toolbar /> {/* Empty Toolbar to push content down */}
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
            </Drawer>
        </Box>
    );
}

export default SidebarScorll;
