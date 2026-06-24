const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "userdb",
    password: "Password@123",
    port: 5432
});

app.post("/register", async (req, res) => {

    console.log("=== REQUEST RECEIVED ===");
    console.log(req.body);

    try {

        const {
            fullname,
            email,
            phone,
            age,
            city,
            gender
        } = req.body;

        // Check if email already exists

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {

            return res.json({
                message: "Email already registered"
            });

        }

        });

app.get("/users", async (req, res) => {

    try {

        const users = await pool.query(
            "SELECT * FROM users ORDER BY id DESC"
        );

        res.json(users.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error fetching users"
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

        // Insert new user

        await pool.query(
            `INSERT INTO users
            (fullname,email,phone,age,city,gender)
            VALUES ($1,$2,$3,$4,$5,$6)`,
            [
                fullname,
                email,
                phone,
                age,
                city,
                gender
            ]
        );

        console.log("Inserted Successfully");

        res.json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.error("DATABASE ERROR:");
        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});