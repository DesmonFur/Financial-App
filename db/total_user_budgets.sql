SELECT SUM(default_balance) FROM budgets
WHERE user_id = $1