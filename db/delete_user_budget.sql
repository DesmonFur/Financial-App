
DELETE FROM budgets 
WHERE budget_id = $1;

SELECT * FROM budgets
WHERE user_id = $2;