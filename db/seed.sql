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
  budget_cap INTEGER
);
CREATE TABLE expenses(
  expenses_id SERIAL PRIMARY KEY,
  budget_id INTEGER REFERENCES budgets(budget_id),
  rent_or_mortgage INTEGER  DEFAULT 0 ,
  Electric INTEGER   DEFAULT 0,
  Water INTEGER   DEFAULT 0,
  Internet INTEGER   DEFAULT 0,
  Groceries INTEGER   DEFAULT 0,
  Transportation INTEGER   DEFAULT 0,
  Auto_Maintenance INTEGER   DEFAULT 0,
  Home_Maintenance INTEGER   DEFAULT 0,
  Medical INTEGER   DEFAULT 0,
  Clothing INTEGER   DEFAULT 0,
  Gifts INTEGER   DEFAULT 0,
  Computer_Replacement INTEGER   DEFAULT 0,
  Student_Loan INTEGER   DEFAULT 0,
  Auto_Loan INTEGER   DEFAULT 0,
  Vacation INTEGER   DEFAULT 0,
  Fitness INTEGER   DEFAULT 0,
  Education INTEGER   DEFAULT 0,
  Dining_Out INTEGER   DEFAULT 0,
  Gaming INTEGER   DEFAULT 0,
  Fun_Money INTEGER   DEFAULT 0,
  dates VARCHAR(9000),
  note VARCHAR(9000)
);
CREATE TABLE deposits(
  deposit_id serial primary key,
  budget_id INTEGER REFERENCES budgets(budget_id),
  deposit_amount INTEGER,
  note VARCHAR(9000)
);
INSERT INTO
  user_info(email)
VALUES
  ('des'),
  ('Einstein');
INSERT INTO
  budgets(user_id, budget_name, budget_balance)
VALUES
  (1, 'Desmond1', 12345),
  (1, 'Desmond2', 50193),
  (2, 'Einstein1', 50193),
  (2, 'Einstein2', 50193);
INSERT INTO
  expenses(
    budget_id,
    Rent_Or_Mortgage,
    Electric,
    Water,
    Internet,
    Groceries,
    Transportation,
    Auto_Maintenance,
    Home_Maintenance,
    Medical,
    Clothing,
    Gifts,
    Computer_Replacement,
    Student_Loan,
    Auto_Loan,
    Vacation,
    Fitness,
    Education,
    dining_Out,
    Gaming,
    Fun_Money,
    dates,
    note
  )
VALUES(
    3,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    '04/09/2002',
    'SO FRESH AND SO CLEAN CLEAN'
  );
INSERT INTO
  expenses(
    budget_id,
    Rent_Or_Mortgage,
    Electric,
    Water,
    Internet,
    Groceries,
    Transportation,
    Auto_Maintenance,
    Home_Maintenance,
    Medical,
    Clothing,
    Gifts,
    Computer_Replacement,
    Student_Loan,
    Auto_Loan,
    Vacation,
    Fitness,
    Education,
    dining_Out,
    Gaming,
    Fun_Money,
    dates,
    note
  )
VALUES(
    1,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    '04/09/2002',
    'FINDING MY WAY DOWNTOWN'
  );
INSERT INTO
  expenses(
    budget_id,
    Rent_Or_Mortgage,
    Electric,
    Water,
    Internet,
    Groceries,
    Transportation,
    Auto_Maintenance,
    Home_Maintenance,
    Medical,
    Clothing,
    Gifts,
    Computer_Replacement,
    Student_Loan,
    Auto_Loan,
    Vacation,
    Fitness,
    Education,
    dining_Out,
    Gaming,
    Fun_Money,
    dates,
    note
  )
VALUES(
    2,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    500,
    '04/04/1904',
    'On the grind outchere grinding'
  );
INSERT INTO
  deposits(budget_id, deposit_amount, note)
VALUES(2, 76657, 'jdjd');
SELECT
  *
FROM
  user_info;
SELECT
  *
FROM
  budgets;
SELECT
  *
FROM
  expenses;
SELECT
  *
FROM
  deposits;
  