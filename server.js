const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'mydatabase', // Replace with your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
  startApp();
});

function startApp() {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          // Implement logic to view departments
          break;

        case 'View all roles':
          // Implement logic to view roles
          break;

        case 'View all employees':
          // Implement logic to view employees
          break;

        case 'Add a department':
          // Implement logic to add a department
          break;

        case 'Add a role':
          // Implement logic to add a role
          break;

        case 'Add an employee':
          // Implement logic to add an employee
          break;

        case 'Update an employee role':
          // Implement logic to update an employee's role
          break;

        case 'Exit':
          console.log('Exiting the application.');
          connection.end();
          break;
      }
    });
}

// Implement database query functions for each action here.

// Example query function for viewing all departments:
function viewDepartments() {
  const sql = 'SELECT * FROM department';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

// You will need to implement similar functions for other actions.

// Call the startApp function to begin the application
startApp();

