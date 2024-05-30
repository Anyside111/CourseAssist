import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Card, CardContent, Typography, Box, IconButton, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
            
            <Card raised sx={{ margin: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Upload File
                    </Typography>
                    {file ? (
                        <>
                            <Typography variant="body1" sx={{ mt: 2 }}>{file.name}</Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleFileUpload}
                                sx={{ mt: 2 }}
                            >
                                Upload File
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            sx={{ mt: 2 }}
                        >
                            Choose File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                    )}
                </CardContent>
            </Card>
            
            <Card raised sx={{ margin: 2 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Course Materials
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Files you have uploaded: {files.length} <span style={{ marginLeft: '10px' }}>Last update: {lastUpdate}</span>
                    </Typography>
                    <List sx={{ paddingLeft: 2 }}>
                        {files.map((file, index) => (
                            <ListItem key={file.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: 1 }}>{index + 1}.</Typography>
                                <ListItemText primary={file.filename} secondary={`Uploaded on: ${new Date(file.upload_date).toLocaleString()}`} />
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={() => handlePreview(file.id)}
                                    sx={{ marginLeft: 1 }}
                                >
                                    View File
                                </Button>
                                    {/* <IconButton
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        onClick={() => handlePreview(file.id)}
                                        sx={{ marginLeft: 1 }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton> */}
                                </Box>
                            </ListItem>
                        ))}
            </List>
                </CardContent>
            </Card>
        </>
    );
}

export default FileUpload;
