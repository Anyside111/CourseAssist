import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { List, ListItem, ListItemText, Button, Card, CardContent, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const CardStyled = styled(Card)(({ theme }) => ({
    margin: '20px 0',
    padding: theme.spacing(2),
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    backgroundColor: '#fff',
}));

const UploadButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    backgroundColor: '#28a745',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#218838',
    },
}));

const ChooseButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#0056b3',
    },
}));

const FileList = styled(List)(({ theme }) => ({
    paddingLeft: theme.spacing(2),
}));

const FileItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    borderBottom: '1px solid #e0e0e0',
}));

const FileName = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
}));

function FileUpload() {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [lastUpdate, setLastUpdate] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: handleDrop,
        noClick: true,
        noKeyboard: true
    });

    const handleFileUpload = () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('uploadedFile', file);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(() => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1500); // Auto-hide after 3 seconds
            setFile(null); // Reset file input
            fetchFiles(); // Refresh file list after upload
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const fetchFiles = () => {
        fetch('http://localhost:3000/api/files')
            .then(response => response.json())
            .then(data => {
                setFiles(data);
                if (data.length > 0) {
                    setLastUpdate(new Date(data[0].upload_date).toLocaleString());
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleFileDelete = (fileId) => {
        fetch(`http://localhost:3000/api/files/${fileId}`, {
            method: 'DELETE',
        })
        .then(response => response.text())
        .then(() => {
            setShowDeleteSuccess(true);
            setTimeout(() => setShowDeleteSuccess(false), 1500); // Auto-hide after 1.5 seconds
            fetchFiles(); // Refresh file list after delete
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    useEffect(() => {
        fetchFiles(); // Fetch files on component mount
    }, []);

    const handlePreview = (fileId) => {
        navigate(`/file-preview/${fileId}`);
    };

    return (
        <>
            <Snackbar
                open={showSuccess}
                autoHideDuration={1500} // Auto-hide after 3 seconds
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    File uploaded successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={showDeleteSuccess}
                autoHideDuration={1500}
                onClose={() => setShowDeleteSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowDeleteSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    File deleted successfully!
                </Alert>
            </Snackbar>

            <CardStyled>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Upload File</Typography>
                    <div {...getRootProps()} style={{ border: '2px dashed #007bff', padding: '20px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input {...getInputProps()} />
                        <Typography>Drag & drop files</Typography>
                        {!file ? (
                            <ChooseButton onClick={() => open()}>
                                Choose File
                            </ChooseButton>
                        ) : (
                            <UploadButton onClick={handleFileUpload}>
                                Upload File
                            </UploadButton>
                        )}
                    </div>
                </CardContent>
            </CardStyled>


            <CardStyled>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Course Materials
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Files you have uploaded: {files.length} <span style={{ marginLeft: '10px' }}>Last update: {lastUpdate}</span>
                    </Typography>
                    <FileList>
                        {files.map((file, index) => (
                            <FileItem key={file.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FileName variant="body2">{index + 1}. {file.filename}</FileName>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        onClick={() => handlePreview(file.id)}
                                        sx={{ marginLeft: 1 }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        onClick={() => handleFileDelete(file.id)}
                                        sx={{ marginLeft: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                                <ListItemText secondary={`Uploaded on: ${new Date(file.upload_date).toLocaleString()}`} sx={{ marginLeft: 2 }} />
                            </FileItem>
                        ))}
                    </FileList>
                </CardContent>
            </CardStyled>
        </>
    );
}

export default FileUpload;
