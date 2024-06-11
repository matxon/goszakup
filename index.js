const sqlite = require('sqlite3').verbose();

const express = require('express');
const app = express();
const port = 3000;

app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let sql;
const db = new sqlite.Database('./test.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})

db.loadExtension('./sqlean/unicode');


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/counteragent', (req, res) => {
    console.log(req.body);
    sql = sql = "SELECT short_name FROM counteragents WHERE short_name like ?";
    db.all(sql, ['%' + req.body.name + '%'], (err, rows) => {
        if (err) return console.error(err.message);
        res.send(rows);
    });
});

app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
