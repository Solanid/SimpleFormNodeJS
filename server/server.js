var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodeusers"
});

/** creating new database */
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE nodeusers", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
*/

/** creating new table */
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), age integer)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
*/
con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
});

/** POST new RECORD INTO MYSQL DATABASE */
app.post('/customers', (req, res) => {

	var sql = `INSERT INTO customers (name, age) VALUES ("${req.body.name}", ${req.body.age})`;
	con.query(sql, function (err, result) {
		if (err)
			return res.status(400).send(err);
		console.log("1 record inserted");
		return res.status(200).send();
	});	
});

/** GET all customers */
app.get('/customers', (req, res) => {

	var sql = `SELECT * FROM customers`;
	con.query(sql, function (err, result) {
		if (err)
			return res.status(400).send(err);
		console.log(result);
		return res.status(200).send(result);
	});	
});

/** GET by ID */
app.get('/customers/id/:id', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', ' GET ');

	var id = req.params.id;

	var sql = `SELECT * FROM customers WHERE id LIKE "${id}"`;
	con.query(sql, function (err, result) {
		if (err)
			return res.status(400).send(err);
		console.log(result);
		return res.status(200).send(result);
	});	
});

/** GET by NAME */
app.get('/customers/name/:name', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', ' GET ');

	var name = req.params.name;

	var sql = `SELECT * FROM customers WHERE name LIKE "${name}"`;
	con.query(sql, function (err, result) {
		if (err)
			return res.status(400).send(err);
		console.log(result);
		return res.status(200).send(result);
	});	
});

app.listen(3050, () => {
	console.log('Started on port 3050');
});

module.exports = {app};