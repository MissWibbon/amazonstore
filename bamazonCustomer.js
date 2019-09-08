var mysql = require("mysql");
var db = require("./CRUD_obj");
var inquirer = require("inquirer");

bamazon = new db.session();

bamazon.read('products', 'item_id, product_name, price');
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.PASSWORD,
  database: "amazon_store"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

var items = function afterConnection() {
  connection.query("SELECT * FROM items", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};
console.log(items);
$('.collection-item').innerHTML(afterConnection());