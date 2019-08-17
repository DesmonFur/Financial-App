module.exports = {
  getUserBudgets: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    console.log('user_session', req.session.user.user_id)
    const user = await db.join_all_user_budgets([user_id]);
    //    delete user[0].hash;
    //    delete user[1].hash;
    res.status(200).send(user);
  },
  createBudget: async (req, res) => {
    const db = req.app.get("db");
    const { budget_name,budget_balance } = req.body;
const {user_id} = req.session.user
    console.log("body", req.body);
    const budget = await db.create_user_budget([
      user_id,
      budget_name,
      budget_balance
    ]);
    // res.sendStatus(200)
    res.status(200).send(budget)
  },
  deleteBudget: async (req,res) => {
      const db = req.app.get('db')
      const {budget_id,user_id} = req.params
      console.log('Budget.id',budget_id,'User',user_id)
      const deleted = await db.delete_user_budget([budget_id,user_id])
      res.status(200).send(deleted)
  },
  getBudgets: async (req,res) => {
    const db = req.app.get('db')
    const {user_id} = req.session.user
    console.log('MY USER ID',user_id)
    const budgets = await db.get_budgets([user_id])
    res.status(200).send(budgets)
  },
  selectUserBudget: async (req, res) => {
    const db = req.app.get("db");
    const { budget_id } = req.params;
    const {user_id} = req.session.user
    const budget = await db.select_user_budget([user_id,budget_id])

    console.log("budget_param", budget_id);
    res.status(200).send(budget)
  }
};
