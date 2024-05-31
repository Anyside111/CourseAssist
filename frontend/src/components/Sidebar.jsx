import React, { useState } from 'react';
import { Drawer, AppBar, Toolbar, Box, List, IconButton, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NavigationItem from './NavigationItem';
import UserLogin from './UserLogin';


const Sidebar = ({ open, toggleDrawer }) => {
    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" sx={{
                bgcolor: '#cadefc', //'rgba(40, 200, 180, 0.8)' Modern blue-grey color with transparency
                boxShadow: '5px -5px 10px rgba(0, 0, 0, 0.3), 5px 5px 10px rgba(0, 0, 0, 0.3)',
                zIndex: 1400,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 30px'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon style={{ color: '#333' }}/>
                    </IconButton>
                    <img src="/logo_CourseAssist.png" alt="CourseAssist AI Logo" style={{
                        height: 50,
                        marginLeft: '10px',
                        filter:  'drop-shadow(0px 0px 5px #666)',
                        borderRadius: '5px'
                    }} />
                </Box>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: open ? 50 : 50,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    '& .MuiDrawer-paper': {
                        width: open ? 240 : 72,
                        transition: 'width 0.3s',
                        overflowX: 'hidden',
                        boxSizing: 'border-box',
                        backgroundColor: 'white',
                        boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
                        borderRadius: 2,
                        marginTop: '75px',
                    }
                }}
            >
                <Box sx={{ flex: 1, overflow: 'auto', mt: '10px' }}>
                    <List>
                        <NavigationItem
                            to="/home"
                            icon={<HomeIcon />}
                            text="Home"
                            open={open}
                        />

                        <NavigationItem
                            to="/ai-tutor"
                            // to="https://app.courseassistai.com/courses/1000003/s1rZMDFTdIYNEJ9W6Pu6UdXUluf1_714f639f-4d04-4ed6-8763-08751ad61a69"
                            icon={<SchoolIcon />}
                            text="AI Tutor"
                            // onClick={() => window.open('/ai-tutor', '_blank')}
                            open={open}
                        />
                        <NavigationItem
                            to="/course-materials"
                            icon={<BookIcon />}
                            text="Materials"
                            open={open}
                        />
                        <NavigationItem
                            to="/conversations"
                            icon={<ChatIcon />}
                            text="Conversations"
                            open={open}
                        />
                        
                        <NavigationItem
                            to="/user-login"
                            icon={<UserLogin />}
                            text="User Login"
                            open={open}
                        />
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default Sidebar;
