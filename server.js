
const mysql = require("mysql2");
require("dotenv").config();
const inquirer = require("inquirer");


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
      switch (answers.mainChoice) {
        case "View All Available Departments":
          viewAllDepartments();
          break;
        case "View All Available Roles":
          viewAllRoles();
          break;
        case "View All Available Employees":
          viewAllEmployees();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add a New Employee":
          addEmployee();
          break;
        case "Update Current Employee Role":
          updateEmployeeRole();
          break;
        case "Add To the Current Listing of Department":
          addDepartment();
          break;
      }
    });
  }
  


  function addRole() {
  
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
              message: "What is title the role?",
              name: "roleName",
            },
            {
              type: "input",
              message: "What is the salary for this role?",
              name: "salary",
            },
            {
              type: "list",
              message: "Which department is this role assign to?",
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
  function viewAllEmployees() {
    db.query("SELECT role.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id AS manager from employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            // Display the results in a formatted table
            console.table(results);
            // Call the main menu function again to continue
            showMainMenu();
        }
    });
}
function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.error("Error viewing roles: " + err);
    } else {
      console.log("List of Roles:");
      console.table(results);
    }
    showMainMenu();
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


  function viewAllDepartments() {
    db.query("SELECT * FROM department", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log("List of Departments:");
            console.table(results);
            showMainMenu(); // Return to the main menu
        }
    });
}


  function addEmployee() {
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
            employeeResultList.push("None");
            for (let i = 0; i < employeeResults.length; i++) {
              const currentName =
                employeeResults[i].first_name +
                " " +
                employeeResults[i].last_name;
              employeeResultList.push(currentName);
            }
  
            let roleID = 0;
            let managerID = 0;
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "What is the employee's first name?",
                  name: "firstName",
                },
                {
                  type: "input",
                  message: "What is the employee's last name?",
                  name: "lastName",
                },
                {
                  type: "list",
                  message: "What is the employee's role?",
                  choices: roleResultList,
                  name: "roleChoice",
                },
  
                {
                  type: "list",
                  message: "Who is the employee's manager?",
                  choices: employeeResultList,
                  name: "managerChoice",
                },
              ])
              .then((answers) => {
                for (let i = 0; i < roleResults.length; i++) {
                  if (roleResults[i].title === answers.roleChoice) {
                    roleID = i + 1;
                  }
                }
  
                if (answers.managerChoice === "None") {
                  managerID = null;
                } else {
                  for (let i = 0; i < employeeResults.length; i++) {
                    const currentName =
                      employeeResults[i].first_name +
                      " " +
                      employeeResults[i].last_name;
                    if (currentName === answers.managerChoice) {
                      managerID = i + 1;
                    }
                  }
                }
  
                db.query(
                  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                  [answers.firstName, answers.lastName, roleID, managerID],
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
  showMainMenu();
  

