import React, { Component } from "react";
import AllBudgets from "../AllBudgets/AllBudgets";
import OneBudget from "../OneBudget/OneBudget";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Container } from "./DashboardStyle";
import {setUser} from '../../ducks/reducer'
export class Dashboard extends Component {
  state = {
    budgets: []
  };

  deleteBudget = budget_id => {
    console.log(this.state.budgets);
    console.log(this.props.user_id);
    const { user_id } = this.props;
    axios.delete(`/api/deleteBudget/${budget_id}/${user_id}`).then(
      axios.get(`/api/budgets/${user_id}`).then(res => {
        console.log(res.data);
        this.setState({
          budgets: res.data
        });
      })
    ).catch(err => alert('failled to delete'))
  };

  pickBudget = budget_id => {
    const {user_id} = this.props
    axios.get(`/api/specificBudget/${budget_id}`).then(res => {
      console.log(res.data)
    })
  }


  componentDidMount() {
    const {email, user_id,budgets } = this.props;
    axios.get(`/api/getUserBudgets/${user_id}`).then(res => {
      this.setState({
        budgets: res.data
      });
    });
    this.props.setUser({email,user_id,budgets})
  }


  render() {
    // console.log(this.props)
    // console.log(this.state.budgets);
    // console.log(this.props.budgets);
    // const { budgets } = this.props;
    const { budgets } = this.state;
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
          <button>All Budgets</button>
        </Link>
        <Container>
          {budgets.map(budget => (
            <AllBudgets
              key={budget.budget_id}
              budget_id={budget.budget_id}
              budget_name={budget.budget_name}
              budget_balance={budget.budget_balance}
              delete_budget={this.deleteBudget}
              pick_budget={this.pickBudget}
              budget={budget}
            />
          ))}
        </Container>
      </div>
    );
  }
}
function mapStateToProps(reduxState) {
  const { email, user_id, budgets } = reduxState;
  return { email, user_id, budgets };
}

export default connect(mapStateToProps, {setUser})(Dashboard);
