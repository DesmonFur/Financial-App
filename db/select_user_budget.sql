 
SELECT * FROM budgets b
JOIN expenses e ON b.budget_id = e.budget_id 
WHERE user_id = $1 AND b.budget_id = $2