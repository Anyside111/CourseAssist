import React from 'react';
import { Drawer, AppBar, Toolbar, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import NavigationItem from './NavigationItem';

function Sidebar() {
    const navigate = useNavigate();

    const handleAITutorClick = () => {
        window.open('/ai-tutor', '_blank');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#F4F4F4' }}>
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
                        position: 'fixed',
                        height: '100vh',
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
                
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    <List>
                        <NavigationItem
                            to="/ai-tutor"
                            icon={<SchoolIcon />}
                            text="AI Tutor"
                            onClick={handleAITutorClick}
                        />
                        <NavigationItem
                            to="/course-materials"
                            icon={<BookIcon />}
                            text="Course Materials"
                        />
                        <NavigationItem
                            to="/conversations"
                            icon={<ChatIcon />}
                            text="Conversations"
                        />
                        <NavigationItem
                            to="/"
                            icon={<HomeIcon />}
                            text="Go back to courses"
                        />
                    </List>
                    {/* <List>
                     {['AI Tutor', 'Course Materials', 'Conversations', 'Go back to courses'].map((text, index) => (
                            <ListItem key={text} component={text === 'AI Tutor' ? 'a' : RouterLink} href={text === 'AI Tutor' ? 'https://app.courseassistai.com/courses/1000003/s1rZMDFTdIYNEJ9W6Pu6UdXUluf1_714f639f-4d04-4ed6-8763-08751ad61a69' : undefined} target={text === 'AI Tutor' ? '_blank' : undefined} to={text !== 'AI Tutor' ? '/' + text.replace(/\s/g, '-').toLowerCase() : undefined} sx={{
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
                    </List> */}
                </Box>
            </Drawer>
        </Box>
    );
}

export default Sidebar;
