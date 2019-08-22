SELECT * FROM expenses  e 
JOIN budgets b ON e.budget_id = b.budget_id
WHERE expenses_id = $1