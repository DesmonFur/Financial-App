import React, { Component } from "react";
import AllBudgets from "../AllBudgets/AllBudgets.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Container } from "./DashboardStyle";
// import { getBudgetExpenses } from "../../ducks/reducer.js";
export class Dashboard extends Component {
  state = {
    budgets: [],
    allBudgets: 0
  };

  componentDidMount() {
    const { user_id, budgets } = this.props;
    const { allBudgets } = this.state;
    axios.get(`/api/getUserBudgets/${user_id}`).then(res => {
      this.setState({
        budgets: res.data
      });
      if (res.data[0].budget_balance) {
        console.log(
          res.data.map(b => b.budget_balance).reduce((acc, cv) => acc + cv)
        );
        let all = res.data
          .map(b => b.budget_balance)
          .reduce((acc, cv) => acc + cv);
        this.setState({
          allBudgets: all
        });
      }
      // const data = this.state.data;

      // if(data.datasets)
      // {
      //   let colors = ["rgba(255,0,200,0.75)"]
      //   data.datasets.forEach((set, i) => {
      //     set.backgroundColor = this.setGradientColor(canvas,colors[i])
      //     set.borderColor = 'white';
      //     set.borderWidth = 2;
      //   })
      // }
      // return data
    });
  }

  render() {
    const { budgets } = this.state;

    console.log(this.props);
    return (
      <div>
        <Container>
          <h1>Dashboard {this.state.allBudgets}</h1>

          <Link to="/createBudget">
            <button> Create Budget</button>
          </Link>
          <Link to="/allbudgets">
            <button onClick={this.getAllBudgets}> AllBudgets </button>
          </Link>
        </Container>
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
