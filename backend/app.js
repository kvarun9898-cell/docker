const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root123",
    database: "devopsdb"
});

db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

app.get("/", (req, res) => {
    res.json({
        message: "Backend is Running",
        database: "Connected Successfully"
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
