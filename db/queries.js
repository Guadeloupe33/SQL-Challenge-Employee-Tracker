const connection = require('./connection');

function getAllDepartments() {
  return connection.promise().query('SELECT * FROM department');
}

function addDepartment(name) {
  return connection.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
}


