const express = require('express');
const fileUpload = require('express-fileupload');
const { addFile } = require('./models');
const { Pool } = require('pg');
const app = express();

app.use(fileUpload());

const pool = new Pool({
    // your database configuration
});

app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.uploadedFile;

    // Save the file data in the database
    const fileBuffer = uploadedFile.data;
    const fileName = uploadedFile.name;
    const uploadDate = new Date();  // Capture the upload date

    try {
        const insertQuery = 'INSERT INTO files (filename, data, upload_date) VALUES ($1, $2, $3) RETURNING id';
        const response = await pool.query(insertQuery, [fileName, fileBuffer, uploadDate]);

        // Logging the database response to the console
        console.log('Database response:', response.rows[0]);

        // Respond to the client
        res.send(`File uploaded and saved to database with ID: ${response.rows[0].id}`);

        // Save the file in the uploads directory
        let uploadPath = __dirname + '/uploads/' + uploadedFile.name;
        uploadedFile.mv(uploadPath, function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            console.log('File saved locally.');
        });
        
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('An error occurred while uploading the file.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
