
module.exports = {
    getAllData: async (req,res) => {
       const db = req.app.get('db')
       const {user_id} = req.params
       console.log('params', req.params)
       const user = await db.join_all_user_budgets([user_id])
       delete user[0].hash;
       delete user[1].hash;
       res.status(200).send(user)
       
    }
}