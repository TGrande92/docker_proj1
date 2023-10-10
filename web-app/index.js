const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Web App!');
});

app.post('/login', async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:5001/authenticate', req.body);
        res.json({ status: "success", message: "Logged in successfully" });
    } catch (error) {
        res.status(403).json({ status: "fail", message: "Login failed" });
    }
});

const path = require('path');
// ... other imports

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use urlencoded parser for form data
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:5001/authenticate', req.body);
        res.json({ status: "success", message: "Logged in successfully" });
    } catch (error) {
        res.status(403).json({ status: "fail", message: "Login failed" });
    }
});


const mysql = require('mysql2/promise');
// ... other imports

// ... other middleware

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

app.get('/data', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM some_table');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ... other routes



app.listen(5000, () => {
    console.log('Web app started on port 5000');
});
