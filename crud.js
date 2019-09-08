var mysql = require("mysql");
var PrettyTable = require("prettytable");
require("dotenv").config();

class CRUD {

    constructor() {

        // console.log(process.env.USERNAME);

        this.connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: "bamazon"
        });

        this.connection.connect();

    }


    /**
     * creates row
     *
     * @param {string} table
     * @param {string} colNames "(col1, col2, col3)"
     * @param {array} values 
     * 
     * @example
     * create('songs', '(title, artist, genre)', [["Crooked Teeth", "Death Cab for Cutie", "Alt Rock"]]);
     */

    create(table, colNames, values) {

        this.connection.query(`INSERT INTO ${table} ${colNames} VALUES ?`, [values], function (err, result) {

            if (err) throw err;

        });

        this.connection.end();

    }


    /**
     * reads table and outputs all values
     *
     * @param {string} table "table"
     * @param {string} whereCondition "Where col = value"
     * 
     * @example
     * read('songs','WHERE song = "All the Small Things"');
     */

    read(table, columns = "*", whereCondition = "") {

        this.connection.query(`SELECT ${columns} FROM ${table} ${whereCondition}`, function (err, result) {

            if (err) throw err;

            var headers = "";

            var data = [];

            if (headers === "") headers = Object.keys(result[0]);

            result.forEach(row => {

                var dataRow = [];
                
                headers.forEach(key => {
                
                    dataRow.push(row[key]);
                
                });
                
                data.push(dataRow);
            
            });

            var pt = new PrettyTable();

            pt.create(headers, data);

            pt.print();

        });

        this.connection.end();

    }


    /**
     * deletes row
     *
     * @param {string} table 
     * @param {string} codition `col1 = "value"`
     * 
     * @example
     * deleteItem('songs', 'title = "Cringe"');
     */

    deleteItem(table, condition) {

        this.connection.query(`DELETE FROM ${table} WHERE ${condition}`, function (err, result) {

            if (err) throw err;

        });

        this.connection.end();

    }


    /**
     * updates database
     *
     * @param {string} table
     * @param {string} assignment `col1 = "value"`
     * @param {string} condition `col1 = "value"`
     * 
     * @example
     * update('songs', 'genre="Rock"', 'title="Crooked Teeth"');
     */

    update(table, assignment, condition) {

        this.connection.query(`UPDATE ${table} SET ${assignment} WHERE ${condition}`, function (err, result) {

            if (err) throw err;

        });

        this.connection.end();

    }

}

module.exports = {
    session: CRUD
}

