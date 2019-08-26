DROP TABLE IF EXISTS deposits;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS user_info;
CREATE TABLE user_info(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(9999),
  hash TEXT
);
CREATE TABLE budgets (
  budget_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_info(user_id),
  budget_name VARCHAR(9000),
  budget_balance INTEGER,
  default_balance INTEGER,
  total_budgeted INTEGER,
  creation_date varchar(20) default to_char(CURRENT_DATE, 'MM/dd/yyyy'),
);
CREATE TABLE expenses(
  expenses_id SERIAL PRIMARY KEY,
  budget_id INTEGER REFERENCES budgets(budget_id),
  rent_or_mortgage INTEGER DEFAULT 0,
  Electric INTEGER DEFAULT 0,
  Water INTEGER DEFAULT 0,
  Internet INTEGER DEFAULT 0,
  Groceries INTEGER DEFAULT 0,
  Transportation INTEGER DEFAULT 0,
  Auto_Maintenance INTEGER DEFAULT 0,
  Home_Maintenance INTEGER DEFAULT 0,
  Medical INTEGER DEFAULT 0,
  Clothing INTEGER DEFAULT 0,
  Gifts INTEGER DEFAULT 0,
  Computer_Replacement INTEGER DEFAULT 0,
  Student_Loan INTEGER DEFAULT 0,
  Auto_Loan INTEGER DEFAULT 0,
  Vacation INTEGER DEFAULT 0,
  Fitness INTEGER DEFAULT 0,
  Education INTEGER DEFAULT 0,
  Dining_Out INTEGER DEFAULT 0,
  Gaming INTEGER DEFAULT 0,
  Fun_Money INTEGER DEFAULT 0,
  dates varchar(20) default to_char(CURRENT_DATE, 'Mon/yyyy'),
  note VARCHAR(9000)
);
CREATE TABLE deposits(
  deposit_id serial primary key,
  budget_id INTEGER REFERENCES budgets(budget_id),
  deposit_amount INTEGER,
  note VARCHAR(9000)
);
SELECT
  *
FROM
  budgets;
SELECT
  SUM(default_balance)
FROM
  budgets
WHERE
  user_id = 6;
SELECT
  *
FROM
  expenses;
SELECT
  *
FROM
  deposits;
-- UPDATE budgets
  -- SET budget_balance = 4000
  -- WHERE budget_id = 1;
SELECT
  *
FROM
  budgets b
  join expenses e ON b.budget_id = e.budget_id
WHERE
  b.budget_id = 5;
SELECT
  *
FROM
  expenses e
  JOIN budgets b ON e.budget_id = b.budget_id
WHERE
  expenses_id = 1;
SELECT
  *
FROM
  user_info;
SELECT
  *
FROM
  budgets b
  JOIN expenses e ON b.budget_id = e.budget_id
WHERE
  user_id = 1
  AND b.budget_id = 3;