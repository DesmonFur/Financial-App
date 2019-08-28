SELECT budget_id,budget_name,budget_balance,total_budgeted,creation_date FROM user_info u 
JOIN budgets b ON u.user_id  = b.user_id
WHERE b.user_id = $1
ORDER BY budget_id 