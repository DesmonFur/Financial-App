const express = require("express");
const massive = require("massive");
const cors = require('cors')
require("dotenv").config();
const app = express();
const session = require("express-session");
const { CONNECTION_STRING, PORT, SESSION_SECRET,TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,MY_PHONE_NUMBER } = process.env;



const authCtrl = require("./controllers/authController");
const budgCtrl = require("./controllers/budgetController");

app.use(express.json());
app.use( express.static( `${__dirname}/../build` ) );
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10
    }
  })
);
app.use(cors());


// twilio
const accountSid = TWILIO_ACCOUNT_SID
const authToken = TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

// client.messages.create({
//   to:MY_PHONE_NUMBER,
//   from: '+18645684901',
//   body: 'This is'
// }).then((message) => console.log(message.sid))

// app.get('/sms', (req,res) => {
//   res.send('welcome to express')
// })
app.get('/send-text', (req,res) => {
  const { recipient, textmessage} = req.query
  
  client.messages.create({
    body:textmessage,
    to: "+1" + recipient,
    from: '+18645684901'
  }).then((message) => console.log(message.body) )
})


app.get("/auth/session", authCtrl.getSession);
app.get("/api/getUserBudgets/:user_id", budgCtrl.getUserBudgets);
app.get("/api/budgets/:user_id", budgCtrl.getBudgets);
app.get("/api/sumUserBudgets", budgCtrl.sumBudgets);
app.get("/api/specificBudget/:budget_id", budgCtrl.selectUserBudget);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.delete("/auth/logout", authCtrl.logout);
app.delete("/api/deleteBudget/:budget_id/:user_id", budgCtrl.deleteBudget);
app.get("/api/getexpenses/:expenses_id", budgCtrl.getExpenses);
app.put("/api/updateexpenses/:expenses_id", budgCtrl.updateExpenses);
app.put("/api/updateBudget", budgCtrl.updateBudget);
app.put("/api/updateTotalBudgeted", budgCtrl.updateTotalExpenses);
app.post("/api/createBudget", budgCtrl.createBudget);
app.post("/api/createexpenses/:budget_id", budgCtrl.createBudgetExpenses);
app.post("/api/createtotal", budgCtrl.createTotalExpenses);



// app.post('/api/createAll/:budget_id', budgCtrl.createAll)

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(PORT, () =>
    console.log(`'DINGLEBERRY CLYDI RUNNNI ${PORT} FLIES`)
  );
});
