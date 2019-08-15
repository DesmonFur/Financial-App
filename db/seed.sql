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
  budget_balance INTEGER
);
CREATE TABLE expenses(
  expenses_id SERIAL PRIMARY KEY,
  budget_id INTEGER REFERENCES budgets(budget_id),
  "Rent/Mortgage" INTEGER,
  Electric INTEGER,
  Water INTEGER,
  Internet INTEGER,
  Groceries INTEGER,
  Transportation INTEGER,
  Auto_Maintenance INTEGER,
  Home_Maintenance INTEGER,
  Medical INTEGER,
  Clothing INTEGER,
  "Gifts/Giving" INTEGER,
  Computer_Replacement INTEGER,
  Student_Loan INTEGER,
  Auto_Loan INTEGER,
  Vacation INTEGER,
  Fitness INTEGER,
  Education INTEGER,
  Dining_Out INTEGER,
  Gaming INTEGER,
  Fun_Money INTEGER,
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
  user_info(username, email)
VALUES
  ('Des', 'des@mond.com'),
  ('Einstein', 'pellet@zer.com');
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
    "Rent/Mortgage",
    Electric,
    Water,
    Internet,
    Groceries,
    Transportation,
    Auto_Maintenance,
    Home_Maintenance,
    Medical,
    Clothing,
    "Gifts/Giving",
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
    'Where I from I rich'
  );
INSERT INTO
  expenses(
    budget_id,
    "Rent/Mortgage",
    Electric,
    Water,
    Internet,
    Groceries,
    Transportation,
    Auto_Maintenance,
    Home_Maintenance,
    Medical,
    Clothing,
    "Gifts/Giving",
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
    '04/09/2002',
    'Where I from I rich'
  );
INSERT INTO
  expenses(
    budget_id,
    "Rent/Mortgage",
    Electric,
    Water,
    Internet,
    Groceries,
    Transportation,
    Auto_Maintenance,
    Home_Maintenance,
    Medical,
    Clothing,
    "Gifts/Giving",
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
    'Where I from I rich'
  );
INSERT INTO
  expenses(
    budget_id,
    "Rent/Mortgage",
    Electric,
    Water,
    Internet,
    Groceries,
    Transportation,
    Auto_Maintenance,
    Home_Maintenance,
    Medical,
    Clothing,
    "Gifts/Giving",
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
    4,
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
    '10/09/2012',
    'Where I from I rich'
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
SELECT
  *
FROM
  budgets b
  JOIN expenses e ON b.budget_id = e.budget_id
  JOIN user_info u ON b.user_id = u.user_id
  JOIN deposits d ON b.budget_id = d.budget_id
WHERE
  u.user_id = 1