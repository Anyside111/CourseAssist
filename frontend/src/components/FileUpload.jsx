import React, { useState, useEffect } from 'react';
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
    backgroundColor: '#28a745', // Green color for Upload button
    color: '#fff',
    '&:hover': {
        backgroundColor: '#218838',
    },
}));

const ChooseButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#007bff', // Blue color for Choose File button
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
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }
        const formData = new FormData();
        formData.append('uploadedFile', file);

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000); // Auto-hide after 3 seconds

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            setShowSuccess(true);
            fetchFiles(); // Refresh file list after upload
            setFile(null); // Reset file input
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
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    File uploaded successfully!
                </Alert>
            </Snackbar>

            <CardStyled>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Upload File
                    </Typography>
                    {file ? (
                        <>
                            <Typography variant="body1" sx={{ mt: 2 }}>{file.name}</Typography>
                            <UploadButton
                                variant="contained"
                                onClick={handleFileUpload}
                            >
                                Upload File
                            </UploadButton>
                        </>
                    ) : (
                        <ChooseButton
                            variant="contained"
                            component="label"
                        >
                            Choose File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                        </ChooseButton>
                    )}
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
                                        View File
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