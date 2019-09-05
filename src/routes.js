import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/LandingPage/LandingPage";
import createBudget from "./components/CreateBudget/CreateBudget";

import AllBudgets from "./components/AllBudgets/AllBudgets";
export default (
  <Switch>
    <Route path="/" exact component={Landing} />

    <Route path="/createbudget" component={createBudget} />

    <Route path="/allbudgets" component={AllBudgets} />
  </Switch>
);
