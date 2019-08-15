SELECT
  budget_id,budget_name,budget_balance
FROM
  user_info u 
  JOIN budgets b ON u.user_id = b.user_id
WHERE
  email = $1;