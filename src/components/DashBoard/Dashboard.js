import React, { Component } from "react";
import AllBudgets from "../AllBudgets/AllBudgets";
import OneBudget from "../OneBudget/OneBudget";
import { Link, Switch, Route } from "react-router-dom";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>

        <Link to="/createBudget">
          <button> Create Budget</button>
        </Link>
        <Switch>
          <Route exact path="/dashboard/allbudgets" component={AllBudgets} />
          <Route exact path="/dashboard/onebudget" component={OneBudget} />
        </Switch>

        <Link to="/dashboard/allbudgets">
          <button>Budget</button>
        </Link>
        <Link to="/dashboard/onebudget">
          <button>Budget</button>
        </Link>
      </div>
    );
  }
}

export default Dashboard;
