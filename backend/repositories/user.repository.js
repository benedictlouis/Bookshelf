const { pool } = require("../config/db.config.js");
const { v4: uuidv4 } = require('uuid');

exports.login = async function (req, res) {
    const { username, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM account WHERE username = $1", [username]);

        if (result.rows.length === 0) {
            return res.status(404).send("Username tidak ditemukan");
        }

        const storedPassword = result.rows[0].password;

        if (password !== storedPassword) {
            return res.status(401).send("Password salah");
        }

        res.status(200).send("Login berhasil");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.signup = async function (req, res) {
    const { username, email, password } = req.body;
    try {
        const userCheck = await pool.query(
            'SELECT * FROM account WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (userCheck.rows.length > 0) {
            return res.status(400).send("Username or Email already exists");
        }

        await pool.query(
            "INSERT INTO account (user_id, username, email, password) VALUES ($1, $2, $3, $4)",
            [uuidv4(), username, email, password]
        );
        res.status(201).send("Sukses signup");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAllUser = async function (req, res) {
    try {
        const result = await pool.query("SELECT user_id, username, email, password FROM account");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getUserById = async function (req, res) {
    const {user_id} = req.params;

    try {
        const result = await pool.query("SELECT user_id, username, email FROM account WHERE user_id = $1", [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error while fetching user:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.updateUser = async function (req, res) {
    const user_id = req.params;
    const { username, email, password } = req.body;

    try {
        const userCheck = await pool.query("SELECT * FROM account WHERE user_id = $1", [user_id]);

        if (userCheck.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        const fields = [];
        const values = [];
        let query = 'UPDATE account SET ';

        if (username) {
            fields.push('username = $' + (fields.length + 1));
            values.push(username);
        }

        if (email) {
            fields.push('email = $' + (fields.length + 1));
            values.push(email);
        }

        if (password) {
            fields.push('password = $' + (fields.length + 1));
            values.push(password);
        }

        if (fields.length === 0) {
            return res.status(400).send("No fields to update");
        }

        query += fields.join(', ') + ' WHERE user_id = $' + (fields.length + 1);
        values.push(userId);

        await pool.query(query, values);
        res.status(200).send("User updated successfully");
    } catch (error) {
        console.error("Error while updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteUser = async function (req, res) {
    const userId = req.params.user_id;
    try {
        const result = await pool.query("DELETE FROM account WHERE user_id = $1 RETURNING *", [userId]);

        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("User deleted successfully");
    } catch (error) {
        console.error("Error while deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
};
