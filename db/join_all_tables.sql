SELECT
  *
FROM
  budgets b
  JOIN expenses e ON b.budget_id = e.budget_id
  JOIN user_info u ON b.user_id = u.user_id
  JOIN deposits d ON b.budget_id = d.budget_id
WHERE
  u.user_id = $1