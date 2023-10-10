const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        res.json({ status: "success", message: "Authentication successful" });
    } else {
        res.status(403).json({ status: "fail", message: "Authentication failed" });
    }
});

app.listen(5001, () => {
    console.log('Authentication service started on port 5001');
});
