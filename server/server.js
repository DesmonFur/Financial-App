const express = require('express')
const massive = require('massive')
require('dotenv').config()
const app = express()
const session = require('express-session')
const {CONNECTION_STRING, PORT, SESSION_SECRET} = process.env 
const authCtrl = require('./controllers/authController')
const budgCtrl = require('./controllers/budgetController')
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
    }
}))

app.get('/auth/session', authCtrl.getSession)
app.get('/api/getUserBudgets/:user_id', budgCtrl.getUserBudgets)
app.get('/api/budgets/:user_id', budgCtrl.getBudgets)
app.get('/api/specificBudget/:budget_id', budgCtrl.selectUserBudget)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.delete('/api/deleteBudget/:budget_id/:user_id', budgCtrl.deleteBudget)
app.get('/api/getexpenses/:expenses_id', budgCtrl.getExpenses)
app.put('/api/updateexpenses/:expenses_id', budgCtrl.updateExpenses)

app.post('/api/createbudget/:budget_id', budgCtrl.createBudget)
// app.post('/api/createBudget', budgCtrl.createBudget)
// app.post('/api/createexpenses/:budget_id', budgCtrl.createBudgetExpenses)


massive(CONNECTION_STRING).then(db =>{
    app.set('db', db)
    app.listen(PORT, () => console.log( `'DINGLEBERRY CLYDI RUNNNI ${PORT} FLIES`))
})
