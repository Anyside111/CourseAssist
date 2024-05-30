import React, { useState, useEffect } from 'react';

function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/files')
            .then(response => response.json())
            .then(data => setFiles(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {files.map(file => (
                <div key={file.id}>
                    {file.filename} - {new Date(file.upload_date).toLocaleDateString()}
                </div>
            ))}
        </div>
    );
}

export default FileList;
