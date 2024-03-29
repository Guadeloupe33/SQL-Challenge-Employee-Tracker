
-- Populate department table
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance');

-- Populate role table
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 70000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Marketing Specialist', 55000.00, 2),
  ('Financial Analyst', 60000.00, 3);

-- Populate employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Robert', 'Johnson', 2, 1),
  ('Sara', 'Williams', 3, 2);
