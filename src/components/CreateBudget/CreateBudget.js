import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "../LandingPage/Landing.js";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../../ducks/reducer";

export class createBudget extends Component {
  state = {
    budget_balance: 0,
    default_balance:0,
    budget_name: "",
    budget_id: 0,
    expenses: []
  };

  postEverything = () => {
    const { budget_balance, budget_name,budget_balance:default_balance } = this.state;
    const { user_id, email, budgets } = this.props;

    const {
      rent_or_mortgage,
      electric,
      water,
      internet,
      groceries,
      transportation,
      auto_maintenance,
      home_maintenance,
      medical,
      clothing,
      gifts,
      computer_replacement,
      student_loan,
      auto_loan,
      vacation,
      fitness,
      education,
      dining_out,
      gaming,
      fun_money,
      dates
    } = this.state.expenses;
    
    axios
      .post("/api/createBudget", {
        user_id,
        budget_name,
        budget_balance,
        default_balance
      })
      .then(res => {
        this.props.setUser({ email, user_id, budgets });
        this.setState({
          budget_id: res.data[res.data.length - 1].budget_id,
        });
        // console.log(res.data[res.data.length - 1].budget_id);
        axios
          .post(
            `/api/createexpenses/${res.data[res.data.length - 1].budget_id}`,
            {
              rent_or_mortgage,
              electric,
              water,
              internet,
              groceries,
              transportation,
              auto_maintenance,
              home_maintenance,
              medical,
              clothing,
              gifts,
              computer_replacement,
              student_loan,
              auto_loan,
              vacation,
              fitness,
              education,
              dining_out,
              gaming,
              fun_money,
              dates
            }
          )
          .then(res => {
            console.log(res.data);
          });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // console.log(this.state.budget_id);
    // console.log(this.state.expenses);
    return (
      <div>
        <h1>Create Budget </h1>
        <h3>Budget Name</h3>
        <input onChange={this.handleChange} type="text" name="budget_name" />
        <h3>Budget Balance</h3>
        <input onChange={this.handleChange} type="text" name="budget_balance" />
        <Link to="/allbudgets">
          <Button onClick={this.postEverything}> CREATE EVERYTHING</Button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { user_id, email, budgets } = reduxState;
  return { user_id, email, budgets };
}
export default connect(
  mapStateToProps,
  { setUser }
)(createBudget);
