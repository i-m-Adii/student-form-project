const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.post{'/stundents', async (req, res) => {
    try {
        const { name, email, phone, branch } = req.body;

        await pool.query(
            'INSERT INTO students (name, email, phone, branch) VALUES ($1, $2, $3, $4)',
            [name, email, phone, branch]
        );
        res.json({ message: 'Student added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
}