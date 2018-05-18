import * as express from 'express';
import * as mysql from 'mysql';
import {MysqlError} from "mysql";
import {Request, Response} from "express";

const port = 3307;
const app = express();
const bodyParser = require('body-parser');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'restdb',
    port: 3306
});

conn.connect((err: MysqlError, res: any) => {
    if (err)
        console.log(err);
    else
        console.log('Connected to restdb');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/auth', (req: Request, res: Response) => {
   conn.query(`SELECT * FROM auth`,
       (err: MysqlError, result?: any) => {
       if (err) {
           console.log('mysql error');
       } else {
           if (result){
               console.log('res sent');
               res.send(result);
           } else {
               res.send('what?');
           }
       }
       });
});


app.post('/restaurant', (req: Request, res: Response) => {
   if (req.body.name && req.body.tags && req.body.review && req.body.music && req.body.rating) {
   }
});