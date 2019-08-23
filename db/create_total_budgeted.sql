INSERT INTO budgets(budget_id,total_budgeted)
VALUES ($1,$2)
RETURNING *;
 