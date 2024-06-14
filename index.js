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
    sql = "SELECT id, bin, name FROM counteragents WHERE concat(bin,name) like ?";
    db.all(sql, ['%' + req.body.name + '%'], (err, rows) => {
        if (err) return console.error(err.message);
        res.send(rows);
    });
});

app.post('/saveCounter', (req, res) => {
    data = req.body;
    console.log(data);

    sql = "INSERT INTO counteragents(BIN, Name, Address, Telephone, contact) VALUES (?, ?, ?, ?, ?)";
    db.run( sql, [data.bin, data.counteragent, data.address, data.tel, data.contact], function(err) {
        if (err) {
            res.sendStatus(500)
            //res.end(err);
            return console.error(err.message);
        } else res.send('Ok');
    })
    
});

app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
