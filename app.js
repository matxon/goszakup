const sqlite3 = require('sqlite3').verbose();

let sql;

// connect to DB
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})

db.loadExtension('./sqlean/unicode');


// create table
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)`;
// db.run(sql);

// insert data 
// sql = `INSERT INTO users(first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?)`;
// db.run(sql, ['fred', 'fredson', 'fred_user', 'testfred', 'fred@gmail.com'], (err) => {
//     if (err) return console.error(err.message);
// });

// // update data
// sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// db.run(sql, ['Jake', '1'], (err) => {
//     if (err) return console.error(err.message);
// });

// delete data
// update data
// sql = `DELETE FROM users WHERE id = ?`;
// db.run(sql, ['1'], (err) => {
//     if (err) return console.error(err.message);
// });

//query data
sql = "SELECT short_name FROM counteragents WHERE short_name like ?";
db.all(sql, (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach(element => {
        console.log(element);
    });
});

// Drop table
// sql = `DROP TABLE users`;
// db.run(sql, (err) => {
//     if (err) return console.error(err.message);
// });