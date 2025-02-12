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
                    viewAllStores();
                    break;
                case 'View all brands':
                    viewAllBrands();
                    break;
                case 'View all Employees':
                    viewAllEmployees()
                    break;
                case 'Add a Store':
                    addStore()
                    break;
                case 'Add an employee':
                    addEmployee()
                    break;
                case 'View Emplyoees by Store':
                    viewEmployeesByStore()
                    break;

                case 'Exit':
                    connection.end();
                    console.log("Goodbye come again!")
            }
        })
}

function viewAllStores() {
    const query = 'Select * From stores';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllBrands() {
    const query = 'Select * from brands that are in each store';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start()
    })
}

function viewAllEmployees() {
    const query = `
    Select e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    Frome employee e
    Left Join roles r on e.role_id = r.id
    Left join departments d on r.department_id = d.id
    Left join emplyee m on e.manager_id = m.id;
    `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start()
    })
}


function addStore() {
    inquirer
    .prompt({
        type: 'input',
        name:'name',
        message: 'Enter the name of the new store'
    })
    .then((answer) => {
        console.log(answer.name);
        const query = `ADD INTO Stores (store_name) Values ('${answer.name}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log(`Added Store ${answer.name} to the database!`);
            start();
            console.log(answer.name)
        })
    })
}

function addEmployee() {
    connection.query("Select id, title form roles", (error, results) => {
        if(error) {
            console.error(error);
            return;
        }
        const roles = results.map(({id, title}) => ({
            name: title,
            value: id,
        }));

        connection.query(
            ''
        )
    })
}

function viewEmployeesByStore() {
    const query = 'Slect store.store_name, employee.first_name, employee.last_name FORM employee INNER JOIN roles ON employee.role_od = roles.id INNER JOIN store ON roles.store_id = stores.id ORDER BY stores.store_name ASC'
    connection.query(query, (err,res) => {
        if(err) throw err;
        console.log(res);
        start()
    })
}






process.on('exit', () => {
    connection.end()
});