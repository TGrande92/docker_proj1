const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const app = express();
const PORT = 5002;

const mongoURI = "mongodb://mongo:27017/analytics_db";

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        return res.json({
            status: "success",
            message: "Login successful.",
            token: "sample_token"
        });
    } else {
        return res.status(403).json({
            status: "fail",
            message: "Incorrect username or password"
        });
    }
});

app.get('/dashboard', (req, res) => {
    const providedToken = req.query.token;
    if (providedToken === 'sample_token') {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.redirect("/");
    }
});

app.get('/data', (req, res) => {
    const { username, password } = req.headers;

    if (username !== "admin" || password !== "password") {

        return res.status(403).json({ status: "fail", message: "Authentication failed" });
    }

    MongoClient.connect(mongoURI, (err, client) => {
        if (err) throw err;     
        const db = client.db("analytics_db");
        
        db.collection("class_averages").find({}).toArray((err, result) => {
            if (err) throw err;
            res.json(result);
            client.close();
        });
    });
});

app.listen(PORT, () => {
    console.log(`Data service started on port ${PORT}`);
});
