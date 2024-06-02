require('dotenv').config();
const ollama = require('ollama').default;
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL // Set your DATABASE_URL in your .env file
});

module.exports = pool;

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));


// Authentication routes
app.post('/signup', async (req, res) => {
    console.log('signupReceived:', req.body);
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Ensure the salt rounds are consistent
        const result = await pool.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING username',
            [username, hashedPassword]
        );
        res.status(201).json({ username: result.rows[0].id, message: 'Registration successful', authenticated: true });
    } catch (error) {
        if (error.code === '23505') {
            res.status(409).json({ message: 'Username already exists', authenticated: false });
        } else {
            console.error('Signup Error:', error);
            res.status(500).json({ message: 'Error registering new user' });
        }
    }
});

app.post('/login', async (req, res) => {
    console.log('loginReceived:', req.body);
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (isMatch) {
                res.json({ message: 'Login successful', authenticated: true, username: user.username });
            } else {
                res.status(400).json({ message: 'Invalid credentials', authenticated: false });
            }
        } else {
            res.status(404).json({ message: 'User not found', authenticated: false });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});




// const llamaModel = new ollama.Llama({ model: 'gemma2b' }); 

// app.post('/api/ai-tutor', async (req, res) => {
//     const { message } = req.body;
//     try {
//         const response = await ollama.chat({
//             model: 'gemma:2b',
//             messages: [{ role: 'user', content: message }]
//         });
//         res.json({ message: response.message.content });
//     } catch (error) {
//         console.error('Error calling the AI model:', error);
//         res.status(500).json({ error: 'Failed to process the AI request.' });
//     }
// });
app.post('/api/ai-tutor', async (req, res) => {
    const { message, userId } = req.body;  // Assuming userId is sent from the frontend
    try {
        // Store the user's message
        await pool.query(
            'INSERT INTO conversations (user_id, sender, text) VALUES ($1, $2, $3)',
            [userId, 'You', message]
        );

        // Call the AI model
        const response = await ollama.chat({
            model: 'gemma:2b',
            messages: [{ role: 'user', content: message }]
        });

        const aiMessage = response.message.content;

        // Store the AI's response
        await pool.query(
            'INSERT INTO conversations (user_id, sender, text) VALUES ($1, $2, $3)',
            [userId, 'AI', aiMessage]
        );

        res.json({ message: aiMessage });
    } catch (error) {
        console.error('Error calling the AI model:', error);
        res.status(500).json({ error: 'Failed to process the AI request.' });
    }
});

// Endpoint to fetch conversations
app.get('/api/conversations/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const result = await pool.query(
            'SELECT sender, text, timestamp FROM conversations WHERE username = $1 ORDER BY timestamp ASC',
            [username]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Failed to fetch conversations.' });
    }
});


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
        const { rows } = await pool.query('SELECT filename, upload_date FROM files ORDER BY upload_date DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error retrieving files', err);
        res.status(500).send('Error retrieving files');
    }
});

// Route to serve individual files
app.get('/files/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        const result = await pool.query('SELECT filename FROM files WHERE filename = $1', [filename]);

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
app.delete('/api/files/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        const result = await pool.query('SELECT filename FROM files WHERE filename = $1', [filename]);

        if (result.rows.length > 0) {
            const filePath = path.join(__dirname, 'uploads', result.rows[0].filename);
            fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error deleting file');
                }

                await pool.query('DELETE FROM files WHERE filename = $1', [filename]);
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


app.listen(3000, () => console.log('Server running on port 3000'));
