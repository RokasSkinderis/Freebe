import * as mysql from 'mysql';
import {MysqlError} from "mysql";

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306
});

//port 3306

conn.connect((err: MysqlError) => {
    if (err)
        console.log("MySQL connection error" + err.code);
    else
        console.log('Connected to MySQL');

    if (process.argv[2] === 'delete') {
        conn.query(`DROP DATABASE restdb`, (err: MysqlError | null, results?: any) => {
            if (err)
                console.log("NOT DELETED");
            else
                console.log("restdb DELETED");
        });
    } else {
        let dbPromise = new Promise((resolve, reject) => {
            conn.query('CREATE DATABASE restdb', (err: MysqlError | null, results?: any) => {
                if (err) {
                    // Mysql error
                    reject(err.code);
                } else {
                    resolve('DB restdb CREATED');
                }
            });
        });

        dbPromise.catch((err: any) => {
            // On database creation failure
            console.log(err);
        }).then((value: any) => {
            // On database creation success
            console.log(value);

            // Creates auth table, for checking admin app token
            conn.query(`CREATE TABLE restdb.auth(token VARCHAR(42) DEFAULT 'as654vs6vFE46VEVD6eV6gD')`,
                (err: MysqlError | null, results?: any) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log('Auth CREATED with default token');
                    }
                });

            // Creates restaurant table, [id, name, tags, review date, review, music]
            conn.query(`CREATE TABLE restdb.restaurant(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
            name VARCHAR(50) NOT NULL,
            tags VARCHAR(500) NULL,
            reviewed_at DATE NOT NULL,
            review TEXT NOT NULL,
            rating INT NOT NULL,
            location VARCHAR(500) NULL)`,
                (err: MysqlError | null, results?: any) => {
                    if (err)
                        console.log(err.code);
                    else
                        console.log('restaurant CREATED');
                });

            // Creates meal table, [id, name, ingredients, tags]
            conn.query(`CREATE TABLE restdb.meal(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
            rest_id INT NOT NULL,
            name VARCHAR(50) NOT NULL,
            tags VARCHAR(500) NOT NULL,
            image BLOB NOT NULL,
            review LONGTEXT NOT NULL,
            reviewed_at DATE NOT NULL,
            rating INT NOT NULL)`,
                (err: MysqlError | null, results?: any) => {
                    if (err)
                        console.log(err.code);
                    else
                        console.log('meal CREATED')
                });

            conn.query(`CREATE TABLE restdb.images`, )
        });
    }
});