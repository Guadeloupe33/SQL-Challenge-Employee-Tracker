

const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

menuList = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      
      "Add A Role",
      "View All Available Departments",
      "Add To the current listing of Department",
      "View All Available Employees",
      "Add a New Employee",
      "Update Current Employee Role",
      "View All Available Roles",
    ],
    name: "mainChoice",
  },
];

const db = mysql.createConnection(
    {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the ${process.env.DB_NAME} database`)
  );
  
 
  function showMainMenu() {
    inquirer.prompt(menuList).then((answers) => {
      console.log(answers.mainChoice);
      if (answers.mainChoice === "Add A Role") {
        viewAllEmployees();
      } else if (answers.mainChoice === "View All Available Departments") {
       
        addEmployee();
      } else if (answers.mainChoice === "Add To the current listing of Department") {
       
        updateEmployeeRole();
      } else if (answers.mainChoice === "View All Available Employees") {
       
        viewAllRoles();
      } else if (answers.mainChoice === "Add a New Employee") {
       
        addRole();
      } else if (answers.mainChoice === "Update Current Employee Role") {
       
        viewAllDepartments();
      } else if (answers.mainChoice === "View All Available Roles") {
        addDepartment();
      }
    });
  }


  function addRole() {
    //Get the current departments
    db.query("SELECT * FROM department", function (err, departmentResults) {
      if (err) {
        console.log(err);
      } else {
        const departmentResultsList = [];
        for (let i = 0; i < departmentResults.length; i++) {
          departmentResultsList.push(departmentResults[i].name);
        }
  
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the role?",
              name: "roleName",
            },
            {
              type: "input",
              message: "What is the salary of the role?",
              name: "salary",
            },
            {
              type: "list",
              message: "Which department does the role belong to?",
              choices: departmentResults,
              name: "departmentChoice",
            },
          ])
          .then((answers) => {
            let departmentID = 0;
            for (let i = 0; i < departmentResults.length; i++) {
              if (departmentResults[i].name === answers.departmentChoice) {
                departmentID = i + 1;
              }
            }
            db.query(
              "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
              [answers.roleName, answers.salary, departmentID],
              function (err, results) {
                if (err) {
                  console.log(err);
                }
                console.log("Success!");
                showMainMenu();
              }
            );
          });
      }
    });
  }
  function updateEmployeeRole() {
    db.query("SELECT * FROM role", function (err, roleResults) {
      if (err) {
        console.log(err);
      } else {
        const roleResultList = [];
        for (let i = 0; i < roleResults.length; i++) {
          roleResultList.push(roleResults[i].title);
        }
  
        db.query("SELECT * FROM employee", function (err, employeeResults) {
          if (err) {
            console.log(err);
          } else {
            const employeeResultList = [];
            for (let i = 0; i < employeeResults.length; i++) {
              const currentName =
                employeeResults[i].first_name +
                " " +
                employeeResults[i].last_name;
              employeeResultList.push(currentName);
            }
  
            let roleID = 0;
            let employeeID = 0;
            inquirer
              .prompt([
                {
                  type: "list",
                  message: "Which employee's role would you want to update?",
                  choices: employeeResultList,
                  name: "employeeUpdateChoice",
                },
                {
                  type: "list",
                  message:
                    "Which role do you want to assign the selected employee?",
                  choices: roleResultList,
                  name: "roleUpdateChoice",
                },
              ])
              .then((answers) => {
                for (let i = 0; i < roleResults.length; i++) {
                  if (roleResults[i].title === answers.roleUpdateChoice) {
                    roleID = i + 1;
                  }
                }
  
                for (let i = 0; i < employeeResults.length; i++) {
                  const currentName =
                    employeeResults[i].first_name +
                    " " +
                    employeeResults[i].last_name;
                  if (currentName === answers.employeeUpdateChoice) {
                    employeeID = i + 1;
                  }
                }
  
                db.query(
                  "UPDATE employee SET role_id = ? WHERE employee.id = ?",
                  [roleID, employeeID],
                  function (err, results) {
                    if (err) {
                      console.log(err);
                    }
                    console.log("Success!");
                    showMainMenu();
                  }
                );
              });
          }
        });
      }
    });
  }


// const inquirer = require('inquirer');
// const Department = require('./models/Department'); 

// function mainMenu() {
//   inquirer
//     .prompt([
//       {
//         type: 'list',
//         name: 'choice',
//         message: 'Select an option:',
//         choices: [
//           'View all departments',
//           'Add a department',
//           'Exit',
//         ],
//       },
//     ])
//     .then((answers) => {
//       switch (answers.choice) {
//         case 'View all departments':
//           Department.getAllDepartments()
//             .then(([rows]) => {
//               console.table(rows);
//               mainMenu();
//             })
//             .catch((error) => console.error(error));
//           break;
//         case 'Add a department':
//           inquirer
//             .prompt([
//               {
//                 type: 'input',
//                 name: 'name',
//                 message: 'Enter the department name:',
//               },
//             ])
//             .then((answers) => {
//               Department.addDepartment(answers.name)
//                 .then(() => {
//                   console.log('Department added successfully.');
//                   mainMenu();
//                 })
//                 .catch((error) => console.error(error));
//             });
//           break;
//         case 'Exit':
//           console.log('Goodbye!');
//           connection.end(); 
//           break;
//       }
//     });
// }

// mainMenu();
