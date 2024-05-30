import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SidebarScorll from './components/Sidebar_scrollable';
import FileUpload from './components/FileUpload';
import FilePreview from './components/FilePreview';


function App() {
  return (
    <Router>
       <div style={{ display: 'flex' }}>
        <Sidebar />
        {/* <SidebarScorll /> */}
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/course-materials" element={<FileUpload />} />
            <Route path="/file-preview/:id" element={<FilePreview />} />
            {/* Define other routes here */}
          </Routes>
        </main>
      </div>
    </Router>
    
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
