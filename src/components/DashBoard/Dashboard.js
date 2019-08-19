import React, { Component } from "react";
import AllBudgets from "../AllBudgets/AllBudgets.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Container } from "./DashboardStyle";
import { setUser } from "../../ducks/reducer";
export class Dashboard extends Component {
  state = {
    budgets: [],
    props: true
  };

  deleteBudget = budget_id => {
    const { user_id } = this.props;
    axios
      .delete(`/api/deleteBudget/${budget_id}/${user_id}`)
      .then(
        axios.get(`/api/budgets/${user_id}`).then(res => {
          console.log(res.data);
          this.setState({
            budgets: res.data
          });
        })
      )
      .catch(err => alert("failled to delete"));
  };

  pickBudget = budget_id => {
    const { email, user_id, budgets, props } = this.props;
    axios.get(`/api/specificBudget/${budget_id}`).then(res => {
      console.log(res.data);
      this.setState({
        budgets: res.data
      });
    });
    // this.props.history.push('/onebudget')
    // this.props.setUser({ email, user_id, budgets });
  };

  componentDidMount() {
    const { user_id } = this.props;
    axios.get(`/api/getUserBudgets/${user_id}`).then(res => {
      this.setState({
        budgets: res.data
      });
    });
  }

  toggle = () => {
    const { props } = this.state;
    this.setState({
      props: !props
    });
  };

  getAllBudgets = () => {
    const { user_id, props } = this.props;
    axios.get(`/api/getUserBudgets/${user_id}`).then(res => {
      this.setState({
        budgets: res.data
      });
    });

    this.setState({
      props: !props
    });
  };

  render() {
    // console.log(this.props)
    // console.log(this.state.budgets);
    // console.log(this.props.budgets);
    // const { budgets } = this.props;
    const { budgets, props } = this.state;
    console.log(props);
    let mappedBudgets = budgets.map(budget => (
      <AllBudgets
        key={budget.budget_id}
        budget_id={budget.budget_id}
        budget_name={budget.budget_name}
        budget_balance={budget.budget_balance}
        delete_budget={this.deleteBudget}
        pick_budget={this.pickBudget}
        budget={budget}
      />
    ));

    console.log(props);
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/createBudget">
          <button> Create Budget</button>
        </Link>

        <Link to="/onebudget">
          <button>One budget</button>
        </Link>
        <Link to="/dashboard">
          <button>dashboard</button>
        </Link>

        <button onClick={this.getAllBudgets}> AllBudgets </button>
        <button onClick={this.toggle}>false</button>
        <Container>{mappedBudgets}</Container>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { email, user_id, budgets } = reduxState;
  return { email, user_id, budgets };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Dashboard);
