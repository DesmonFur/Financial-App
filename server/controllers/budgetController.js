module.exports = {
  getUserBudgets: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    console.log("user_session", req.session.user.user_id);
    const user = await db.join_all_user_budgets([user_id]);
    //    delete user[0].hash;
    //    delete user[1].hash;
    res.status(200).send(user);
  },
  createBudget: async (req, res) => {
    const db = req.app.get("db");
    const { budget_name, budget_balance } = req.body;
    const { user_id } = req.session.user;
    console.log("body", req.body);
    const budget = await db.create_user_budget([
      user_id,
      budget_name,
      budget_balance
    ]);
    // res.sendStatus(200)
    res.status(200).send(budget);
  },
  createBudgetExpenses: async (req, res) => {
    const db = req.app.get("db");
    const { budget_id } = req.params;
    console.log(req.params);
    const {
      rent_or_mortgage,
      electric,
      water,
      internet,
      groceries,
      transportation,
      auto_maintenance,
      home_maintenance,
      medical,
      clothing,
      gifts,
      computer_replacement,
      student_loan,
      auto_loan,
      vacation,
      fitness,
      education,
      dining_out,
      gaming,
      fun_money,
      dates
    } = req.body;
    const expenses = await db.create_expenses([
      budget_id,
      rent_or_mortgage,
      electric,
      water,
      internet,
      groceries,
      transportation,
      auto_maintenance,
      home_maintenance,
      medical,
      clothing,
      gifts,
      computer_replacement,
      student_loan,
      auto_loan,
      vacation,
      fitness,
      education,
      dining_out,
      gaming,
      fun_money,
      dates
    ]);

    res.status(200).send(expenses);
  },
  deleteBudget: async (req, res) => {
    const db = req.app.get("db");
    const { budget_id, user_id } = req.params;
    console.log("Budget.id", budget_id, "User", user_id);
    const deleted = await db.delete_user_budget([budget_id, user_id]);
    res.status(200).send(deleted);
  },
  getBudgets: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    console.log("MY USER ID", user_id);
    const budgets = await db.get_budgets([user_id]);
    res.status(200).send(budgets);
  },
  selectUserBudget: async (req, res) => {
    const db = req.app.get("db");
    const { budget_id } = req.params;
    const { user_id } = req.session.user;
    const budget = await db.select_user_budget([user_id, budget_id]);

    console.log("budget_param", budget_id);
    res.status(200).send(budget);
  },
  updateExpenses: async (req, res) => {
    const db = req.app.get("db");
    const {
      rent_or_mortgage,
      electric,
      water,
      internet,
      groceries,
      transportation,
      auto_maintenance,
      home_maintenance,
      medical,
      clothing,
      gifts,
      computer_replacement,
      student_loan,
      auto_loan,
      vacation,
      fitness,
      education,
      dining_out,
      gaming,
      fun_money,
      dates
    } = req.body;
    const { expenses_id } = req.params;

    const expenses = await db.update_expenses([
      rent_or_mortgage,
      electric,
      water,
      internet,
      groceries,
      transportation,
      auto_maintenance,
      home_maintenance,
      medical,
      clothing,
      gifts,
      computer_replacement,
      student_loan,
      auto_loan,
      vacation,
      fitness,
      education,
      dining_out,
      gaming,
      fun_money,
      dates,
      expenses_id
    ]);
    console.log("req.params", expenses_id, "req.body", req.body);
    res.status(200).send(expenses);
  },
  getExpenses: async (req, res) => {
    const db = req.app.get("db");
    const { expenses_id } = req.params;
    const expenses = await db.get_expenses([expenses_id]);

    res.status(200).send(expenses);
  },

  createAll: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { budget_id } = req.params;
    console.log("body", req.body);
    const {
      budget_name,
      budget_balance,
      rent_or_mortgage,
      electric,
      water,
      internet,
      groceries,
      transportation,
      auto_maintenance,
      home_maintenance,
      medical,
      clothing,
      gifts,
      computer_replacement,
      student_loan,
      auto_loan,
      vacation,
      fitness,
      education,
      dining_out,
      gaming,
      fun_money,
      dates
    } = req.body;
    const budget = db.test([
      budget_id,
      rent_or_mortgage,
      electric,
      water,
      internet,
      groceries,
      transportation,
      auto_maintenance,
      home_maintenance,
      medical,
      clothing,
      gifts,
      computer_replacement,
      student_loan,
      auto_loan,
      vacation,
      fitness,
      education,
      dining_out,
      gaming,
      fun_money,
      dates,
      user_id,
      budget_name,
      budget_balance
    ]);
    res.status(200).send(budget)
  },
  updateBudget: async (req,res) => {
    const db = req.app.get('db')
    const {budget_id, budget_balance} = req.body
    console.log(req.body)
     const balance =  await db.update_budget_balance([budget_balance, budget_id])
      res.status(200).send(balance)
  }
  
};
