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
                'Add a employee',
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
                case 'Add an employee':
                    addEmployee()
                    break;
                case 'Add a Manager':
                    addManager();
                    break
                case 'Add a brand':
                    addBrand()
                    break;
                case "View the total funding of a store":
                    ViewTotalFundingOfStore();
                    break;
                case 'View Employees by Store':
                    viewEmployeesByStore()
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
                    choices: res.map((store) => store.store_name ),
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
    connection.query("SELECT id, title FROM employees", (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

        connection.query(
            'Select id, Concat(first_name, " " , last_name) as from employee',
            (error, results) => {
                if (error) {
                    console.error(error);
                    return
                }
                const managers = results.map(({ id, name }) => ({
                    name,
                    value: id,
                }));

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
                        {
                            type: 'list',
                            name: 'managerId',
                            message: 'Select the employee manager:',
                            choices: [
                                { name: 'none', value: null },
                                ...managers,
                            ],
                        },
                    ])
                    .then((answer) => {
                        const SQL =
                            'Insert into employee (first_name, last_name, role_id, manager_id) Values(?,?,?,?,)';
                        const values = [
                            answer.firstName,
                            answer.lastName,
                            answer.roleId,
                            answer.managerId,
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
function addManager() {
    const queryDepartments = "Select from departmants";
    const queryEmployees = 'Select form employee';

    connection.query(queryDepartments, (err, resDepartments) => {
        if (err) throw err;
        connection.query(queryEmployees, (err, resEmployees) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Select the department:',
                        choices: resDepartments.map(
                            (department) => department.department_name
                        ),

                    },
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Select the employee to add to manager to:',
                        choices: resEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Select employee manager:',
                        choices: resEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },

                ])
                .then((answer) => {
                    const department = resDepartments.find(
                        (department) =>
                            department.department_name === answer.department
                    );
                    const employee = resEmployees.find(
                        (employee) => 
                            `${employee.first_name} ${employee.last_name}` === 
                        answer.employee
                    );
                    const manager = resEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` === 
                        answer.manager    
                    );
                    const query = 
                    'Update employee set manager_id = ? Where id = ? AND role_id In (Select id From roles Where department_id = ?'
                    connection.query(
                        query,
                        [manager.id, employee.id, department.id],
                        (err,res) => {
                            if (err) throw err;
                            console.log(
                                `Added manager ${manager.first_name} ${manager.last_name} to employee ${employee.first_name} ${employee.last_name} in department ${department.department_name}`
                            );
                            start();
                        }
                    )
                })
    })
})

}

function viewEmployeesByStore() {
    const query = 'Slect store.store_name, employee.first_name, employee.last_name FORM employee INNER JOIN roles ON employee.role_od = roles.id INNER JOIN store ON roles.store_id = stores.id ORDER BY stores.store_name ASC'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        start()
    })
}

function updateEmployeeRole() {
    const queryEmployees =
        "Select employee.id employee.first_name, employee.last_name, roles.title From employee Left Join roles on employee.role_id = roles.id";
    const queryRoles = 'Select from roles';
    connection.query(queryEmployees, (err, resEmployees) => {
        if (err) throw err;
        connection.query(queryRoles, (err, resRoles) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type:'list',
                        name: 'employee',
                        message: 'Select eh employee to update:',
                        choices: resEmployees.map(
                            (employee) => 
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type:'list',
                        name: 'role',
                        message: 'Select the new role:',
                        choices: resRoles.map((role) => role.title),
                    }
                ])
                .then((answer) => {
                    const employee = resEmployees.find(
                        (employee) => `${employee.first_name} ${employee.last_name}` === 
                        answer.employee
                    );
                    const role = resRoles.find(
                        (role) => role.tile === answer.role
                    );
                    const query = 
                    'update employee Set role_id = ? WHere id = ?';
                    connection.query(
                        query, 
                        [role.id, employee.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.tile} in the database!`
                            )
                            start();
                        }
                    )
                })
        })
    })
}

function deletStoresBrandEmployees() {
    inquirer
        .prompt({
            type: 'list',
            name: 'data',
            message: 'what would you like to delete?',
            choices: ["employee", "Store", "Brand"],
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
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) =>{
        if(err) throw err;
        const employeeList = res.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }))
        employeeList.push({name: 'Go back', value: 'back'});
        inquirer.prompt({

        })
    })
    

}

function deleteBrand() {
    const query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        if(err) throw err;
        const choices = res.map((brand) =({
            name: `${brand.title} (${band.id}) - ${brand.price}`,
            value: brand.id,
        }))
        choice.push({ name: 'Go Back', value: null });
        inquirer.prompt({
            type: 'list',
            name: 'brandId',
            messsage: 'which brand would you like to delete?',
            choice: 
                choices,

        })
        .then((answer) => {
            if (answer.brandId === null) {
                deletStoresBrandEmployees()
                return
            }

        })
    })
    

}

function deleteStore() {
    const query = "SELECT * FROM stores";
    connection.query(query, (err, res) => {
        if (err) throw err;
        
    })
    
    

}

function ViewTotalFundingOfStore() {

}






process.on('exit', () => {
    connection.end()
});