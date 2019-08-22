import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/DashBoard/Dashboard";
import Landing from "./components/LandingPage/LandingPage";
import createBudget from "./components/CreateBudget/CreateBudget";
import OneBudget from "./components/OneBudget/OneBudget";
import  AllBudgets  from "./components/AllBudgets/AllBudgets";
export default (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/createbudget" component={createBudget} />
  <Route path='/onebudget' component={OneBudget} />
  <Route path='/allbudgets' component={AllBudgets} />
  
  </Switch>
);
