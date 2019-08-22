import React, { Component } from "react";
import AllBudgets from "../AllBudgets/AllBudgets.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Container } from "./DashboardStyle";
// import { getBudgetExpenses } from "../../ducks/reducer.js";
export class Dashboard extends Component {
  state = {
    budgets: []
  };

  componentDidMount() {
    const { user_id, budgets } = this.props;
    axios.get(`/api/getUserBudgets/${user_id}`).then(res => {
      this.setState({
        budgets: res.data
      });
    });
  }

  render() {
    const { budgets } = this.state;

    console.log(this.props);
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/createBudget">
          <button> Create Budget</button>
        </Link>
        <Link to="/allbudgets">
          <button onClick={this.getAllBudgets}> AllBudgets </button>
        </Link>

        {/* <Container>{mappedBudgets}</Container> */}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { email, user_id, budgets } = reduxState;
  return { email, user_id, budgets };
}

export default connect(
  mapStateToProps
  // { getBudgetExpenses }
)(Dashboard);
