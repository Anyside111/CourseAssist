import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Box, Typography } from '@mui/material';

function FilePreview() {
    const { id } = useParams();
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/files/${id}`)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Preview File
            </Typography>
            <Box
                component="iframe"
                src={fileUrl}
                width="100%"
                height="calc(100vh - 100px)"
                sx={{ border: 'none', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 2 }}
            />
        </Box>
        // <Card raised sx={{ margin: 2 }}>
        //     <CardContent>
        //         <Typography variant="h6" gutterBottom>
        //             Preview File
        //         </Typography>
        //         {fileUrl ? (
        //             <iframe
        //                 src={fileUrl}
        //                 style={{ width: '100%', height: '500px' }}
        //                 title="File Preview"
        //             />
        //         ) : (
        //             <Typography>Loading...</Typography>
        //         )}
        //     </CardContent>
        // </Card>
    );
}

export default FilePreview;
