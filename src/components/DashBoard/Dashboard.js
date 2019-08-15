import React, { Component } from "react";
import AllBudgets from "../AllBudgets/AllBudgets";
import OneBudget from "../OneBudget/OneBudget";
import { Link, Switch, Route } from "react-router-dom";
import {connect} from 'react-redux'
export class Dashboard extends Component {
  
  state = {
    budgets: []
  }

  componentDidMount(){
    console.log(this.props)
  }

  render() {
    console.log(this.props)
    const {budgets} = this.props
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
        {budgets.map(budget => (
          <AllBudgets 
          key={budget.budget_id}
          budget_id={budget.budget_id}
          budget_name={budget.budget_name}
          budget_balance={budget.budget_balance}
          />
        ))}
      </div>
    );
  }
}
function mapStateToProps(reduxState){
const {email,user_id, budgets} = reduxState;
return {email,user_id,budgets}
}

export default connect(mapStateToProps)(Dashboard);
