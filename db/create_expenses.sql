
 
-- INSERT INTO
--   expenses(
--     budget_id,
--     rent_or_mortgage,
--     electric,
--     water,
--     internet,
--     groceries,
--     transportation,
--     auto_maintenance,
--     home_maintenance,
--     medical,
--     clothing,
--     gifts,
--     computer_replacement,
--     student_loan,
--     auto_Loan,
--     vacation,
--     fitness,
--     education,
--     dining_out,
--     gaming,
--     fun_money,
--     dates
--   )
-- VALUES(
--    $1,
--    $2,
--    $3,
--    $4,
--    $5,
--    $6,
--    $7,
--    $8,
--    $9,
--    $10,
--    $11,
--    $12,
--    $13,
--    $14,
--    $15,
--    $16,
--    $17,
--    $18,
--    $19,
--    $20,
--    $21,
--    $22
--   )
--   RETURNING *;

 
INSERT INTO
  expenses(
    budget_id,
    rent_or_mortgage,
    electric,
    water,
    internet,
    groceries,
    transportation,
    auto_maintenance,
    home_maintenance,
    medical,
    clothing,
    gifts,
    computer_replacement,
    student_loan,
    auto_Loan,
    vacation,
    fitness,
    education,
    dining_out,
    gaming,
    fun_money,
    dates
  )
VALUES(
   $1,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT,
   DEFAULT
  )
  RETURNING *;