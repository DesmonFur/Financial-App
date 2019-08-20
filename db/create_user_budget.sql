INSERT INTO budgets (user_id,budget_name,budget_balance)
VALUES ($1,$2,$3)
RETURNING *;
 
SELECT * FROM budgets
WHERE user_id = $1;