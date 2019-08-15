SELECT
  *
FROM
  user_info
WHERE
  email = $1;
-- SELECT
  --   *
  -- FROM
  --   budgets b
  --   JOIN expenses e ON b.budget_id = e.budget_id
  --   JOIN user_info u ON b.user_id = u.user_id
  -- WHERE
  --   email = $1
