"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306
});
//port 3306
conn.connect(function (err) {
    if (err)
        console.log("MySQL connection error" + err.code);
    else
        console.log('Connected to MySQL');
    if (process.argv[2] === 'delete') {
        conn.query("DROP DATABASE restdb", function (err, results) {
            if (err)
                console.log("NOT DELETED");
            else
                console.log("restdb DELETED");
        });
    }
    else {
        var dbPromise = new Promise(function (resolve, reject) {
            conn.query('CREATE DATABASE restdb', function (err, results) {
                if (err) {
                    // Mysql error
                    reject(err.code);
                }
                else {
                    resolve('DB restdb CREATED');
                }
            });
        });
        dbPromise.catch(function (err) {
            // On database creation failure
            console.log(err);
        }).then(function (value) {
            // On database creation success
            console.log(value);
            // Creates auth table, for checking admin app token
            conn.query("CREATE TABLE restdb.auth(token VARCHAR(42) DEFAULT 'as654vs6vFE46VEVD6eV6gD')", function (err, results) {
                if (err)
                    console.log(err);
                else {
                    console.log('Auth CREATED with default token');
                }
            });
            // Creates restaurant table, [id, name, tags, review date, review, music]
            conn.query("CREATE TABLE restdb.restaurant(\n            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,\n            name VARCHAR(50) NOT NULL,\n            tags VARCHAR(500) NULL,\n            reviewed_at DATE NOT NULL,\n            review TEXT NOT NULL,\n            rating INT NOT NULL,\n            location VARCHAR(500) NULL)", function (err, results) {
                if (err)
                    console.log(err.code);
                else
                    console.log('restaurant CREATED');
            });
            // Creates meal table, [id, name, ingredients, tags]
            conn.query("CREATE TABLE restdb.meal(\n            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,\n            rest_id INT NOT NULL,\n            name VARCHAR(50) NOT NULL,\n            tags VARCHAR(500) NOT NULL,\n            image BLOB NOT NULL,\n            review LONGTEXT NOT NULL,\n            reviewed_at DATE NOT NULL,\n            rating INT NOT NULL)", function (err, results) {
                if (err)
                    console.log(err.code);
                else
                    console.log('meal CREATED');
            });
            conn.query("CREATE TABLE restdb.images");
        });
    }
});
//# sourceMappingURL=setup.js.map