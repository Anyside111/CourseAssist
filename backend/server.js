const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgres://postgres:1212@localhost:5432/courseassist' });

const app = express();
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

    // Example of handling single file upload
    let uploadedFile = req.files.uploadedFile; // The name 'uploadedFile' should match the name attribute in your front-end form
    let uploadPath = path.join(__dirname, '/uploads/', uploadedFile.name);

    // Use the mv() method to place the file on the server
    uploadedFile.mv(uploadPath, async function(err) {
        if (err) return res.status(500).send(err);

        // Insert file information into the database
        const query = 'INSERT INTO files (filename, upload_date) VALUES ($1, $2)';
        await pool.query(query, [uploadedFile.name, new Date()]);

        res.send('File uploaded and saved to database!');
    });
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
            const filePath = path.join(__dirname, '/uploads/', file.filename);
            res.download(filePath, file.filename);
        } else {
            res.status(404).send('File not found');
        }
    } catch (err) {
        console.error('Error retrieving file', err);
        res.status(500).send('Error retrieving file');
    }
});

// app.get('/files/:id', async (req, res) => {
//     const fileId = req.params.id;
//     const query = 'SELECT * FROM files WHERE id = $1';
//     const { rows } = await pool.query(query, [fileId]);

//     if (rows.length === 0) {
//         return res.status(404).send('File not found');
//     }

//     const file = rows[0];
//     const filePath = path.join(__dirname, 'uploads', file.filename);
//     res.sendFile(filePath);
// });



app.listen(3000, () => console.log('Server running on port 3000'));
