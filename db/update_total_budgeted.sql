UPDATE budgets 
SET total_budgeted = $1
WHERE budget_id = $2
RETURNING *;