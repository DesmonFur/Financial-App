SELECT budget_id,budget_name,budget_balance FROM user_info u 
JOIN budgetS b ON u.user_id  = b.user_id
WHERE b.user_id = $1