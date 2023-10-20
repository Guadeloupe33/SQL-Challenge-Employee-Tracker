# homework.12
Employee Management System
Description
This Employee Management System is a command-line application designed to help business owners view and manage their company's departments, roles, and employees. The application allows you to organize and plan your business by providing the following features:
<img src="" alt="Italian Trulli">

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee's role
The application is built with Node.js and uses MySQL as the database system. It provides a user-friendly menu that guides you through these operations.

Installation
Clone the repository to your local machine.

Navigate to the project's root directory.

Install the required dependencies using the following command:

bash
Copy code
npm install
Set up your MySQL database by running the provided SQL schema and seed files. You can do this by importing them into your MySQL server using a tool like phpMyAdmin or by running the SQL scripts using the MySQL command line.

Create a .env file in the project root directory to store your MySQL database credentials. Define the following environment variables:

makefile
Copy code
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
Usage
To use the Employee Management System, run the following command in your terminal:

bash
Copy code
node server.js
This will launch the application and present you with a menu. You can choose from the available options to manage your company's data.

Application Structure
server.js: The main application file that handles user input and menu options.
db/connection.js: Establishes a connection to the MySQL database.
seeds.sql: SQL file for populating the database with sample data.
schema.sql: SQL file for creating the database schema.
Dependencies
Node.js
MySQL
Inquirer (for user input)
dotenv (for handling environment variables)
Contributing
Feel free to contribute to this project by opening issues or pull requests on the GitHub repository.

License
This project is licensed under the MIT License. 