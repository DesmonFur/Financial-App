UPDATE
  expenses
SET
  rent_or_mortgage = $1,
  electric = $2,
  water = $3,
  internet = $4,
  groceries = $5,
  transportation = $6,
  auto_maintenance = $7,
  home_maintenance = $8,
  medical = $9,
  clothing = $10,
  gifts = $11,
  computer_replacement = $12,
  student_loan = $13,
  auto_Loan = $14,
  vacation = $15,
  fitness = $16,
  education = $17,
  dining_out = $18,
  gaming = $19,
  fun_money = $20,
  dates = DEFAULT
WHERE
  expenses_id = $22;

SELECT * FROM expenses 
WHERE expenses_id = $22;