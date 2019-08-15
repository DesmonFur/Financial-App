import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/DashBoard/Dashboard";
import Landing from "./components/LandingPage/LandingPage";
import createBudget from "./components/CreateBudget/CreateBudget";
export default (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/createBudget" component={createBudget} />
  </Switch>
);
