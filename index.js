const inquirer = require('inquirer');
const Department = require('./models/Department'); // Import other models as needed

function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Select an option:',
        choices: [
          'View all departments',
          'Add a department',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'View all departments':
          Department.getAllDepartments()
            .then(([rows]) => {
              console.table(rows);
              mainMenu();
            })
            .catch((error) => console.error(error));
          break;
        case 'Add a department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Enter the department name:',
              },
            ])
            .then((answers) => {
              Department.addDepartment(answers.name)
                .then(() => {
                  console.log('Department added successfully.');
                  mainMenu();
                })
                .catch((error) => console.error(error));
            });
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end(); // Close the database connection
          break;
      }
    });
}

mainMenu();
