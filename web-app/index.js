const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const path = require('path');


let token;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/login.html')
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', async (req, res) => {
    try {
        const response = await axios.post('http://auth-service:5001/authenticate', req.body);
        if(response.data && response.data.status === "success") {
            const userToken = 'hello';
            token = userToken;
            res.json({...response.data, token: userToken });
        } else {
            res.status(403).json({ status: "fail", message: "Login failed, please retry" });
        }
    } catch (error) {
        res.status(403).json({ status: "fail", message: "Login failed, please retry" });
    }
});

app.get('/dashboard', (req, res) => {
    try{
        const providedToken = req.query.token;
        if (providedToken && providedToken === token) { 
            res.sendFile(__dirname + '/public/dashboard.html');
        } else {
            res.redirect("/login");
        }
    } catch {
        res.redirect('/login');
    }
});

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});


app.get('/data', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM student_grades.student_grades');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/submit-grade', async (req, res) => {
    try {
        const { studentName, studentID, course, grade } = req.body;
        await pool.query('INSERT INTO student_grades (student_name, student_id, course, grade) VALUES (?, ?, ?, ?)', [studentName, studentID, course, grade]);
        res.json({ status: "success", message: "Data added successfully" });
    } catch (error) {
        console.error("Failed to insert data into the database:", error.message);
        res.status(500).json({ status: "fail", message: "Failed to add data" });
    }
});




app.listen(5000, () => {
    console.log('Web app started on port 5000');
});
