INSERT INTO budgets (user_id,budget_name,budget_balance,default_balance,creation_date)
VALUES ($1,$2,$3,$4,DEFAULT)
RETURNING *;
 
SELECT * FROM budgets
WHERE user_id = $1;