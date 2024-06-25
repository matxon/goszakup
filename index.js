const sqlite = require('better-sqlite3');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.options('/api', cors(corsOptions));
// app.use(cors(corsOptions));
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://v3bl.goszakup.gov.kz');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var corsOptions = {
    origin: 'https://v3bl.goszakup.gov.kz',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders: 'X-Requested-With,content-type',
    credentials: 'true',
    optionsSuccessStatus: 200   // some legacy browsers (IE11, variios SmartTVs) choke on 204
};

let sql;

const db = new sqlite('./test.db', {verbose: console.log} );

db.loadExtension('./sqlean/unicode');


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/api', cors(), (req, res) => {
    console.log(req)
    sql = db.prepare("SELECT * FROM counteragents");
    rows = sql.all();

    res.send(rows);
});

app.post('/test', cors(), (req, res) => {
    console.log(req)
    sql = db.prepare("SELECT * FROM counteragents");
    rows = sql.all();

    res.send(rows);
});

app.post('/products', (req, res) => {
    console.log(req);
    sql = db.prepare("SELECT * FROM products WHERE concat(id,product_name) like ? ORDER BY product_name");
    rows = sql.all('%' + req.body.str + '%');

    res.send(rows);
});

app.post('/counteragent', (req, res) => {
    // console.log(req.body);
    sql = db.prepare("SELECT id, bin, name FROM counteragents WHERE concat(bin,name,address) like ? ORDER BY name");
    rows = sql.all('%' + req.body.name + '%')
    
    res.send(rows);
});

app.post('/saveProduct', (req, res) => {
    data = req.body;
    // console.log(data);

    sql = db.prepare("INSERT INTO products(Product_name, Unit) VALUES (?, ?)");
    try {
        sql.run( data.name || null, data.unit || null);
        res.send('Ok');
    } catch(err) {
        res.status(500).send(err.message);
        console.error(err.message);
    }
    
});

app.post('/saveCounter', (req, res) => {
    data = req.body;
    // console.log(data);

    sql = db.prepare("INSERT INTO counteragents(BIN, Name, Address, Telephone, contact) VALUES (?, ?, ?, ?, ?)");
    try {
        sql.run( data.bin, data.counteragent, data.address, data.tel, data.contact);
        res.send('Ok');
    } catch(err) {
        res.status(500).send(err.message);
        console.error(err.message);
    }
    
});

app.post('/savePurchase', (req, res) => {
    data = req.body;
    // console.log(data);
    (db.transaction( function() {

        try {
            sql = db.prepare("INSERT INTO purchases(date, id_counteragent, summ, cash, card) VALUES (?, ?, ?, ?, ?)");
            info = sql.run( data.date, data.id_counteragent, data.summ, data.cash || 0, data.card || 0);
            
            for (i = 0; i<data.products.length; i++) {
                sql = db.prepare(`INSERT INTO purchased( id_purchase, id_product, qty, price) VALUES (?, @id_product, @qty, @price)`);
                //data.products[i].id_purchase = ''+;
                sql.run(data.products[i], info.lastInsertRowid);
            }

            sql = db.prepare('INSERT INTO journal(date, id_counteragent, id_purchase, dt, ct, summ, description) VALUES (?, ?, ?, ?, ?, ?, ?)');
            sql.run( data.date, data.id_counteragent, info.lastInsertRowid, "41", "60", data.summ, "Жаңа тауарлар алынды");

            sql = db.prepare("INSERT INTO products_41(date, id_purchase, korrchet, dt) VALUES (?, ?, ?, ?)");
            sql.run( data.date, info.lastInsertRowid, '60', data.summ);

            sql = db.prepare("INSERT INTO suppliers_60(date, id_counteragent, korrchet, ct) VALUES (?, ?, ?, ?)");
            sql.run( data.date, data.id_counteragent, '41', data.summ);

            if (data.cash) {
                sql = db.prepare("INSERT INTO journal(date, id_counteragent, id_purchase, dt, ct, summ, description ) VALUES (?, ?, ?, ?, ?, ?, ?)");
                sql.run( data.date, data.id_counteragent, info.lastInsertRowid, '60', '50', data.cash, 'Тауарлардың ақшасы қолма-қол төленді');

                sql = db.prepare("INSERT INTO kassa_50(date, id_counteragent, korrchet, ct) VALUES (?, ?, ?, ?)");
                sql.run( data.date, data.id_counteragent, '60', data.cash);

                sql = db.prepare("INSERT INTO suppliers_60(date, id_counteragent, korrchet, dt) VALUES (?, ?, ?, ?)");
                sql.run( data.date, data.id_counteragent, '50', data.cash);
            }

            if (data.card) {
                sql = db.prepare("INSERT INTO journal(date, id_counteragent, id_purchase, dt, ct, summ, description) VALUES (?, ?, ?, ?, ?, ?, ?)");
                sql.run( data.date, data.id_counteragent, info.lastInsertRowid, '60', '51', data.card, 'Тауарлардың ақшасы карточкамен төленді');

                sql = db.prepare("INSERT INTO rchet_51(date, id_counteragent, korrchet, ct) VALUES (?, ?, ?, ?)");
                sql.run( data.date, data.id_counteragent, '60', data.card);

                sql = db.prepare("INSERT INTO suppliers_60(date, id_counteragent, korrchet, dt) VALUES (?, ?, ?, ?)");
                sql.run( data.date, data.id_counteragent, '51', data.card);
            }

            res.send('Ok');
        } catch(err) {
            res.status(500).send(err.message);
            console.error(err.message);
        }

    
    }))();
    
});

app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
