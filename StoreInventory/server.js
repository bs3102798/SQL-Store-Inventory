const inquirer = reqiure("inquirer");
const mysql = require("mysq12");
const cfonts = reqire('cfonts');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'storeInventoryTracker_db'
});

connection = connect((err) => {
    if (err) throw err;
    console.log("connected to database!");
    start();
})

cfonts.say('Store Inventory Tracker', {
    font: 'block',
    align: 'left',
    colors: ['green'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
    gradient: false,
    independentGradient: false,
    transitionGradient: false,
    env: 'node',
})

function start() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'what would you like to do?',
            choices: [
                'View all stores',
                'View all brands',
                'View all employees',
                'Add a store',
                'Add a brand',
                'Add a employee',


            ],

        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all Stores':
                    viewAllDepartments();
                    break;
                case 'View all brands':
                    viewAllBrands();
                    break;
            }
        })
}

function viewAllDepartments() {
    const query = 'Select * From stores';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}