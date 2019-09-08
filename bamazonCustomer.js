
// declare depencencies
const inquirer = require('inquirer');
const mysql = require('mysql');
require("dotenv").config();


// updates the quatity of the prodcut based on id
// quantity === string  id === integer
function updateProduct(quantity, id) {
    console.log("Updating quantities...\n");
    var query = connection.query(
      "UPDATE items SET ? WHERE ?",
      [
        {
          stock_quantity: quantity
        },
        {
          item_id: id
        }
      ],
      function(err, res) {
        if (err) throw err;
      }
    );
  }
// configure mySQL for configuration and connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.PASSWORD,
    database : 'amazon_store'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
  
});

//prompts the user for questions then calls the update function based on ID

inquirer
  .prompt([
    {
    name: "item",
    type: "list",
    message: "Pick an item?",
    choices: ["Nickelback CD", "Tampons", "Star Wars Figurine", "Peanut Butter", "Spaghettios", "Sunglasses", "Bicycle", "MAGA Hat", "Pocket Knife", "Dog Food"]

    },
    {
    name: "amount",
    type: "input",
    message: "Choose your quantity.",
    },

])
  .then(answers => {
    const amountOrder = answers.amount;
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['items', 'product_name', answers.item];
    sql = mysql.format(sql, inserts);
      connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    if(amountOrder <= results[0].stock_quantity){
        const total = results[0].price * amountOrder;
        const totalPrice = Math.round(total * 100) / 100;
        const quantity = results[0].stock_quantity - amountOrder;
        const id = results[0].ID;
        updateProduct(quantity, id)
        console.log(`at $${results[0].price} per unit, your total is : $${totalPrice}`)

    } else {
        console.log('INSUFFICIENT QUANTITY!')
    }
    
    });

   
  });
