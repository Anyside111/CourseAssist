const pool = require('./database');

const getFiles = async () => {
    const res = await pool.query('SELECT id, filename, upload_date FROM files');
    return res.rows;
};

const addFile = async (filename, uploadDate) => {
    const res = await pool.query('INSERT INTO files (filename, upload_date) VALUES ($1, $2)', [filename, uploadDate]);
    return res.rows;
};

module.exports = {
    getFiles,
    addFile
};
