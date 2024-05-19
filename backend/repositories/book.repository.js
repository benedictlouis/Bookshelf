const { pool } = require("../config/db.config.js");

exports.addBook = async (req, res) => {
    const { title, author, description, cover_image, release_year } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, description, cover_image, release_year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, description, cover_image, release_year]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getBooks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Book not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, cover_image, release_year } = req.body;
    try {
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2, description = $3, cover_image = $4, release_year = $5 WHERE id = $6 RETURNING *',
            [title, author, description, cover_image, release_year, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Book not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Book not found');
        }
        res.status(200).send('Delete successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
