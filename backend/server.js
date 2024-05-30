const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgres://postgres:1212@localhost:5432/courseassist' });

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle file uploads
app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.uploadedFile;
    const uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

    try {
        const { rows } = await pool.query('SELECT * FROM files WHERE filename = $1', [uploadedFile.name]);

        if (rows.length > 0) {
            // Update the existing file's upload date and overwrite the file
            await pool.query('UPDATE files SET upload_date = $1 WHERE filename = $2', [new Date(), uploadedFile.name]);
            fs.writeFileSync(uploadPath, uploadedFile.data);
            res.send('File updated successfully.');
        } else {
            // Insert new file record
            await pool.query('INSERT INTO files (filename, upload_date) VALUES ($1, $2)', [uploadedFile.name, new Date()]);
            fs.writeFileSync(uploadPath, uploadedFile.data);
            res.send('File uploaded successfully.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Database or file handling error.');
    }
});

// Route to retrieve file list
app.get('/api/files', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id, filename, upload_date FROM files ORDER BY upload_date DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error retrieving files', err);
        res.status(500).send('Error retrieving files');
    }
});

// Route to serve individual files
app.get('/files/:id', async (req, res) => {
    const fileId = req.params.id;

    try {
        const result = await pool.query('SELECT filename FROM files WHERE id = $1', [fileId]);

        if (result.rows.length > 0) {
            const file = result.rows[0];
            const filePath = path.join(__dirname, 'uploads', file.filename);
            res.download(filePath, file.filename);
        } else {
            res.status(404).send('File not found');
        }
    } catch (err) {
        console.error('Error retrieving file', err);
        res.status(500).send('Error retrieving file');
    }
});

// Route to delete a file
app.delete('/api/files/:id', async (req, res) => {
    const fileId = req.params.id;

    try {
        const result = await pool.query('SELECT filename FROM files WHERE id = $1', [fileId]);

        if (result.rows.length > 0) {
            const filePath = path.join(__dirname, 'uploads', result.rows[0].filename);
            fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error deleting file');
                }

                await pool.query('DELETE FROM files WHERE id = $1', [fileId]);
                res.status(200).send('File deleted');
            });
        } else {
            res.status(404).send('File not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/api/llm', async (req, res) => {
    const { message } = req.body;
    // Replace this with the actual call to your LLM API
    const response = await callLLMApi(message);
    res.json({ answer: response });
});

const callLLMApi = async (message) => {
    // Simulated API call - replace with your LLM API call
    return `Response for: ${message}`;
};

app.listen(3000, () => console.log('Server running on port 3000'));
