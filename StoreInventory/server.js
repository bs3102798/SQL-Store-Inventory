const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require('cfonts');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'gohan241',
    database: 'storeInventoryTracker_db'
});

connection.connect((err) => {
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
                'View all Stores',
                'View all brands',
                'View all Employees',
                'Add a Store',
                'Add a brand',
                'add an employee',
                'View the total funding of a store',
                'Delete Stores | Brand | Employees',
                'Exit',

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
                case 'Add a brand':
                    addBrand()
                    break;
                case 'add an employee':
                    addEmployee()
                    break;
                case "View the total funding of a store":
                    ViewTotalFundingOfStore();
                    break;
                case 'Delete Stores | Brand | Employees':
                    deletStoresBrandEmployees()
                    break;
                case 'Exit':
                    connection.end();
                    console.log("Goodbye come again!")
            }
        })
}

function viewAllStores() {
    const query = "Select * FROM stores";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllBrands() {
    const query = 'Select * FROM products';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start()
    })
}

function viewAllEmployees() {
    const query = 'Select * FROM employees';
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
            name: 'name',
            message: 'Enter the name of the new store'
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO Stores (store_name) Values ('${answer.name}')`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Added Store ${answer.name} to the database!`);
                start();
                console.log(answer.name)
            })
        })
}

function addBrand() {
    const query = 'SELECT * FROM stores';
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "Enter New title of brand",
                },
                {
                    type: 'input',
                    name: 'price',
                    message: "enter the price of brand",
                },
                {
                    type: 'list',
                    name: 'store',
                    message: 'Enter the new store for brand',
                    choices: res.map((store) => store.store_name),
                },

            ])
            .then((answer) => {
                const store = res.find(
                    (s) => s.store_name === answer.store
                );


                const query = "INSERT INTO products set ?";
                connection.query(
                    query,
                    {
                        title: answer.title,
                        price: answer.price,
                        store_id: store.id,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Added brand ${answer.title} with price ${answer.price} to the ${answer.store} brand added in database`
                        );
                        start();
                    }
                )
            })
    })

}

function addEmployee() {
    console.log("Starting addEmployee function...");
    connection.query("SELECT id, title FROM roles roles", (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
        console.log("Roles loaded:", roles);

        connection.query(
            'SELECT id, CONCAT(first_name, " " , last_name) AS name FROM employees',
            (error, results) => {
                if (error) {
                    console.error(error);
                    return
                }
                // const managers = results.map(({ id, name }) => ({
                //     name,
                //     value: id,
                // }));
                // console.log("Managers loaded:", managers);

                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'Enter first name:',
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'Enter last name:',
                        },
                        {
                            type: 'list',
                            name: 'roleId',
                            message: 'Select the employee role',
                            choices: roles,
                        },
                        // {
                        //     type: 'list',
                        //     name: 'managerId',
                        //     message: 'Select the employee manager:',
                        //     choices: [
                        //         { name: 'none', value: null },
                        //         ...managers,
                        //     ],
                        // },
                    ])
                    .then((answer) => {
                        const SQL =
                            'INSERT INTO employees (first_name, last_name, role_id, manager_id) Values(?,?,?,?)';
                        const values = [
                            answer.firstName,
                            answer.lastName,
                            answer.roleId,
                            answer.managerId || null,
                        ]
                        connection.query(SQL, values, (error) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            console.log("Employee added successfully");
                            start();
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        )
    })
}


function deletStoresBrandEmployees() {
    inquirer
        .prompt({
            type: 'list',
            name: 'data',
            message: 'what would you like to delete?',
            choices: ["Employee", "Store", "Brand"],
        })
        .then((answer) => {
            switch (answer.data) {
                case "Employee":
                    deleteEmployee();
                    break;
                case "Brand":
                    deleteBrand();
                    break;
                case "Store":
                    deleteStore();
                    break;
                default:
                    console.log(`Invalid data: ${answer.data}`);
                    start()
                    break;
            }
        })
}

function deleteEmployee() {
    const query = "SELECT * FROM employees";
    connection.query(query, (err, res) => {
        if (err) throw err;
        const employeeList = res.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }))
        employeeList.push({ name: 'Go back', value: 'back' });
        inquirer
            .prompt({
                type: 'list',
                name: 'id',
                message: "select the employee you want to delete:",
                choices: employeeList,
        })
        .then((answer) => {
            if (answer.id === "back") {
                deletStoresBrandEmployees();
                return;
            }
            const query = "DELETE FROM employees WHERE id = ?";
            connection.query(query, [answer.id], (err, res) => {
                if (err) throw err;
                console.log(
                    `DeleteE employee with ID ${answer.id} form the database!`
                )
                start()
            })
        })
    })


}

function deleteBrand() {
    const query = 'SELECT * FROM  products';
    connection.query(query, (err, res) => {
        if (err) throw err;
        const choices = res.map((brand) => ({
            name: `${brand.title} (${brand.id}) - ${brand.salary}`,
            value: brand.id,
        }))
        choices.push({ name: 'Go Back', value: null });
        inquirer.prompt({
            type: 'list',
            name: 'brandId',
            messsage: 'which brand would you like to delete?',
            choices:[
                ...choices, ]

        })
            .then((answer) => {
                if (answer.brandId === 'back') {
                    deletStoresBrandEmployees()
                    return
                }
                const query = 'DELETE FROM products WHERE id = ?';
                connection.query(query, [answer.brandId], (err, res) => {
                    if (err) throw err;
                    console.log(
                        `Delete employee with ID ${answer.id} from the database!`
                    );
                    start()
                });

            });
    });


}

function deleteStore() {
    const query = "SELECT * FROM stores";
    connection.query(query, (err, res) => {
        if (err) throw err;
        const storeChoices = res.map((stores) => ({
            name: stores.store_name,
            value: stores.id,
        }));
        inquirer
            .prompt({
                type: 'list',
                name: 'storeId',
                message: 'Which store would you like to delete?',
                choices: [
                    ...storeChoices, 
                    {name: 'Go back', value: "back"}
                ]
            })
            .then((answer) => {
                if(answer.storeId === 'back') {
                    deletStoresBrandEmployees();
                } else {
                    const query = "DELETE FROM stores WHERE id = ?";
                    connection.query(
                        query, 
                        [answer.storeId],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Deleted store with ID ${answer.storeId} for the database!`
                            );
                            start()
                        }
                    )
                }
            })


    })



}

function ViewTotalFundingOfStore() {

}






process.on('exit', () => {
    connection.end()
});