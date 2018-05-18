"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var port = 3307;
var app = express();
var bodyParser = require('body-parser');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'restdb',
    port: 3306
});
conn.connect(function (err, res) {
    if (err)
        console.log(err);
    else
        console.log('Connected to restdb');
});
app.listen(port, function () {
    console.log("Server running on port " + port);
});
app.get('/auth', function (req, res) {
    conn.query("SELECT * FROM auth", function (err, result) {
        if (err) {
            console.log('mysql error');
        }
        else {
            if (result) {
                console.log('res sent');
                res.send(result);
            }
            else {
                res.send('what?');
            }
        }
    });
});
app.post('/restaurant', function (req, res) {
    if (req.body.name && req.body.tags && req.body.review && req.body.music && req.body.rating) {
    }
});
//# sourceMappingURL=index.js.map