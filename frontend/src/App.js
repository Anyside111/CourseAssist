import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Sidebar from './components/Sidebar';
import FileUpload from './components/FileUpload';
import FilePreview from './components/FilePreview';
import AITutorPage from './components/AITutorPage';
import HomePage from './components/HomePage';
import Signup from './components/SignUp';
import Conversations from './components/Conversations';
import UserLogin from './components/UserLogin';


const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar open={sidebarOpen} toggleDrawer={toggleSidebar} />
          <main style={{ flex: 1, padding: '20px', paddingTop: '80px', marginLeft: sidebarOpen ? 240 : 72, transition: 'margin-left 0.3s' }}>
            <Routes>
              <Route path="/ai-tutor" element={<AITutorPage />} />
              <Route path="/course-materials" element={<FileUpload />} />
              <Route path="/file-preview/:id" element={<FilePreview />} />
              <Route path="/home" element={<HomePage />} /> 
              <Route path="/signup" element={<Signup />} />
              <Route path="/conversations" element={<Conversations />} />
              <Route path="/login" element={<UserLogin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );

  // <Router>
    //   <Sidebar />
    //   <div className="container">
    //     <div className="sidebar">
    //       <Link to="/">Home</Link>
    //       <Link to="/file_upload">Upload File</Link>
    //       {/* Additional links */}
    //     </div>
    //     <div className="main">
    //       <Routes>
    //         <Route path="/file_upload" element={<FileUpload />} />
    //         {/* Other routes */}
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>




    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <p>
    //       <a href="/file_upload">File Upload</a>
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  // );
}

export default App;
